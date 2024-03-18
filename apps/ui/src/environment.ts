export const getServerUrl = () => {
  if (__IS_PRODUCTION__) {
    return "http://railway-playground.railway.internal";
  }

  return "http://localhost:3001";
};
