export type FilterGroup = "material" | "stone" | "occasion" | "collection" | "style" | "karatage" | "shopFor";

export type Filters = {
  categories: string[];
  price: string;
  material: string[];
  stone: string[];
  occasion: string[];
  collection: string[];
  style: string[];
  karatage: string[];
  shopFor: string[];
};

export const emptyFilters: Filters = {
  categories: [], price: "", material: [], stone: [], occasion: [], collection: [], style: [], karatage: [], shopFor: [],
};

export const filterSections: { key: FilterGroup; label: string; options: string[] }[] = [
  { key: "material", label: "Material", options: ["Gold", "Rose Gold", "White Gold", "Sterling Silver", "Plain Gold"] },
  { key: "stone", label: "Stone", options: ["Diamond", "Emerald", "Pearl", "Ruby", "Cubic Zirconia", "Gemstone"] },
  { key: "occasion", label: "Occasion", options: ["Everyday", "Wedding", "Party", "Gifting", "Workwear", "Proposal", "Engagement"] },
  { key: "collection", label: "Collection", options: ["New Arrivals", "Best Sellers", "Trending"] },
  { key: "style", label: "Style", options: ["Cocktail", "Couple Bands", "Modern", "Open", "Vanki"] },
  { key: "karatage", label: "Karatage", options: ["9kt", "14kt", "18kt", "22kt"] },
  { key: "shopFor", label: "Shop For", options: ["Women", "Men", "Unisex", "Kids"] },
];

export const budgetRanges = [
  { value: "25000-50000", label: "Rs. 25k to 50k" },
  { value: "50000-100000", label: "Rs. 50k to 100k" },
  { value: "100000-500000", label: "Rs. 100k to 500k" },
  { value: "500000-plus", label: "Above Rs. 500k" },
];

export const priceRanges = [
  ...budgetRanges,
  { value: "under-5000", label: "Under ₹5,000" },
  { value: "5000-10000", label: "₹5,000 - ₹10,000" },
  { value: "10000-25000", label: "₹10,000 - ₹25,000" },
  { value: "25000-plus", label: "₹25,000+" },
  { value: "under-10000", label: "Under ₹10,000" },
  { value: "under-15000", label: "Under ₹15,000" },
  { value: "under-20000", label: "Under ₹20,000" },
  { value: "under-30000", label: "Under ₹30,000" },
  { value: "under-50000", label: "Under ₹50,000" },
  { value: "under-90000", label: "Under ₹90,000" },
  { value: "90000-plus", label: "Above ₹90,000" },
];

export const categoryOptions = ["Rings", "Earrings", "Necklaces", "Bracelets", "Bangles", "Pendants"];

export function parseCollectionFilters(params: Record<string, string | string[] | undefined>): Filters {
  const read = (key: string) => {
    const value = params[key];
    return typeof value === "string" ? value : undefined;
  };
  const parseList = (key: string, options: string[]) => {
    const value = read(key);
    return value ? value.split(",").filter((item) => options.includes(item)) : [];
  };

  return {
    categories: parseList("category", categoryOptions),
    price: priceRanges.some((range) => range.value === read("price")) ? read("price")! : "",
    material: parseList("material", filterSections[0].options),
    stone: parseList("stone", filterSections[1].options),
    occasion: parseList("occasion", filterSections[2].options),
    collection: parseList("collection", filterSections[3].options),
    style: parseList("style", filterSections[4].options),
    karatage: parseList("karatage", filterSections[5].options),
    shopFor: parseList("shopFor", filterSections[6].options),
  };
}

export function collectionFilterUrl(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.categories.length) params.set("category", filters.categories.join(","));
  if (filters.price) params.set("price", filters.price);
  for (const key of ["material", "stone", "occasion", "collection", "style", "karatage", "shopFor"] as const) {
    if (filters[key].length) params.set(key, filters[key].join(","));
  }
  const query = params.toString();
  return `/collection${query ? `?${query}` : ""}`;
}
