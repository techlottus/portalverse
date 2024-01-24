import Container from "@/layouts/Container.layout";
import RichtText from "@/old-components/Richtext/Richtext";
import parseEditorRawData from "@/utils/parseEditorRawData";
import cn from "classnames";

const AtrProgramPerks = () => {
  const desktopBgImage = "https://bedu-staging-assets.s3.us-west-2.amazonaws.com/UTC/desk_fondo_pruebas_6pts_e79b16c033.jpg";
  const tabletBgImage = "https://bedu-staging-assets.s3.us-west-2.amazonaws.com/UTC/desk_fondo_pruebas_6pts_e79b16c033.jpg";
  const mobileBgImage = "https://bedu-staging-assets.s3.us-west-2.amazonaws.com/UTC/mobile_fondo_prueba_6pts_f62aacbbf8.jpg";                         
                         
  return (
    <section
      //@ts-ignore
      style={{"--image-desk-url": `url(${desktopBgImage})`, "--image-tablet-url": `url(${tabletBgImage})`, "--image-mobile-url": `url(${mobileBgImage})`}}
      className={cn("w-full justify-center bg-origin-border md:bg-center bg-no-repeat bg-cover bg-secondary-0 py-24", "bg-[image:var(--image-mobile-url)]", "md:bg-[image:var(--image-tablet-url)]", "lg:bg-[image:var(--image-desk-url)]")}
    >
      <Container>
        <div className="flex flex-col gap-12 items-center justify-center">
          <div className="flex flex-col gap-1 items-center justify-center">
            <h3 className="font-headings font-bold text-surface-900 text-7 leading-9 text-center"><span className="text-secondary-500">Ventajas</span> de estudiar A Tu Ritmo </h3>
            <p className="font-texts font-normal text-surface-500 text-lg leading-6 text-center">La manera más flexible de estudiar una licenciatura</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-6">
            {
              atrProgramPerks?.map((perk, i) => (
                <div key={i} className="flex justify-center items-center gap-2 px-2.5 py-3 bg-white shadow-lg rounded-lg md:max-w-78">
                  <span className="material-symbols-outlined select-none !text-7 text-secondary-500">check_circle</span>
                  <div className="-mb-5 grow mr-2">
                    <RichtText data={{content: parseEditorRawData(perk)}} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AtrProgramPerks;

const atrProgramPerks = [
  "{\"time\":1705108672114,\"blocks\":[{\"id\":\"4eyL0cTsEz\",\"type\":\"paragraph\",\"data\":{\"text\":\"Estudios con <b>validez oficial ante la SEP</b>\"}}],\"version\":\"2.23.2\"}",
  "{\"time\":1705108707875,\"blocks\":[{\"id\":\"TScW4G1KDU\",\"type\":\"paragraph\",\"data\":{\"text\":\"Estudia en tus tiempos libres.<br>Sin conectarte a clases en vivo\"}}],\"version\":\"2.23.2\"}",
  "{\"time\":1705108776105,\"blocks\":[{\"id\":\"HjRSSyBXzl\",\"type\":\"paragraph\",\"data\":{\"text\":\"<b>Concluye en menos tiempo. <br></b>Hasta dos materias simultáneas* <br>6 materias por ciclo escolar\"}}],\"version\":\"2.23.2\"}",
  "{\"time\":1705108803243,\"blocks\":[{\"id\":\"HjRSSyBXzl\",\"type\":\"paragraph\",\"data\":{\"text\":\"<b>Acceso ilimitado</b>. Avanza a tu ritmo, ingresa a tu plataforma 24/7\"}}],\"version\":\"2.23.2\"}",
  "{\"time\":1705090860160,\"blocks\":[{\"id\":\"4eyL0cTsEz\",\"type\":\"paragraph\",\"data\":{\"text\":\"<b>Recursos académicos digitales</b> especialmente diseñados para un consumo autogestivo.\"}}],\"version\":\"2.23.2\"}",
  "{\"time\":1705108827307,\"blocks\":[{\"id\":\"Q3g09rAolk\",\"type\":\"paragraph\",\"data\":{\"text\":\"<b>Pagos fijos</b><br>Paga los mismos todos los meses\"}}],\"version\":\"2.23.2\"}",
];