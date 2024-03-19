export const getServerUrl = () => {
  if (__IS_PRODUCTION__) {
    return "https://railway-playground-server.up.railway.app";
  }

  return "http://localhost:3001";
};
