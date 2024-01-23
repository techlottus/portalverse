const fs = require('fs')
const dotenv = require('dotenv').config();
const { env } = require('process')

const lottusColors = {
  primary: {
    intensity0: '#e3fffc',
    intensity50: '#c6fff8',
    intensity100: '#8dfff1',
    intensity200: '#55ffea',
    intensity300: '#1cffe3',
    intensity400: '#00e2c6',
    intensity500: '#00a994',
    intensity600: '#008d7b',
    intensity700: '#007163',
    intensity800: '#00554a',
    intensity900: '#003831',
    intensity950: '#001c19',
  },
  secondary: {
    intensity0: '#ced4de',
    intensity50: '#9caabd',
    intensity100: '#7f8ea5',
    intensity200: '#63738e',
    intensity300: '#485977',
    intensity400: '#2e4061',
    intensity500: '#13294b',
    intensity600: '#10223f',
    intensity700: '#0d1b32',
    intensity800: '#0a1426',
    intensity900: '#060e19',
    intensity950: '#03070d',
  },
  surface: {
    intensity0: '#FFFFFF',
    intensity50: '#FAFAFA',
    intensity100: '#F4F4F5',
    intensity200: '#E4E4E7',
    intensity300: '#D4D4D8',
    intensity400: '#A1A1AA',
    intensity500: '#71717A',
    intensity600: '#52525B',
    intensity700: '#3F3F46',
    intensity800: '#27272A',
    intensity900: '#18181B',
    intensity950: '#000000',
  },
  error:{
    intensity0: '#EFF4FC',
    intensity50: '#DFE9F9',
    intensity100: '#C0D2F4',
    intensity200: '#A0BCEE',
    intensity300: '#80A6E8',
    intensity400: '#618FE3',
    intensity500: '#4179DD',
    intensity600: '#2460CA',
    intensity700: '#1D4DA2',
    intensity800: '#163979',
    intensity900: '#0E2651',
    intensity950: '#071328',
  },
  success:{
    intensity0: '#FDF9F0',
    intensity50: '#FAF3E1',
    intensity100: '#F6E8C3',
    intensity200: '#F1DCA6',
    intensity300: '#ECD088',
    intensity400: '#ECD088',
    intensity500: '#E3B94C',
    intensity600: '#DAA722',
    intensity700: '#AF861B',
    intensity800: '#836414',
    intensity900: '#57430D',
    intensity950: '#2C2107',
  },
  warning:{
    intensity0: '#FDF4F2',
    intensity50: '#FBE8E5',
    intensity100: '#F6D1CC',
    intensity200: '#F2BAB2',
    intensity300: '#EEA398',
    intensity400: '#E98C7F',
    intensity500: '#E57565',
    intensity600: '#DD4B36',
    intensity700: '#BC3320',
    intensity800: '#8D2718',
    intensity900: '#5E1A10',
    intensity950: '#2F0D08',
  },
  info:{
    intensity0: '#EEF9EC',
    intensity50: '#DDF2D9',
    intensity100: '#BCE6B3',
    intensity200: '#9AD98C',
    intensity300: '#78CC66',
    intensity400: '#56C040',
    intensity500: '#459A33',
    intensity600: '#39802A',
    intensity700: '#2E6722',
    intensity800: '#224D19',
    intensity900: '#173311',
    intensity950: '#0B1A08',
  },
}

const lottusFonts = {
  headings: { google_font_url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap', font_names: [{ name: 'Poppins'}] },
  texts: { google_font_url: 'https://fonts.googleapis.com/icon?family=Nunito+Sans:wght@400&display=swap', font_names: [{ name: 'Nunito Sans'}] },
  icons: { google_font_url: 'https://fonts.googleapis.com/icon?family=Material+Icons', font_names: [{ name: 'Material Icons'}] }
}

const lottusLogos = {
  logo: '../public/images/lottus.png',
  favicon: '/public/images/lottus-favicon.png',
  errorLogos: [
    {
      "error_code": "404",
      "default_message": "hubo un error inesperado",
      "default_title": "lo sentimos",
      "image": "https://pro-portalverse-lottus.s3.amazonaws.com/UTEG/404_068eb52796.jpg" // TODO: change image to lottus error
    }
  ]
}

const setcolors = (colors) => {
  return Object.keys(colors).reduce((acc, key) => {
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

const axios = require('axios');

async function downloadImage(url, filename, path = '') {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFile(`${path}${filename}`, response.data, (err) => {
    if (err) throw err;
    console.log('Image downloaded successfully!');
  });
}

async function fetchColors(){
  try {
    
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
  } catch (error) {
    console.error(error)
    console.info('using lottus default colors')
    return lottusColors
  }
}
const setFontVariation = (url, name) => {
  first = url.split('@')
  second = first[1] ? first[1].split('&') : ""
  const weights = second ? second[0].split(';') : [];

  const variants = weights.map(weight => 
`@supports (font-variation-settings: "wght" ${weight}) {
  * {
    font-family: '${name}';
    font-weight: ${weight};
    font-display: swap;
  }
}`)
  return variants
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
      const variants = setFontVariation(google_font_url, font_names[0].name).join('\n')
      acc.variants = `${acc.variants}\n\n${variants}`
      acc.links = [...acc.links, google_font_url]
    }
    
    return acc
  }, { links: [''], variants: '', fonts: {}, tokens: [''] }) 
 
}

async function fetchFonts(){
  try {
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
  } catch (error) {
    console.error(error);
    console.info('using lottus default fonts')
    return lottusFonts
  }
}

const setLogos = (logos) => {
  return Object.keys(logos) .reduce((acc, token) => {
    if (token === "errorLogos") {
      logos[token].map(error => {
        const err = {[error.error_code]: error}
        acc.errors = { ...acc.errors, ...err}
        return err
      })
    } else {
      acc.css[token] = `url('${logos[token]}')`
      acc.tokens = [...acc.tokens, `bg-${token}`]
      acc.img = `${acc.img}\n export const ${token} = "${logos[token]}"`
    }
    return acc
  }, { css: {}, img: '', tokens: [''], errors: {} })
}

async function fetchLogos(){
  try {
    const rawLogos = await
    fetch(`${env.NEXT_PUBLIC_MULTITENANT_URL}/logo?populate=logo,favicon,extra_logos,extra_logos.image,error_logos,error_logos.error_image`, {
      headers: {
        "Authorization": `Bearer ${env.NEXT_PUBLIC_MULTITENANT_TOKEN}`
      }
    })
  
    const Logos = await rawLogos.json() 
    const { data : { attributes: { logo, favicon, extra_logos, error_logos } } } = Logos
  
    if (favicon) {
      downloadImage(favicon?.data?.attributes?.url, 'favicon.ico', 'public/');
    }
    
    const extraLogos = extra_logos.reduce((acc, {logo_token, image}) => {    
      const { data: { id, attributes: { url } } } = image
      acc = {...acc, [logo_token]: url}
      return acc
    }, {})
    const errorLogos = error_logos.reduce((acc, { error_code, error_image: { data: { attributes: { url }}}, default_title, default_message }) => {    
      acc = [ ...acc, { error_code, default_message, default_title, image: url }]
      return acc
    }, [])
    errorLogos
  
    return {
      logo: logo.data.attributes.url,
      favicon: favicon.data.attributes.url,
      ...extraLogos,
      errorLogos
    }
  } catch (error) {
    console.error(error);
    console.info('using lottus logos');
    return lottusLogos;
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
    zIndex: {
      '15': '15',
    },
    screens: {      
      "w-p": {"max": '599px'},
      "w-t": {"min": '600px', "max": "1023px"},
      "w-d": {"min": '1024px'},
      "w-d-base": {"max": '1300px'}
    },
    maxWidth: {
      "72": "18rem",
      "78": "19.5rem",
      "96": "24rem",
      "d-base": "1200px",
      "147": '36.75rem',
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
      "125": '31.25rem',
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
      "7": "1.75rem",
      "7.5": "1.875rem",
      "8": "2rem",
      "8.5": "2.125rem",
      10: "2.5rem",
      13: "3.25rem",
      "13.5": "4.063rem",
      "14": "3.5rem",
      "16": "4rem"
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
      "14": "3.5rem",
      "16": "4rem",
      "16.25": "4.063rem",
      "semi-tight": "1.125"
    },
    colors: {
      ...tailwindColors
    },
    fontFamily: {
      Poppins: ['Poppins'],
      Nunito: ['Nunito'],
      'Nunito-Sans': ['Nunito Sans'],
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
    minWidth: {
      "130": '7.5rem',
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
  safelist: ${JSON.stringify([ ...fonttokens, ...logostokens, "bg-primary-0","bg-primary-50", "bg-primary-100", "bg-primary-200", "bg-primary-300", "bg-primary-400", "bg-primary-500"])},
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
  fs.writeFile('./styles/fonts.css', `${tailwindFonts.variants}
    \n@import url('https://fonts.googleapis.com/css2?&family=Poppins:wght@400;600;700&display=swap');
    @import url('https://fonts.googleapis.com/icon?family=Nunito+Sans:wght@400&display=swap');
    @import url('https://fonts.googleapis.com/icon?family=Nunito:wght@400&display=swap');
    `, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile('./multitenant-images.ts', tailwindLogos.img, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFile('./multitenant-errors.ts', `const errors: {[key:string]: { error_code:string; default_message:string; default_title:string; image:string; }} = ${JSON.stringify(tailwindLogos.errors)} \n export default errors`, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });
  const [fontsfirst, ...fontsrest] = tailwindFonts.links
  const fontslinks = fontsrest

  fs.writeFile('./fontlinks.ts', `const links = ${JSON.stringify(fontslinks)} \n export default links;`, 'utf-8', (err) => {
    if (err) {
      console.error(err);
    }
  });

}

populateTailwind()
