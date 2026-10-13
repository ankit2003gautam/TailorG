
export const isObjectId = (v: string) =>
  /^[a-f\d]{24}$/i.test(v);
