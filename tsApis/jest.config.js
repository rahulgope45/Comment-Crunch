export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],

  // Important for ESM
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};