module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-cssnext": {},
    cssnano: process.env.ENVIRONMENT === "production",
    autoprefixer: process.env.ENVIRONMENT === "production"
  }
};
