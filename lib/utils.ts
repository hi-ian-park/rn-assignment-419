export default {
  sleep: async (t) => {
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  },

  getErrorMessage: (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
  },

  reportError: ({ message }: { message: string }) => {
    // sentry error reporting
    // Sentry.captureException(error);
    // toast.error(message);
    console.log(message);
  },
};
