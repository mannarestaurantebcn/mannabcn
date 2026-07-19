import Image from "next/image";
import type { AllergenCode } from "@/lib/allergens";

type AllergenIconProps = {
  code: AllergenCode;
  size?: number;
};

const fileMap: Record<AllergenCode, string> = {
  soy: "soja.svg",
  fish: "pescado.svg",
  mustard: "mostaza.svg",
  nuts: "frutos-de-cascara.svg",
  crustaceans: "crustaceos.svg",
  milk: "lacteos.svg",
  sulphites: "dioxido-de-azufre-y-sulfitos.svg",
  molluscs: "moluscos.svg",
  celery: "apio.svg",
  gluten: "contiene-gluten.svg",
  sesame: "granos-de-sesamo.svg",
  eggs: "huevos.svg",
  lupins: "altramuces.svg",
  peanuts: "cacahuetes.svg",
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
