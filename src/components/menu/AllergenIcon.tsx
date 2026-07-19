import Image from "next/image";
import type { AllergenCode } from "@/lib/allergens";

type AllergenIconProps = {
  code: AllergenCode;
  size?: number;
};

const fileMap: Record<AllergenCode, string> = {
  soy: "SOJA.svg",
  fish: "PESCAD0.svg",
  mustard: "MOSTAZA.svg",
  nuts: "FRUTOS DE CÁSCARA.svg",
  crustaceans: "CRUSTÁCEOS.svg",
  milk: "LÁCTEOS.svg",
  sulphites: "DIOXIDO DE AZUFRE Y SULFITOS.svg",
  molluscs: "MOLUSCOS.svg",
  celery: "APIO.svg",
  gluten: "CONTIENE GLUTEN.svg",
  sesame: "GRANOS DE SÉSAMO.svg",
  eggs: "HUEVOS.svg",
  lupins: "ALTRAMUCES.svg",
  peanuts: "CACAHUETES.svg",
};

export function AllergenIcon({ code, size = 40 }: AllergenIconProps) {
  const fileName = fileMap[code];

  return (
    <Image
      src={`/badges-alergenes/${fileName}`}
      alt={code}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
