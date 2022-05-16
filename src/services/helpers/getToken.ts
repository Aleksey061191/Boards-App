function getToken(): string {
  const token: string | null = localStorage.getItem('token');
  return token || '';
}

export default getToken;
