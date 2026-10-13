import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/config";
import { AppError } from "../../utils/AppError";
import { UserModel, toPublicUser } from "../users/user.model";

// Used so login takes similar time whether or not the email exists.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

function signToken(userId: string) {
  return jwt.sign({}, env.JWT_SECRET, {
    subject: userId,
    algorithm: "HS256",
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
}

interface RegisterInput {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "customer" | "tailor";
}

export async function register(input: RegisterInput) {
  const passwordHash = await bcrypt.hash(input.password, 12);
  try {
    const user = await UserModel.create({
      name: input.name,
      email: input.email,
      phone: input.phone,
      passwordHash,
      role: input.role,
    });
    return { user: toPublicUser(user), token: signToken(user.id) };
  } catch (err: any) {
    if (err?.code === 11000) {
      throw new AppError(409, "EMAIL_TAKEN", "An account with this email already exists");
    }
    throw err;
  }
}

export async function login(email: string, password: string) {
  const user = await UserModel.findOne({ email }).select("+passwordHash");
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  }
  if (user.accountStatus !== "active") {
    throw new AppError(403, "ACCOUNT_SUSPENDED", "This account has been suspended");
  }
  return { user: toPublicUser(user), token: signToken(user.id) };
}

export async function getCurrentUser(id: string) {
  const user = await UserModel.findById(id);
  if (!user) throw new AppError(404, "NOT_FOUND", "User not found");
  return toPublicUser(user);
}