import type { PublicCollectionProduct } from "@/lib/actions/products";

export type FilterGroup = "material" | "stone" | "karatage" | "diamondGrade" | "size";
export type Filters = { categories: string[]; price: string } & Record<FilterGroup, string[]>;
export type FilterSection = { key: FilterGroup; label: string; options: string[] };

export const filterGroups: FilterGroup[] = ["material", "stone", "karatage", "diamondGrade", "size"];
export const emptyFilters: Filters = { categories: [], price: "", material: [], stone: [], karatage: [], diamondGrade: [], size: [] };

export const budgetRanges = [
  { value: "25000-50000", label: "Rs. 25k to 50k" },
  { value: "50000-100000", label: "Rs. 50k to 100k" },
  { value: "100000-500000", label: "Rs. 100k to 500k" },
  { value: "500000-plus", label: "Above Rs. 500k" },
];

export const priceRanges = [
  { value: "under-25000", label: "Under ₹25,000" },
  ...budgetRanges,
  { value: "under-5000", label: "Under ₹5,000" },
  { value: "5000-10000", label: "₹5,000 – ₹10,000" },
  { value: "10000-25000", label: "₹10,000 – ₹25,000" },
  { value: "25000-plus", label: "₹25,000+" },
  { value: "under-10000", label: "Under ₹10,000" },
  { value: "under-15000", label: "Under ₹15,000" },
  { value: "under-20000", label: "Under ₹20,000" },
  { value: "under-30000", label: "Under ₹30,000" },
  { value: "under-50000", label: "Under ₹50,000" },
  { value: "under-90000", label: "Under ₹90,000" },
  { value: "90000-plus", label: "Above ₹90,000" },
];

const canonicalPriceRanges = priceRanges.slice(0, 5);
const normalized = (value: string) => value.trim().toLowerCase();
function categoryKey(value: string) {
  const key = normalized(value).replace(/[-_]/g, " ");
  const aliases: Record<string, string> = { rings: "ring", earrings: "earring", necklaces: "necklace", bracelets: "bracelet", bangles: "bangle", pendants: "pendant", solitaires: "solitaire", "kids jewellery": "kids" };
  return aliases[key] || key;
}

export function matchesPrice(price: number, range: string) {
  if (!range) return true;
  if (price <= 0) return false;
  if (range.startsWith("under-")) return price < Number(range.slice(6));
  if (range.endsWith("-plus")) return price >= Number(range.slice(0, -5));
  const [min, max] = range.split("-").map(Number);
  return Number.isFinite(min) && Number.isFinite(max) && price >= min && price < max;
}

export function filterValues(product: PublicCollectionProduct, group: FilterGroup): string[] {
  switch (group) {
    case "material": return product.materials;
    case "stone": return product.stone ? [product.stone] : [];
    case "karatage": return product.goldPurities;
    case "diamondGrade": return product.diamondGrades;
    case "size": return product.sizes;
  }
}

export function matchesFilters(product: PublicCollectionProduct, filters: Filters) {
  if (filters.categories.length && !filters.categories.some((value) => product.categoryAliases.some((alias) => categoryKey(alias) === categoryKey(value)))) return false;
  if (!matchesPrice(product.price, filters.price)) return false;
  return filterGroups.every((group) => !filters[group].length || filters[group].some((selected) => filterValues(product, group).some((value) => (group === "material" && normalized(selected) === "gold" ? /gold$/i.test(value) : normalized(value) === normalized(selected)))));
}

export function getCollectionFilterOptions(products: PublicCollectionProduct[]) {
  const unique = (values: string[]) => [...new Map(values.filter(Boolean).map((value) => [normalized(value), value])).values()].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const definitions: { key: FilterGroup; label: string }[] = [
    { key: "material", label: "Gold colour" }, { key: "karatage", label: "Metal purity" },
    { key: "diamondGrade", label: "Diamond grade" }, { key: "size", label: "Size" }, { key: "stone", label: "Stone" },
  ];
  return {
    categories: unique(products.map((product) => product.type)),
    sections: definitions.map((section) => ({ ...section, options: unique(products.flatMap((product) => filterValues(product, section.key))) })).filter((section) => section.options.length),
    prices: canonicalPriceRanges.filter((range) => products.some((product) => matchesPrice(product.price, range.value))),
  };
}

export function parseCollectionFilters(params: Record<string, string | string[] | undefined>, products: PublicCollectionProduct[] = []): Filters {
  const readList = (key: string) => {
    const values = params[key];
    const knownValues = key === "category" ? products.flatMap((product) => product.categoryAliases) : filterGroups.includes(key as FilterGroup) ? products.flatMap((product) => filterValues(product, key as FilterGroup)) : [];
    return [...new Set((Array.isArray(values) ? values : typeof values === "string" ? [values] : []).flatMap((value) => knownValues.some((known) => normalized(known) === normalized(value)) ? [value] : value.split(",")).map((value) => value.trim()).filter((value) => value && value.length <= 100))].slice(0, 50);
  };
  const readGroup = (key: FilterGroup) => {
    const choices = products.flatMap((product) => filterValues(product, key));
    return [...new Set(readList(key).map((value) => choices.find((choice) => normalized(choice) === normalized(value)) || value))];
  };
  const price = Array.isArray(params.price) ? params.price[0] : params.price;
  return {
    categories: [...new Set(readList("category").map((value) => products.find((product) => product.categoryAliases.some((alias) => categoryKey(alias) === categoryKey(value)))?.type || value))], price: priceRanges.some((range) => range.value === price) ? price! : "",
    material: readGroup("material"), stone: readGroup("stone"), karatage: readGroup("karatage"), diamondGrade: readGroup("diamondGrade"), size: readGroup("size"),
  };
}

export function collectionFilterUrl(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.categories.length) filters.categories.forEach((value) => params.append("category", value));
  if (filters.price) params.set("price", filters.price);
  for (const key of filterGroups) if (filters[key].length) filters[key].forEach((value) => params.append(key, value));
  const query = params.toString();
  return `/collection${query ? `?${query}` : ""}`;
}
