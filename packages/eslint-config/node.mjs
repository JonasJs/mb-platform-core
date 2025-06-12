import globals from "globals";
import config from "./common.mjs";

export default [
  ...config,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
