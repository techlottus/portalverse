import { ButtonConfig } from "@/types/Button.types"
import { InputConfig } from "@/types/Input.types"
import { LinkConfig } from "@/types/Link.types"
import { LinkIconsConfig } from "@/types/LinkLottus.types"
import { ProgressBarConfig } from "@/types/Progress.types"
import { SelectConfig, SelectOptionConfig } from "@/types/Select.types"

export const ButtonInit: ButtonConfig = {
  id: "",
  type: 'primary',
  title: 'texto',
  size: 'small',
  icon: '',
  lyIcon: false,
  disabled: false,
  isExpand: true,
  tagOnClick: 'testOnClick',
}

export const LinkIconsInit: LinkIconsConfig = {
  text: '',
  size: 'small',
  isUnderline: false,
  isBold: false,
  disabled: false,
  id: '123',
  iconFirst: '',
  iconSecond: '',
}

export const InputInit: InputConfig = {
  label: '',
  name: '',
  type: 'text',
  typeButton: 'classic',
  maxlength: '',
  onPaste: true,
  placeholder: '',
  autocomplete: 'off',
  disabled: false,
  alphanumeric: false,
  alphabetical: true,
  onlyNumbers: false,
  upperCase: false,
  pattern: '',
}

export const LinkInit: LinkConfig = {
  text: '',
  size: 'small',
  isBold: false,
  disabled: false,
  id: '123',
  icon: '',
}

export const SelectInit: SelectConfig = {
  textDefault: 'Option Default',
  disabled: false,
  icon: 'person',
  reset: false,
  zindexOptions: 10,
  isLabel: true,
  tagOnClickList: 'testOnClickList',
  tagOnClickOption: 'testOnClickOption',
}

export const SelectOptionsInit: Array<SelectOptionConfig> = [
  {
    value: '01',
    active: false,
    text: 'AGUASCALIENTES',
  },
  {
    value: '02',
    active: false,
    text: 'BAJA CALIFORNIA',
  },
  {
    value: '03',
    active: false,
    text: 'BAJA CALIFORNIA SUR',
  },
  {
    value: '04',
    active: false,
    text: 'CAMPECHE',
  },
  {
    value: '05',
    active: false,
    text: 'COAHUILA DE ZRAGOZA',
  },
  {
    value: '06',
    active: false,
    text: 'COLIMA',
  },
  {
    value: '07',
    active: false,
    text: 'CHIAPAS',
  },
  {
    value: '08',
    active: false,
    text: 'CHIHUAHUA',
  },
  {
    value: '09',
    active: false,
    text: 'CIUDAD DE MEXICO',
  },
  {
    value: '10',
    active: false,
    text: 'DURANGO',
  },
  {
    value: '11',
    active: false,
    text: 'GUANAJUATO',
  },
  {
    value: '12',
    active: false,
    text: 'GUERRERO',
  },
  {
    value: '13',
    active: false,
    text: 'HIDALGO',
  },
  {
    value: '14',
    active: false,
    text: 'JALISCO',
  },
  {
    value: '15',
    active: false,
    text: 'ESTADO DE MEXICO',
  },
  {
    value: '16',
    active: false,
    text: 'MICHOACAN',
  },
  {
    value: '17',
    active: false,
    text: 'MORELOS',
  },
  {
    value: '18',
    active: false,
    text: 'NAYARIT',
  },
  {
    value: '19',
    active: false,
    text: 'NUEVO LEON',
  },
  {
    value: '20',
    active: false,
    text: 'OAXACA',
  },
  {
    value: '21',
    active: false,
    text: 'PUEBLA',
  },
  {
    value: '22',
    active: false,
    text: 'QUERÉTARO',
  },
  {
    value: '23',
    active: false,
    text: 'QUINTANA ROO',
  },
  {
    value: '24',
    active: false,
    text: 'SAN LUIS POTOSÍ',
  },
  {
    value: '25',
    active: false,
    text: 'SINALOA',
  },
  {
    value: '26',
    active: false,
    text: 'SONORA',
  },
  {
    value: '27',
    active: false,
    text: 'TABASCO',
  },
  {
    value: '28',
    active: false,
    text: 'TAMAULIPAS',
  },
  {
    value: '29',
    active: false,
    text: 'TLAXCALA',
  },
  {
    value: '30',
    active: false,
    text: 'VERACRUZ',
  },
  {
    value: '31',
    active: false,
    text: 'YUCATAN',
  },
  {
    value: '32',
    active: false,
    text: 'ZACATECAS',
  },
  {
    value: '33',
    active: false,
    text: 'EXTRANJERO',
  },
  {
    value: '00',
    active: false,
    text: 'DESCONOCIDO',
  },
];

export const CarouselInit: any = {
  iconleft: 'arrow_back_ios',
  iconright: 'arrow_forward_ios',
  size: '',
  slides: [
    {
      urlImage:
        'https://image.shutterstock.com/image-photo/graduates-student-graduation-caps-thrown-260nw-1937758900.jpg',
      subtitle: 'SUBTITULO',
      title: 'Coursera y UANE se unen para ti',
      text: 'Se firma una alianza con Coursera para acceder a contenidos que complementen la formación profesional de su comunidad educativa',
      border: true,
      allContent: true,
      height: '',
      isShowCardWebsiteContent: true,
      id: '',
      type: 'vertical',
      link: true,
      background: false,
      linkIcon: {
        text: '',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
      linkText: {
        text: 'Conocer más',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
    },
    {
      urlImage:
        'https://image.shutterstock.com/image-photo/graduates-student-graduation-caps-thrown-260nw-1937758900.jpg',
      subtitle: 'SUBTITULO',
      title: 'Coursera y UANE se unen para ti',
      text: 'Se firma una alianza con Coursera para acceder a contenidos que complementen la formación profesional de su comunidad educativa',
      border: true,
      allContent: true,
      height: '',
      isShowCardWebsiteContent: true,
      id: '',
      type: 'vertical',
      link: true,
      background: false,
      linkIcon: {
        text: '',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
      linkText: {
        text: 'Conocer más',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
    },
    {
      urlImage:
        'https://image.shutterstock.com/image-photo/graduates-student-graduation-caps-thrown-260nw-1937758900.jpg',
      subtitle: 'SUBTITULO',
      title: 'Coursera y UANE se unen para ti',
      text: 'Se firma una alianza con Coursera para acceder a contenidos que complementen la formación profesional de su comunidad educativa',
      border: true,
      allContent: true,
      height: '',
      isShowCardWebsiteContent: true,
      id: '',
      type: 'vertical',
      link: true,
      background: false,
      linkIcon: {
        text: '',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
      linkText: {
        text: 'Conocer más',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
    },
    {
      urlImage:
        'https://image.shutterstock.com/image-photo/graduates-student-graduation-caps-thrown-260nw-1937758900.jpg',
      subtitle: 'SUBTITULO',
      title: 'Coursera y UANE se unen para ti',
      text: 'Se firma una alianza con Coursera para acceder a contenidos que complementen la formación profesional de su comunidad educativa',
      border: true,
      allContent: true,
      height: '',
      isShowCardWebsiteContent: true,
      id: '',
      type: 'vertical',
      link: true,
      background: false,
      linkIcon: {
        text: '',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
      linkText: {
        text: 'Conocer más',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
    },
    {
      urlImage:
        'https://image.shutterstock.com/image-photo/graduates-student-graduation-caps-thrown-260nw-1937758900.jpg',
      subtitle: 'SUBTITULO',
      title: 'Coursera y UANE se unen para ti',
      text: 'Se firma una alianza con Coursera para acceder a contenidos que complementen la formación profesional de su comunidad educativa',
      border: true,
      allContent: true,
      height: '',
      isShowCardWebsiteContent: true,
      id: '',
      type: 'vertical',
      link: true,
      background: false,
      linkIcon: {
        text: '',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
      linkText: {
        text: 'Conocer más',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
        isUnderline: false,
        disabled: false,
        iconFirst: '',
      },
    },
  ],
  wrapper: false,
}

export const SliderInit: any = {
  width: '100%',
  height: '100%',
  iconleft: 'arrow_back_ios',
  iconright: 'arrow_forward_ios',
  slides: [
    {
      urlImage: {
        mobile:
          'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',

        desktop:
          'https://image.shutterstock.com/image-photo/lake-teletskoye-altai-republic-siberia-260nw-2155866837.jpg',
      },
      heightmobile: '',
      title: 'Estudia una carrera a tu ritmo ¡y aprovecha tu fin de semana!',
      text: 'Carreras sabatinas con sesiones sabatinas de 4 horas',
      description: 'probando slide',
      center: false,
      left: false,
      middle: false,
      bottom: false,
      action: {
        ...ButtonInit,
        title: 'Conocer más',
      },
      link: {
        ...LinkIconsInit,
        text: 'Conocer más',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
      },
    },
    {
      urlImage: {
        mobile:
          'https://image.shutterstock.com/image-photo/lake-teletskoye-altai-republic-siberia-260nw-2155866837.jpg',

        desktop:
          'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',
      },
      heightmobile: '250px',
      title: 'Estudia una carrera a tu ritmo ¡y aprovecha tu fin de semana!',
      text: 'Carreras sabatinas con sesiones sabatinas de 4 horas',
      description: 'probando slide',
      center: true,
      left: false,
      middle: false,
      bottom: false,
      action: {
        ...ButtonInit,
        title: 'Aceptar',
      },
      link: {
        ...LinkIconsInit,
        text: 'Conocer más',
        iconSecond: 'arrow_forward_ios',
        isBold: true,
        size: 'large',
      },
    },
  ],
  wrapper: false,
}

export const ProgressBarInit: ProgressBarConfig = {
  title: '',
  progress: 60,
  description: '',
  size: 'small',
  disabled: false,
};
