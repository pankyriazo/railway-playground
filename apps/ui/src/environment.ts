export const getServerUrl = () => {
  if (__IS_PRODUCTION__) {
    return "http://railway-playground.up.railway.app";
  }

  return "http://localhost:3001";
};
