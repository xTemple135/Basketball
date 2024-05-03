export function getToken(): string | null {
    const tokenString = localStorage.getItem('token');
    return tokenString ? JSON.parse(tokenString) : null;
  }