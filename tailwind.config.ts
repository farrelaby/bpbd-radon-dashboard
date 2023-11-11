// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

import type { Config } from "tailwindcss";

// import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      //   colors: {
      //     primary: defaultTheme?.colors?.green,
      //   },
    },
  },
  plugins: [require("daisyui")],
};
