export default ({ env }) => {
  // If the URL is empty, set it to undefined for error handling in the server
  let url = env("URL");
  if (url === "https://") {
    url = undefined;
  }

  return {
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    app: {
      keys: env.array("APP_KEYS"),
    },
    url: url,
    proxy: true,
  };
};
