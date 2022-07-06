export default {
  sleep: async (t) => {
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  },
};
