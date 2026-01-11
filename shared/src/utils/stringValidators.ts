


export const isAlphanumeric = (u: string) => /^[a-z0-9]+$/i.test(u)
export const isValidUrl = (u: string) => /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(u)
export const isValidEmail = (e: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export const isValidPHNum = (n: string) => /^(?:\+63|0)9\d{9}$/.test(n);

