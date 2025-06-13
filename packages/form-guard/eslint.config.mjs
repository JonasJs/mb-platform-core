import config from "@mb-platform/eslint-config/node.mjs";

export default [
  ...config,
  {
    rules: {
      "valid-typeof": ["error", { requireStringLiterals: false }]
    },
  }
];
