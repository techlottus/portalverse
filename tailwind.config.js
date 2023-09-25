/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./old-components/**/*.{js,ts,jsx,tsx}", // TODO: Delete when components migration is completed
    "./components/**/*.{js,ts,jsx,tsx}",
    "./forms/**/*.{js,ts,jsx,tsx}",
    "./public/icons/**/*.{svg,jsx}"
  ],
  safelist: ["font-headings","font-texts","font-Poppins","font-Nunito-Sans","bg-logo","bg-favicon"],
  theme: {
    extend: {
   "screens": {
      "w-p": {
         "max": "599px"
      },
      "w-t": {
         "min": "600px",
         "max": "1023px"
      },
      "w-d": {
         "min": "1024px"
      },
      "w-d-base": {
         "max": "1300px"
      }
   },
   "maxWidth": {
      "147": "36.75rem",
      "d-base": "1200px"
   },
   "spacing": {
      "18": "4.5rem",
      "22": "5.5rem",
      "55": "13.375rem",
      "59": "14.375rem",
      "72": "18rem",
      "78": "19.5rem",
      "88": "22.188",
      "96": "24rem",
      "100": "25rem",
      "125": "31.25rem",
      "683": "170.75rem",
      "12.5": "3.125rem",
      "8.5": "2.125rem",
      "13.75": "3.438rem",
      "16.5": "4.125rem",
      "58.5": "14.625rem",
      "135.5": "33.375rem",
      "140.5": "36.438",
      "170.75": "42.688rem",
      "341.5": "85.375rem",
      "grid-gap": "1.5rem"
   },
   "fontSize": {
      "5": "1.25rem",
      "6": "1.5rem",
      "10": "2.5rem",
      "13": "3.25rem",
      "3.5": "0.875rem",
      "4.5": "1.125rem",
      "5.5": "1.375rem",
      "6.5": "2rem",
      "7.5": "1.875rem",
      "8.5": "2.125rem",
      "13.5": "4.063rem"
   },
   "lineHeight": {
      "12": "3rem",
      "13": "3.75rem",
      "16": "4rem",
      "5.2": "1.3rem",
      "5.625": "1.406rem",
      "7.15": "1.788rem",
      "7.5": "1.875rem",
      "8.6": "2.172rem",
      "9.375": "2.344rem",
      "9.435": "2.359rem",
      "12.5": "3.125rem",
      "16.25": "4.063rem",
      "semi-tight": "1.125"
   },
   "colors": {
      "primary": {
         "0": "#F0FBF6",
         "50": "#E1F6EC",
         "100": "#C2ECD9",
         "200": "#A4E3C6",
         "300": "#7DC4AD",
         "400": "#57A695",
         "500": "#2B897E",
         "600": "#247269",
         "700": "#1D5B54",
         "800": "#16443F",
         "900": "#0E2E2A",
         "950": "#071715"
      },
      "secondary": {
         "0": "#F0FBF6",
         "50": "#E1F6EC",
         "100": "#C2ECD9",
         "200": "#A4E3C6",
         "300": "#7DC4AD",
         "400": "#57A695",
         "500": "#2B897E",
         "600": "#247269",
         "700": "#1D5B54",
         "800": "#16443F",
         "900": "#0E2E2A",
         "950": "#071715"
      },
      "surface": {
         "0": "#FFFFFF",
         "50": "#FAFAFA",
         "100": "#F4F4F5",
         "200": "#E4E4E7",
         "300": "#D4D4D8",
         "400": "#A1A1AA",
         "500": "#71717A",
         "600": "#52525B",
         "700": "#3F3F46",
         "800": "#27272A",
         "900": "#18181B",
         "950": "#000000"
      },
      "info": {
         "0": "#EFF4FC",
         "50": "#DFE9F9",
         "100": "#C0D2F4",
         "200": "#A0BCEE",
         "300": "#80A6E8",
         "400": "#618FE3",
         "500": "#4179DD",
         "600": "#2460CA",
         "700": "#1D4DA2",
         "800": "#163979",
         "900": "#0E2651",
         "950": "#071328"
      },
      "warning": {
         "0": "#FDF9F0",
         "50": "#FAF3E1",
         "100": "#F6E8C3",
         "200": "#F1DCA6",
         "300": "#F1DCA6",
         "400": "#ECD088",
         "500": "#E3B94C",
         "600": "#DAA722",
         "700": "#AF861B",
         "800": "#836414",
         "900": "#57430D",
         "950": "#2C2107"
      },
      "error": {
         "0": "#FDF4F2",
         "50": "#FBE8E5",
         "100": "#F6D1CC",
         "200": "#F2BAB2",
         "300": "#EEA398",
         "400": "#E98C7F",
         "500": "#E57565",
         "600": "#DD4B36",
         "700": "#BC3320",
         "800": "#8D2718",
         "900": "#5E1A10",
         "950": "#2F0D08"
      },
      "success": {
         "0": "#EEF9EC",
         "50": "#DDF2D9",
         "100": "#BCE6B3",
         "200": "#9AD98C",
         "300": "#78CC66",
         "400": "#56C040",
         "500": "#459A33",
         "600": "#39802A",
         "700": "#2E6722",
         "800": "#224D19",
         "900": "#173311",
         "950": "#0B1A08"
      },
      "presencial": {
         "0": "#F0FBF6",
         "50": "#E1F6EC",
         "100": "#C2ECD9",
         "200": "#A4E3C6",
         "300": "#7DC4AD",
         "400": "#57A695",
         "500": "#2B897E",
         "600": "#247269",
         "700": "#1D5B54",
         "800": "#16443F",
         "900": "#0E2E2A",
         "950": "#071715"
      },
      "online": {
         "0": "#F2EEFA",
         "50": "#DFD7E5",
         "100": "#BEAECC",
         "200": "#9E86B2",
         "300": "#8B62A5",
         "400": "#7A3C96",
         "500": "#71268E",
         "600": "#61217A",
         "700": "#511B65",
         "800": "#411651",
         "900": "#30103D",
         "950": "#18081F"
      },
      "híbrida": {
         "0": "#E6F3F7",
         "50": "#CCE8EF",
         "100": "#99D2DF",
         "200": "#66BBCF",
         "300": "#4B9FC0",
         "400": "#3982AE",
         "500": "#336699",
         "600": "#2B5580",
         "700": "#224466",
         "800": "#19334D",
         "900": "#112233",
         "950": "#08111A"
      },
      "salud": {
         "0": "#E7F6FE",
         "50": "#CFEDFD",
         "100": "#9FDBFB",
         "200": "#6FC8F9",
         "300": "#3FB6F6",
         "400": "#01B7FF",
         "500": "#07A6E5",
         "600": "#086FA7",
         "700": "#065985",
         "800": "#044264",
         "900": "#032C43",
         "950": "#021622"
      }
   },
   "fontFamily": {
      "Poppins": [
         "Poppins"
      ],
      "Nunito": [
         "Nunito"
      ],
      "Nunito-Sans": [
         "Nunito Sans"
      ],
      "headings": [
         "Bunday Sans"
      ],
      "texts": [
         "Nunito Sans",
         "sans-serif"
      ]
   },
   "gridTemplateColumns": {
      "4": "repeat(4, 1fr)",
      "8": "repeat(8, 1fr)",
      "12": "repeat(12, 1fr)",
      "12-gap": "repeat(12, minmax(0, 1fr))",
      "12-nogap": "repeat(12, minmax(0, 1fr))",
      "8-gap": "repeat(8, minmax(0, 1fr))",
      "8-nogap": "repeat(8, minmax(0, 1fr))",
      "4-gap": "repeat(4, minmax(0, 1fr))",
      "4-nogap": "repeat(4, minmax(0, 1fr))"
   },
   "aspectRatio": {
      "1/1": "1 / 1",
      "1/2": "1 / 2",
      "2/1": "2 / 1",
      "3/4": "3 / 4",
      "4/3": "4 / 3",
      "7/2": "7 / 2"
   },
   "boxShadow": {
      "15": "0px 5px 15px rgba(0, 0, 0, 0.15)",
      "30": "0px 10px 40px rgba(0, 0, 0, 0.25)",
      "pastelBlueShadowLeft": "-5px 5px 0px 0px #99E5E1",
      "pastelYellowShadowLeft": "-5px 5px 0px 0px #FFD033",
      "pastelRedShadowLeft": "-5px 5px 0px 0px #ED6A5F",
      "pastelGrayShadowLeft": "-5px 5px 0px 0px #A2AFB5",
      "blueShadowLeft": "-5px 5px 0px 0px #00BEB4",
      "pastelBlueShadowRight": "5px 5px 0px 0px #99E5E1",
      "pastelYellowShadowRight": "5px 5px 0px 0px #FFD033",
      "pastelRedShadowRight": "5px 5px 0px 0px #ED6A5F",
      "pastelGrayShadowRight": "5px 5px 0px 0px #A2AFB5",
      "blueShadowRight": "5px 5px 0px 0px #00BEB4"
   },
   "minHeight": {
      "22": "5.25rem",
      "26": "6.563rem",
      "54": "13.25rem",
      "58": "14.75rem"
   },
   "minWidth": {
      "130": "7.5rem"
   },
   "backgroundImage": {
      "logo": "url('https://bedu-staging-assets.s3.us-west-2.amazonaws.com/ULA/ULA_7ebac4d515.png')",
      "favicon": "url('https://bedu-staging-assets.s3.us-west-2.amazonaws.com/ULA/favicon_ULA_afe3b4e9e9.png')"
   }
}
  },
  plugins: [],
}