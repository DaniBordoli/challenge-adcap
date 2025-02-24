module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components/*": "./src/components/*",
            "@assets/*": "./src/assets/*",
            "@utils/*": "./src/utils/*",
            "@types/*": "./src/types/*",
            "@navigation/*": "./src/navigation/*",
            "@screens/*": "./src/screens/*",
            "@hooks/*": "./src/hooks/*",
            "@styles/*": "./src/styles/*",
          },
        },
      ],
    ],
  };
};
