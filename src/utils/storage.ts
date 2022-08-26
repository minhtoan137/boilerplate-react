const AUTH_TOKEN = 'authToken'

const storage = {
  getToken: () => localStorage.getItem(AUTH_TOKEN),
  setToken: (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token)
  },
  clearToken: () => {
    window.localStorage.removeItem(AUTH_TOKEN);
  },
};

export default storage;
