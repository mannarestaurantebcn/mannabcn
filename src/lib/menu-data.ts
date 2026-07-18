import { allergenCodeFromSpanishLabel } from "./allergens";
import { parsePrice } from "./csv";
import type { MenuCategory, MenuCategoryId, MenuGroup, MenuItem } from "./menu-types";
import { fetchSheetRows } from "./sheets";
import { SHEET_CSV_URLS } from "./sheets-config";

const CATEGORY_GROUPS: Record<MenuCategoryId, MenuGroup> = {
  tapas: "food",
  platosCombinados: "food",
  bocadillosFrios: "food",
  bocadillosCalientes: "food",
  paella: "food",
  postres: "food",
  cafes: "drinks",
  refrescos: "drinks",
  cervezas: "drinks",
  vinosSangrias: "drinks",
  combinadosLargos: "drinks",
};

const CATEGORY_ORDER = Object.keys(CATEGORY_GROUPS) as MenuCategoryId[];

function isMenuCategoryId(value: string): value is MenuCategoryId {
  return (CATEGORY_ORDER as string[]).includes(value);
}

function rowToMenuItem(row: Record<string, string>): MenuItem {
  const number = row.numero ? Number.parseInt(row.numero, 10) : undefined;
  const description =
    row.descripcion_es || row.descripcion_en
      ? { es: row.descripcion_es, en: row.descripcion_en }
      : undefined;
  const allergens = row.alergenos
    ? row.alergenos
        .split(",")
        .map((label) => allergenCodeFromSpanishLabel(label))
        .filter((code): code is NonNullable<typeof code> => Boolean(code))
    : undefined;

  return {
    number: Number.isNaN(number) ? undefined : number,
    name: { es: row.nombre_es, en: row.nombre_en },
    description,
    allergens: allergens && allergens.length > 0 ? allergens : undefined,
    price: parsePrice(row.precio),
    featured: row.destacado?.trim().toLowerCase() === "si",
  };
}

/**
 * Fetches the "Carta" tab of the client's Google Sheet and builds the menu
 * categories from it. Falls back to the last known static data (below) if
 * the sheet can't be reached, so the menu page never goes blank.
 */
export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const rows = await fetchSheetRows(SHEET_CSV_URLS.carta);
    const itemsByCategory = new Map<MenuCategoryId, MenuItem[]>();

    for (const row of rows) {
      const categoria = row.categoria?.trim();
      if (!categoria || !isMenuCategoryId(categoria)) continue;
      if (!itemsByCategory.has(categoria)) itemsByCategory.set(categoria, []);
      itemsByCategory.get(categoria)!.push(rowToMenuItem(row));
    }

    const categories: MenuCategory[] = CATEGORY_ORDER.filter((id) => itemsByCategory.has(id)).map((id) => ({
      id,
      group: CATEGORY_GROUPS[id],
      items: itemsByCategory.get(id)!,
    }));

    if (categories.length === 0) throw new Error("Carta sheet returned no valid rows");
    return categories;
  } catch (error) {
    console.error("[menu-data] Falling back to static menu data:", error);
    return menuCategories;
  }
}

export async function getFeaturedItems(limit = 6) {
  const categories = await getMenuCategories();
  const featured = categories
    .filter((category) => category.group === "food")
    .flatMap((category) => category.items.filter((item) => item.featured));
  return featured.slice(0, limit);
}

/**
 * Fallback menu data, transcribed from the restaurant's PDF menus
 * (menu .pdf / menu boisson.pdf). Used only if the live Google Sheet
 * ("Carta" tab) can't be reached — the sheet is the source of truth.
 */
const menuCategories: MenuCategory[] = [
  {
    id: "tapas",
    group: "food",
    items: [
      { number: 1, name: { es: "Ensalada con atún", en: "Salad with tuna" }, allergens: ["fish"], price: 6.5 },
      { number: 2, name: { es: "Ensalada con frutos secos y miel", en: "Salad with nuts and honey" }, allergens: ["nuts"], price: 6.5 },
      { number: 3, name: { es: "Ensalada César", en: "Caesar salad" }, allergens: ["gluten", "eggs", "milk", "fish"], featured: true, price: 7.0 },
      { number: 4, name: { es: "Ensalada con queso de cabra y nueces", en: "Salad with goat cheese and walnuts" }, allergens: ["milk", "nuts"], price: 7.8 },
      { number: 5, name: { es: "Jamón serrano", en: "Cured ham" }, price: 8.8 },
      { number: 6, name: { es: "Jamón ibérico", en: "Iberian ham" }, featured: true, price: 18.5 },
      { number: 7, name: { es: "Queso manchego", en: "Manchego cheese" }, allergens: ["milk"], price: 7.0 },
      { number: 8, name: { es: "Fuet", en: "Fuet (thin dry sausage)" }, allergens: ["sulphites"], price: 7.0 },
      { number: 9, name: { es: "Embutidos variados", en: "Assorted sausages" }, allergens: ["sulphites"], price: 18.9 },
      { number: 10, name: { es: "Pan con tomate", en: "Bread with tomato" }, allergens: ["gluten"], featured: true, price: 3.2 },
      { number: 11, name: { es: "Olivas rellenas", en: "Stuffed olives" }, allergens: ["fish"], price: 3.2 },
      { number: 12, name: { es: "Olivas con hueso", en: "Olives with pit" }, price: 3.2 },
      { number: 13, name: { es: "Olivas negras", en: "Black olives" }, price: 3.2 },
      { number: 14, name: { es: "Anchoas", en: "Anchovies" }, allergens: ["fish"], price: 6.5 },
      { number: 15, name: { es: "Berberechos", en: "Cockles" }, allergens: ["molluscs"], price: 8.2 },
      { number: 16, name: { es: "Patatas fritas", en: "French fries" }, price: 4.8 },
      { number: 17, name: { es: "Patatas bravas", en: "Spicy potatoes" }, allergens: ["eggs"], featured: true, price: 5.2 },
      { number: 18, name: { es: "Tortilla de patatas", en: "Potato omelette" }, allergens: ["eggs"], price: 5.5 },
      { number: 19, name: { es: "Croquetas de jamón ibérico (6 uds)", en: "Iberian ham croquettes (6 pcs)" }, allergens: ["gluten", "milk", "eggs"], featured: true, price: 6.8 },
      { number: 20, name: { es: "Croquetas de chipirones (6 uds)", en: "Baby squid croquettes (6 pcs)" }, allergens: ["gluten", "milk", "eggs", "molluscs"], price: 8.5 },
      { number: 21, name: { es: "Tequeños de queso", en: "Cheese tequeños (fried cheese sticks)" }, allergens: ["gluten", "milk"], price: 7.5 },
      { number: 22, name: { es: "Nuggets de pollo (8 uds)", en: "Chicken nuggets (8 pcs)" }, allergens: ["gluten", "eggs"], price: 6.5 },
      { number: 23, name: { es: "Alitas de pollo", en: "Chicken wings" }, price: 8.0 },
      { number: 24, name: { es: "Tiras de pollo", en: "Chicken strips" }, allergens: ["gluten", "eggs"], price: 8.5 },
      { number: 25, name: { es: "Rollitos de primavera (8 uds)", en: "Spring rolls (8 pcs)" }, allergens: ["gluten", "soy"], price: 6.0 },
      { number: 26, name: { es: "Gyozas de carne a la plancha (8 uds)", en: "Grilled meat dumplings (8 pcs)" }, allergens: ["gluten", "soy", "celery"], price: 7.2 },
      { number: 27, name: { es: "Wok de fideos con pollo", en: "Stir-fried noodles with chicken" }, allergens: ["gluten", "soy", "eggs"], price: 7.8 },
      { number: 28, name: { es: "Pimientos de Padrón", en: "Padrón peppers" }, featured: true, price: 6.2 },
      { number: 29, name: { es: "Huevos estrellados con jamón", en: "Scrambled eggs with ham" }, allergens: ["eggs"], featured: true, price: 8.0 },
      { number: 30, name: { es: "Morros", en: "Pork cheeks" }, price: 6.5 },
      { number: 31, name: { es: "Torrezno de Soria", en: "Torrezno (crispy pork belly)" }, price: 9.2 },
      { number: 32, name: { es: "Pinchos morunos", en: "Spiced pork skewers" }, price: 8.0 },
      { number: 33, name: { es: "Chistorra", en: "Chistorra (thin spicy sausage)" }, allergens: ["sulphites"], price: 6.8 },
      { number: 34, name: { es: "Tempura de langostinos", en: "Prawn tempura" }, allergens: ["gluten", "crustaceans", "eggs"], price: 8.5 },
      { number: 35, name: { es: "Gambas al ajillo", en: "Garlic shrimp" }, allergens: ["crustaceans"], featured: true, price: 11.5 },
      { number: 36, name: { es: "Gambas a la plancha (8 uds)", en: "Grilled prawns (8 pcs)" }, allergens: ["crustaceans"], price: 12.5 },
      { number: 37, name: { es: "Calamares a la romana", en: "Roman squid" }, allergens: ["gluten", "molluscs", "eggs"], featured: true, price: 8.9 },
      { number: 38, name: { es: "Chocos", en: "Chocos (fried cuttlefish)" }, allergens: ["gluten", "molluscs"], price: 8.5 },
      { number: 39, name: { es: "Rejos fritos", en: "Fried squid legs" }, allergens: ["gluten", "molluscs"], price: 9.5 },
      { number: 40, name: { es: "Sepia plancha", en: "Grilled cuttlefish" }, allergens: ["molluscs"], price: 13.0 },
    ],
  },
  {
    id: "platosCombinados",
    group: "food",
    items: [
      { number: 41, name: { es: "Croquetas de jamón ibérico, huevo frito y patatas", en: "Iberian ham croquettes, fried egg, chips" }, allergens: ["gluten", "milk", "eggs"], price: 9.0 },
      { number: 42, name: { es: "Nuggets, patatas y huevo frito", en: "Nuggets, chips, fried egg" }, allergens: ["gluten", "eggs"], price: 8.8 },
      { number: 43, name: { es: "Tiras de pollo, patatas, ensalada y huevo frito", en: "Chicken strips, chips, salad, fried egg" }, allergens: ["gluten", "eggs"], price: 12.0 },
      { number: 44, name: { es: "Pechuga de pollo, ensalada y patatas", en: "Chicken breast, salad, chips" }, price: 10.5 },
      { number: 45, name: { es: "Escalopa de pollo, huevo, patatas y ensalada", en: "Fried chicken cutlet, egg, chips, salad" }, allergens: ["gluten", "eggs"], price: 11.5 },
      { number: 46, name: { es: "Lomo, patatas y huevo frito", en: "Pork loin, chips, fried egg" }, allergens: ["eggs"], price: 9.8 },
      { number: 47, name: { es: "Butifarra y patatas", en: "Sausage, chips" }, allergens: ["sulphites"], price: 9.0 },
      { number: 48, name: { es: "Salchichas, patatas y huevos", en: "Sausages, chips, eggs" }, allergens: ["eggs", "sulphites"], price: 9.0 },
      { number: 49, name: { es: "Pinchos, patatas, huevo y ensalada", en: "Skewers, chips, egg, salad" }, allergens: ["eggs"], price: 11.5 },
      { number: 50, name: { es: "Beicon, huevos y patatas", en: "Bacon, eggs, chips" }, allergens: ["eggs"], price: 9.5 },
      { number: 51, name: { es: "2 hamburguesas, patatas y huevos", en: "2 hamburgers, chips, eggs" }, allergens: ["gluten", "eggs", "sulphites"], price: 9.8 },
      { number: 52, name: { es: "Entrecot, patatas, huevo y ensalada", en: "Beef steak, chips, egg, salad" }, allergens: ["eggs"], price: 16.5 },
      { number: 53, name: { es: "Chuletón, patatas, huevo y ensalada", en: "T-bone steak, chips, egg, salad" }, allergens: ["eggs"], price: 16.5 },
      { number: 54, name: { es: "Calamares a la romana con ensalada", en: "Roman squid, salad" }, allergens: ["gluten", "molluscs", "eggs"], price: 10.8 },
      { number: 55, name: { es: "Gambas plancha (8 uds) con ensalada", en: "Grilled prawns (8 pcs) with salad" }, allergens: ["crustaceans"], price: 14.5 },
      { number: 56, name: { es: "Sepia con ensalada", en: "Cuttlefish, salad" }, allergens: ["molluscs"], price: 15.5 },
      { number: 57, name: { es: "Merluza plancha con ensalada", en: "Grilled hake, salad" }, allergens: ["fish"], price: 10.5 },
      { number: 58, name: { es: "Salmón plancha con ensalada", en: "Grilled salmon, salad" }, allergens: ["fish"], featured: true, price: 15.0 },
      { number: 59, name: { es: "Atún plancha con ensalada", en: "Grilled tuna, salad" }, allergens: ["fish"], price: 15.0 },
      { number: 60, name: { es: "Dorada plancha con ensalada", en: "Grilled bream, salad" }, allergens: ["fish"], price: 13.5 },
      { number: 61, name: { es: "Lubina plancha con ensalada", en: "Grilled sea bass, salad" }, allergens: ["fish"], price: 13.5 },
    ],
  },
  {
    id: "bocadillosFrios",
    group: "food",
    items: [
      { number: 62, name: { es: "Jamón dulce", en: "Sweet ham" }, allergens: ["gluten"], price: 4.5 },
      { number: 63, name: { es: "Jamón serrano", en: "Cured ham" }, allergens: ["gluten"], price: 4.5 },
      { number: 64, name: { es: "Fuet", en: "Fuet (thin dry sausage)" }, allergens: ["gluten", "sulphites"], price: 4.5 },
      { number: 65, name: { es: "Chorizo ibérico", en: "Iberian chorizo" }, allergens: ["gluten", "sulphites"], price: 4.5 },
      { number: 66, name: { es: "Salchichón ibérico", en: "Iberian salchichón" }, allergens: ["gluten", "sulphites"], price: 4.5 },
      { number: 67, name: { es: "Queso manchego", en: "Manchego cheese" }, allergens: ["gluten", "milk"], price: 4.5 },
      { number: 68, name: { es: "Atún", en: "Tuna" }, allergens: ["gluten", "fish"], price: 4.5 },
      { number: 69, name: { es: "Vegetal de atún", en: "Tuna with vegetables" }, allergens: ["gluten", "fish", "eggs"], price: 6.0 },
      { number: 70, name: { es: "Anchoas", en: "Anchovies" }, allergens: ["gluten", "fish"], price: 5.0 },
    ],
  },
  {
    id: "bocadillosCalientes",
    group: "food",
    items: [
      { number: 71, name: { es: "Lomo", en: "Pork loin" }, allergens: ["gluten"], price: 5.0 },
      { number: 72, name: { es: "Lomo con queso", en: "Pork loin with cheese" }, allergens: ["gluten", "milk"], price: 6.0 },
      { number: 73, name: { es: "Lomo, beicon y queso", en: "Pork loin, bacon, cheese" }, allergens: ["gluten", "milk"], price: 7.5 },
      { number: 74, name: { es: "Beicon", en: "Bacon" }, allergens: ["gluten"], price: 5.0 },
      { number: 75, name: { es: "Beicon con queso", en: "Bacon with cheese" }, allergens: ["gluten", "milk"], price: 6.0 },
      { number: 76, name: { es: "Pechuga de pollo", en: "Chicken breast" }, allergens: ["gluten"], price: 5.0 },
      { number: 77, name: { es: "Vegetal de pollo", en: "Chicken with vegetables" }, allergens: ["gluten"], price: 6.5 },
      { number: 78, name: { es: "Salchichas", en: "Sausages" }, allergens: ["gluten", "sulphites"], price: 5.0 },
      { number: 79, name: { es: "Frankfurt", en: "Hot dog" }, allergens: ["gluten", "sulphites"], price: 4.5 },
      { number: 80, name: { es: "Tortilla francesa", en: "French omelette" }, allergens: ["gluten", "eggs"], price: 4.5 },
      { number: 81, name: { es: "Tortilla de patatas", en: "Potato omelette" }, allergens: ["gluten", "eggs"], price: 5.0 },
      { number: 82, name: { es: "Tortilla con atún", en: "Omelette with tuna" }, allergens: ["gluten", "eggs", "fish"], price: 5.5 },
      { number: 83, name: { es: "Tortilla con chorizo", en: "Omelette with chorizo" }, allergens: ["gluten", "eggs", "sulphites"], price: 5.5 },
      { number: 84, name: { es: "Tortilla con beicon", en: "Omelette with bacon" }, allergens: ["gluten", "eggs"], price: 6.0 },
      { number: 85, name: { es: "Tortilla con jamón dulce", en: "Omelette with sweet ham" }, allergens: ["gluten", "eggs"], price: 5.5 },
      { number: 86, name: { es: "Tortilla con jamón serrano", en: "Omelette with cured ham" }, allergens: ["gluten", "eggs"], price: 6.0 },
      { number: 87, name: { es: "Bikini", en: "Bikini (ham & cheese toasted sandwich)" }, allergens: ["gluten", "milk"], price: 3.5 },
      { number: 88, name: { es: "Calamares a la romana", en: "Roman squid" }, allergens: ["gluten", "molluscs", "eggs"], price: 7.0 },
      { number: 89, name: { es: "Hamburguesa con queso", en: "Hamburger with cheese" }, allergens: ["gluten", "milk", "sesame"], featured: true, price: 4.8 },
      { number: 90, name: { es: "Hamburguesa completa", en: "Complete hamburger (lettuce, tomato, cheese, bacon, egg)" }, allergens: ["gluten", "milk", "sesame", "eggs"], featured: true, price: 7.0 },
    ],
  },
  {
    id: "paella",
    group: "food",
    items: [
      { number: 91, name: { es: "Paella de marisco", en: "Seafood paella (rice)" }, allergens: ["fish", "crustaceans", "molluscs"], featured: true, price: 15.0 },
      { number: 92, name: { es: "Fideuá de marisco", en: "Seafood noodles" }, allergens: ["gluten", "fish", "crustaceans", "molluscs"], featured: true, price: 15.0 },
    ],
  },
  {
    id: "postres",
    group: "food",
    items: [
      { number: 93, name: { es: "Tarta de queso con arándano casero", en: "Homemade cheesecake with blueberries" }, allergens: ["gluten", "milk", "eggs"], price: 4.0 },
      { number: 94, name: { es: "Bizcocho de almendra / zanahoria casero", en: "Homemade almond or carrot cake" }, allergens: ["gluten", "milk", "eggs", "nuts"], price: 3.5 },
      { number: 95, name: { es: "Pudín casero", en: "Homemade pudding" }, allergens: ["gluten", "milk", "eggs"], price: 3.0 },
      { number: 96, name: { es: "Flan de huevo casero", en: "Homemade egg flan" }, allergens: ["milk", "eggs"], price: 3.0 },
      { number: 97, name: { es: "Arroz con leche", en: "Rice pudding" }, allergens: ["milk"], price: 2.5 },
      { number: 98, name: { es: "Natillas de chocolate", en: "Chocolate custard" }, allergens: ["milk"], price: 2.5 },
      { number: 99, name: { es: "Yogur natural", en: "Natural yogurt" }, allergens: ["milk"], price: 2.5 },
      { number: 100, name: { es: "Helado", en: "Ice cream" }, allergens: ["milk", "nuts", "soy", "gluten"], price: 2.5 },
    ],
  },
  {
    id: "cafes",
    group: "drinks",
    items: [
      { name: { es: "Café expreso", en: "Espresso" }, price: 1.6 },
      { name: { es: "Café cortado", en: "Cortado" }, price: 1.7 },
      { name: { es: "Café con leche", en: "Latte (coffee with milk)" }, price: 1.8, allergens: ["milk"] },
      { name: { es: "Café americano", en: "Americano" }, price: 1.8 },
      { name: { es: "Vaso de leche", en: "Glass of milk" }, price: 1.6, allergens: ["milk"] },
      { name: { es: "Infusión", en: "Herbal tea" }, price: 2.0 },
      { name: { es: "Carajillo de coñac", en: "Coffee with brandy" }, price: 2.5 },
      { name: { es: "Carajillo de anís", en: "Coffee with anisette" }, price: 2.5 },
      { name: { es: "Carajillo de ron", en: "Coffee with rum" }, price: 2.5 },
      { name: { es: "Carajillo de Bailey's", en: "Coffee with Bailey's" }, price: 3.0, allergens: ["milk"] },
      { name: { es: "Carajillo de whisky", en: "Coffee with whisky" }, price: 3.0 },
    ],
  },
  {
    id: "refrescos",
    group: "drinks",
    items: [
      { name: { es: "Coca-Cola", en: "Coke" }, price: 2.5 },
      { name: { es: "Coca-Cola Zero", en: "Coke Zero" }, price: 2.5 },
      { name: { es: "Nestea", en: "Nestea" }, price: 2.5 },
      { name: { es: "Sprite", en: "Sprite" }, price: 2.5 },
      { name: { es: "Aquarius naranja", en: "Aquarius orange" }, price: 2.5 },
      { name: { es: "Aquarius limón", en: "Aquarius lemon" }, price: 2.5 },
      { name: { es: "Fanta naranja", en: "Fanta orange" }, price: 2.5 },
      { name: { es: "Fanta limón", en: "Fanta lemon" }, price: 2.5 },
      { name: { es: "Agua pequeña", en: "Small bottle of water" }, price: 2.0 },
      { name: { es: "Agua grande", en: "Big bottle of water" }, price: 3.0 },
      { name: { es: "Agua con gas", en: "Sparkling water" }, price: 2.5 },
      { name: { es: "Gaseosa", en: "Soda pop" }, price: 2.5 },
      { name: { es: "Tónica", en: "Tonic" }, price: 2.5 },
      { name: { es: "Bitter Kas", en: "Bitter Kas" }, price: 2.5 },
      { name: { es: "Cacaolat", en: "Cacaolat" }, price: 3.5, allergens: ["milk"] },
      { name: { es: "Leche con Colacao", en: "Milk with Colacao (chocolate milk)" }, price: 2.5, allergens: ["milk"] },
      { name: { es: "Red Bull", en: "Red Bull" }, price: 3.5 },
      { name: { es: "Zumo de melocotón (botella)", en: "Bottle of peach juice" }, price: 2.5 },
      { name: { es: "Zumo de piña (botella)", en: "Bottle of pineapple juice" }, price: 2.5 },
      { name: { es: "Zumo de naranja (botella)", en: "Bottle of orange juice" }, price: 2.5 },
      { name: { es: "Zumo de naranja natural", en: "Fresh orange juice" }, price: 5.0, featured: true },
    ],
  },
  {
    id: "cervezas",
    group: "drinks",
    items: [
      { name: { es: "Quinto (200 ml)", en: "Small bottle of beer (200 ml)" }, price: 2.5, allergens: ["gluten"] },
      { name: { es: "Mediana (330 ml)", en: "Bottle of beer (330 ml)" }, price: 3.5, allergens: ["gluten"] },
      { name: { es: "Copa de cerveza Galicia", en: "Glass of beer Galicia (330 ml, light)" }, price: 3.5, allergens: ["gluten"] },
      { name: { es: "Copa de cerveza 1906", en: "Glass of beer 1906 (330 ml, dark)" }, price: 4.0, allergens: ["gluten"] },
      { name: { es: "Jarra de cerveza Galicia (0,5 L)", en: "Big glass of beer Galicia (0.5 L, light)" }, price: 6.5, allergens: ["gluten"] },
      { name: { es: "Jarra de cerveza 1906 (0,5 L)", en: "Big glass of beer 1906 (0.5 L, dark)" }, price: 7.5, allergens: ["gluten"] },
      { name: { es: "Cerveza sin alcohol", en: "Alcohol-free beer" }, price: 4.0, allergens: ["gluten"] },
      { name: { es: "Clara", en: "Shandy (beer with lemonade)" }, price: 3.5, allergens: ["gluten"] },
    ],
  },
  {
    id: "vinosSangrias",
    group: "drinks",
    items: [
      { name: { es: "Copa de vino Verdejo", en: "Glass of Verdejo wine (white)" }, price: 4.0, allergens: ["sulphites"] },
      { name: { es: "Botella de vino Verdejo", en: "Bottle of Verdejo wine (white)" }, price: 14.0, allergens: ["sulphites"] },
      { name: { es: "Copa de vino Rioja", en: "Glass of Rioja wine (red)" }, price: 4.0, allergens: ["sulphites"] },
      { name: { es: "Botella de vino Rioja", en: "Bottle of Rioja wine (red)" }, price: 14.0, allergens: ["sulphites"] },
      { name: { es: "Copa de cava", en: "Glass of cava" }, price: 3.5, allergens: ["sulphites"] },
      { name: { es: "Botella de cava", en: "Bottle of cava" }, price: 15.0, allergens: ["sulphites"] },
      { name: { es: "Copa de sangría de vino", en: "Glass of wine sangria" }, price: 8.5, allergens: ["sulphites"] },
      { name: { es: "Sangría de vino (1 L)", en: "Wine sangria (1 L)" }, price: 16.0, allergens: ["sulphites"], featured: true },
      { name: { es: "Sangría de cava (1 L)", en: "Cava sangria (1 L)" }, price: 18.0, allergens: ["sulphites"] },
    ],
  },
  {
    id: "combinadosLargos",
    group: "drinks",
    items: [
      { name: { es: "Tinto de verano", en: "Summer red wine (red wine & lemon soda)" }, price: 4.8, allergens: ["sulphites"] },
      { name: { es: "Aperol Spritz", en: "Aperol Spritz" }, price: 7.5, allergens: ["sulphites"] },
      { name: { es: "Gin Tonic", en: "Gin and tonic" }, price: 8.5 },
      { name: { es: "Cuba Libre", en: "Cuba libre" }, price: 8.5 },
    ],
  },
];
