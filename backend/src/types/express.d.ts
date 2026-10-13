declare namespace Express {
  interface Request {
    user?: { id: string; role: "customer" | "tailor" | "admin" };
  }
}