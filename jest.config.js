module.exports = {
  transform: {
    "\\.ts?$": "ts-jest",
  },
  testRegex: "[^.]*.test.ts?$",
  moduleFileExtensions: ["ts", "js", "jsx", "json", "node"],
  collectCoverageFrom: ["**/*.ts", "!**/tests/**"],
};
