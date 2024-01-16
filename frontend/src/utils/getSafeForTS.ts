export function getSafe<T>(obj: any, key: string, fallback: T): T {
    return (obj && key in obj) ? obj[key] : fallback;
  }
