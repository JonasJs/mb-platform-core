import eslint from "@eslint/js";
import neostandard, { resolveIgnoresFromGitignore } from "neostandard";

export default [
  eslint.configs.recommended,
  ...neostandard({
    ignores: resolveIgnoresFromGitignore(),
  }),
  {
    rules: {
      "@stylistic/max-len": [
        "warn",
        {
          code: 80,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreComments: false,
        },
      ],
      "@stylistic/space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          asyncArrow: "always",
          named: "never",
        },
      ],
      "@stylistic/jsx-quotes": ["error", "prefer-single"],
      "@stylistic/quotes": ["error", "single"],
    },
  },
];
