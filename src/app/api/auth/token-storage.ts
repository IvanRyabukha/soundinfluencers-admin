let accessTokenStore: string | null = null;

export const tokenStorage = {
  get: () => accessTokenStore,
  set: (token: string | null) => (accessTokenStore = token),
  clear: () => (accessTokenStore = null),
};
