import capitalizeString from "./capitalizeString";

interface Options {
  type: "rh" | "dev";
  name: string;
  title: string;
  description: string;
}
const createInviteMessageConnection = async ({
  description,
  name,
  title,
  type,
}: Options) => {
  const nameTrated = capitalizeString(name).split(" ")[0].replace(/[;,]/g, "");
  const templates = {
    rh: `Oi ${nameTrated},\nSou Augusto, Desenvolvedor Web Full-Stack JavaScript! Se conhecer oportunidades na área de desenvolvimento, agradeço qualquer ajuda.\nPortfólio: https://augustowestphal.site\nAbraços!`,
    dev: `Eai ${nameTrated}, \n\nSou o Augusto, Desenvolvedor Web Full-Stack JavaScript. Topa trocar uma ideia e quem sabe futuras parcerias?\nAbraços!`,
  };

  return templates[type];
};

export default createInviteMessageConnection;
