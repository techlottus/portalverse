const fs = require('fs')
const dotenv = require('dotenv').config();
const { env } = require('process')

const setcolors = (colors) => {
  return Object.keys(colors) .reduce((acc, key) => {
    acc = {
      ...acc,
      [key]: {
        0: colors[key].intensity0,
        50: colors[key].intensity50,
        100: colors[key].intensity100,
        200: colors[key].intensity200,
        300: colors[key].intensity300,
        400: colors[key].intensity400,
        500: colors[key].intensity500,
        600: colors[key].intensity600,
        700: colors[key].intensity700,
        800: colors[key].intensity800,
        900: colors[key].intensity900,
        950: colors[key].intensity950,
      }
    }
    return acc
  }, {}) 
 
}

async function fetchColors(){
  const rawColors = await
  fetch(`${env.NEXT_PUBLIC_MULTITENANT_URL}/pallete?populate[0]=primary,secondary,surface,complementary.colors,contextual.success,contextual.error,contextual.warning,contextual.info`, {
    headers: {
      "Authorization": `Bearer ${env.NEXT_PUBLIC_MULTITENANT_TOKEN}`
    }
  })

  const Colors = await rawColors.json() 
  const { data : { attributes: { primary, secondary, surface, contextual:{id, ...restcontextual}, complementary } } } = Colors

  const complementaryColors = complementary.reduce((acc, {token, colors}) => {
    const { id, ...rest } = colors
    acc = {...acc, [token]: { ...rest}}
    return acc
  }, {})

  return {primary, secondary, surface, ...restcontextual, ...complementaryColors}
}

const setFonts = (fonts) => {
  return Object.keys(fonts) .reduce((acc, token) => {
    const font = fonts[token]
    acc.tokens = [...acc.tokens, `font-${token}`]
    if (font.font) {
      acc.fonts = {
        ...acc.fonts,
        [token]: [ font.font ]
      }
    } else {

      const { google_font_url, font_names } = font
      acc.fonts = {
        ...acc.fonts,
        [token]: font_names.map((font)=> font.name)
      }
      acc.links = `${acc.links}\n@import url('${google_font_url}');`
    }
    
    return acc
  }, { links: '', fonts: {}, tokens: [''] }) 
 
}

async function fetchFonts(){

  const rawFonts = await
  fetch(`${env.NEXT_PUBLIC_MULTITENANT_URL}/font?populate[0]=headings,texts,extra_fonts,headings.font_names,texts.font_names,extra_fonts.font,extra_fonts.font.font_names`, {
    headers: {
      "Authorization": `Bearer ${env.NEXT_PUBLIC_MULTITENANT_TOKEN}`
    }
  })

  const Fonts = await rawFonts.json() 
  const { data : { attributes: { headings, texts, extra_fonts } } } = Fonts

  const extraFonts = extra_fonts.reduce((acc, {token, font}) => {
    const { id, ...rest } = font
    acc = {...acc, [token]: rest}
    return acc
  }, {})
  const fonts = { headings: headings[0], texts: texts[0], ...extraFonts }
  
  return fonts
}
const setLogos = (logos) => {
  return Object.keys(logos) .reduce((acc, token) => {
    acc.css[token] = `url('${logos[token]}')`
    acc.tokens = [...acc.tokens, `bg-${token}`]
    acc.img = `${acc.img}\n export const ${token} = "${logos[token]}"`
    return acc
  }, { css: {}, img: '', tokens: [''] })
}

async function fetchLogos(){

  const rawLogos = await
  fetch(`${env.NEXT_PUBLIC_MULTITENANT_URL}/logo?populate=logo,favicon,extra_logos,extra_logos.image`, {
    headers: {
      "Authorization": `Bearer ${env.NEXT_PUBLIC_MULTITENANT_TOKEN}`
    }
  })

  const Logos = await rawLogos.json() 
  const { data : { attributes: { logo, favicon, extra_logos } } } = Logos

  
  const extraLogos = extra_logos.reduce((acc, {logo_token, image}) => {    
    const { data: { id, attributes: { url } } } = image
    acc = {...acc, [logo_token]: url}
    return acc
  }, {})

  return {
    logo: logo.data.attributes.url,
    favicon: favicon.data.attributes.url,
    ...extraLogos
  }
}
const setConfig = ({ styles_safelist, environment_variables }) => {
  
  const safelist = styles_safelist.map(({ token }) => token)
  const variables = environment_variables.reduce((acc, { token, value }) => {
    acc = `${acc}${[token]}=${value}\n}`
    return acc
  }, '')
  return { safelist, variables }
}

// async function fetchConfig(){

//   const rawConfig = await
//   fetch(`${env.NEXT_PUBLIC_MULTITENANT_URL}/config?populate=styles_safelist,environment_variables`, {
//     headers: {
//       "Authorization": `Bearer ${env.NEXT_PUBLIC_MULTITENANT_TOKEN}`
//     }
//   })
//   console.log("rawConfig", rawConfig)
//   const Config = await rawConfig.json() 
//   console.log("Config", Config)
//   const { data : { attributes } } = Config

//   return attributes
// }

async function populateTailwind  () {

  const tailwindColors = setcolors(await fetchColors())
  const tailwindFonts = setFonts(await fetchFonts())
  const tailwindLogos = setLogos(await fetchLogos())
  // const config = setConfig(await fetchConfig())
  const tailwindExtend = {
    screens: {      
      "w-p": {"max": '599px'},
      "w-t": {"min": '600px', "max": "1023px"},
      "w-d": {"min": '1024px'},
      "w-d-base": {"max": '1300px'}
    },
    maxWidth: {
      "d-base": "1200px",
    },
    spacing: {
      "12.5": "3.125rem",
      "8.5": "2.125rem",
      "13.75": "3.438rem",
      "16.5": "4.125rem",
      18: "4.5rem",
      22: "5.5rem",
      "55": '13.375rem',
      "58.5": "14.625rem",
      "59": '14.375rem',
      72: "18rem",
      78: "19.5rem",
      "88": '22.188',
      96: "24rem",
      100: "25rem",
      "135.5": "33.375rem",
      "140.5": '36.438',
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
      "12": "3rem",
      "12.5": "3.125rem",
      "13": "3.75rem",
      "16": "4rem",
      "16.25": "4.063rem",
      "semi-tight": "1.125"
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
      "SC/Blackandgrey/B-100": "#000000",
      ...tailwindColors
    },
    fontFamily: {
      ...tailwindFonts.fonts
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
    },
    minHeight: {
      "22" : '5.25rem',
      "26": '6.563rem',
      "54": '13.25rem',
      "58": '14.75rem'
    },
    maxWidth: {
      "147": '36.75rem',
    },
    backgroundImage: tailwindLogos.css
  }
  const [fóntfirst, ...fontrest] = tailwindFonts.tokens
  const fonttokens = fontrest
  const [logosfirst, ...logosrest] = tailwindLogos.tokens
  const logostokens = logosrest
  
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./old-components/**/*.{js,ts,jsx,tsx}", // TODO: Delete when components migration is completed
    "./components/**/*.{js,ts,jsx,tsx}",
    "./forms/**/*.{js,ts,jsx,tsx}",
    "./public/icons/**/*.{svg,jsx}"
  ],
  safelist: ${JSON.stringify([ ...fonttokens, ...logostokens])},
  theme: {
    extend: ${JSON.stringify(tailwindExtend, null, 3)}
  },
  plugins: [],
}`
  fs.writeFile('./tailwind.config.js', tailwindConfig, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile('./styles/fonts.css', tailwindFonts.links, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile('./multitenant-images.ts', tailwindLogos.img, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });

}


populateTailwind()
