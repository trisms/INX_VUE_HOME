module.exports = {
  name: "INX_VUE_HOME",
  exec_mode: "fork",
  script: "./server.mjs",
  autorestart: true,
  watch: false,
  env_prod: {
    NODE_ENV: "prod",
  },
  env_test: {
    NODE_ENV: "test",
  },
};
