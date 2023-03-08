/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./old-components/**/*.{js,ts,jsx,tsx}", // TODO: Delete when components migration is completed
    "./components/**/*.{js,ts,jsx,tsx}",
    "./forms/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {      
      "w-p": {"max": '599px'},
      "w-t": {"min": '600px', "max": "1023px"},
      "w-d": {"min": '1024px'},
      "w-d-base": {"max": '1300px'}
    },
    maxWidth: {
      "d-base": "1200px",
    },
    extend: {
      spacing: {
        "12.5": "3.125rem",
        "8.5": "2.125rem",
        "13.75": "3.438rem",
        "16.5": "4.125rem",
        18: "4.5rem",
        22: "5.5rem",
        "58.5": "14.625rem",
        72: "18rem",
        78: "19.5rem",
        96: "24rem",
        100: "25rem",
        "135.5": "33.375rem",
        "170.75": "42.688rem",
        "341.5": "85.375rem",
        "683": "170.75rem",
        "grid-gap": "1.5rem"
      },
      fontSize: {
        "3.5": "0.875rem",
        "4.5": "1.125rem",
        5: "1.25rem",
        "5.5": "1.375rem",
        6: "1.5rem",
        "6.5": "2rem",
        "7.5": "1.875rem",
        "8.5": "2.125rem",
        10: "2.5rem",
        13: "3.25rem",
        "13.5": "4.063rem"
      },
      lineHeight: {
        "5.2": "1.3rem",
        "5.625": "1.406rem",
        "7.15": "1.788rem",
        "7.5": "1.875rem",
        "8.6": "2.172rem",
        "9.375": "2.344rem",
        "9.435": "2.359rem",
        "12.5": "3.125rem",
        "13": "3.75rem",
        "16.25": "4.063rem",
      },
      colors: {
        "SC-Actions-AC-200": "#F2F2F2",
        "SC/Blackandgrey/B-60": "#686868",
        "SC/Backgrounds/BG-GRAY": "#F2F2F2",
        "Brands/UANE/Primary/UANE-P-00": "#B0003C",
        "UNI-066": "#555555",
        "SC/Blackandgrey/B-80": "#282828",
        "darkBlue": "#2B2C34;",
        "SC/Actions/AC-300": "#E6E6E6",
        "SC/Blackandgrey/B-100": "#000000"
      },
      fontFamily: {
        "Nunito": ["Nunito"],
        "Nunito-Sans": ["Nunito Sans"],
        "Poppins": ["Poppins"],
      },
      gridTemplateColumns: {
        "12-gap": 'repeat(12, minmax(0, 1fr))',
        "12-nogap": 'repeat(12, minmax(0, 1fr))',
        "8-gap": 'repeat(8, minmax(0, 1fr))',
        "8-nogap": 'repeat(8, minmax(0, 1fr))',
        "4-gap": 'repeat(4, minmax(0, 1fr))',
        "4-nogap": 'repeat(4, minmax(0, 1fr))',
        12: 'repeat(12, 1fr)',
        8: 'repeat(8, 1fr)',
        4: 'repeat(4, 1fr)',
      },
      aspectRatio: {
        "1/1": "1 / 1",
        "1/2": "1 / 2",
        "2/1": "2 / 1",
        "3/4": "3 / 4",
        "4/3": "4 / 3",
        "7/2": "7 / 2",
      },
      boxShadow: {
        15: '0px 5px 15px rgba(0, 0, 0, 0.15)',
        30: '0px 10px 40px rgba(0, 0, 0, 0.25)',
        "pastelBlueShadowLeft": '-5px 5px 0px 0px #99E5E1',
        "pastelYellowShadowLeft": '-5px 5px 0px 0px #FFD033',
        "pastelRedShadowLeft": '-5px 5px 0px 0px #ED6A5F',
        "pastelGrayShadowLeft": '-5px 5px 0px 0px #A2AFB5',
        "blueShadowLeft": "-5px 5px 0px 0px #00BEB4",
        "pastelBlueShadowRight": '5px 5px 0px 0px #99E5E1',
        "pastelYellowShadowRight": '5px 5px 0px 0px #FFD033',
        "pastelRedShadowRight": '5px 5px 0px 0px #ED6A5F',
        "pastelGrayShadowRight": '5px 5px 0px 0px #A2AFB5',
        "blueShadowRight": "5px 5px 0px 0px #00BEB4"
      }
    },
  },
  plugins: [],
}