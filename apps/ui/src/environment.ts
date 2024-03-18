export const getServerUrl = () => {
  if (__IS_PRODUCTION__) {
    return "http://localhost:3001";
  }

  return "http://localhost:3001";
};
