const navFilters: Record<string, Record<string, string>> = {
  Rings: { category: "Rings" },
  "Ear Rings": { category: "Earrings" },
  Bracelet: { category: "Bracelets" },
  Bangles: { category: "Bangles" },
  Pendant: { category: "Pendants" },
  Necklace: { category: "Necklaces" },
  Gifting: { occasion: "Gifting" },
  Bridal: { occasion: "Wedding" },
  Collection: {},
};

function collectionUrl(filters: Record<string, string>) {
  const query = new URLSearchParams(filters).toString();
  return `/collection${query ? `?${query}` : ""}`;
}

export function collectionNavHref(label: string) {
  return collectionUrl(navFilters[label] ?? {});
}

export function collectionMenuHref(nav: string, column: string, item: string) {
  const filters = { ...(navFilters[nav] ?? {}) };

  switch (column) {
    case "FEATURED":
      if (item === "New Arrival") filters.collection = "New Arrivals";
      if (item === "Best Seller") filters.collection = "Best Sellers";
      if (item === "Most Gifted") filters.occasion = "Gifting";
      break;
    case "STYLE":
      filters.style = item;
      break;
    case "OCCASION":
      filters.occasion = item;
      break;
    case "METAL & STONE":
      if (["Diamond", "Gemstone", "Pearl"].includes(item)) filters.stone = item;
      if (["Gold", "Rose Gold", "Plain Gold"].includes(item)) filters.material = item;
      if (item === "Silver") filters.material = "Sterling Silver";
      if (item === "Solitaire") { filters.category = "Rings"; filters.stone = "Diamond"; }
      break;
    case "PRICE": {
      const prices: Record<string, string> = {
        "Under 10k": "under-10000", "Under 15k": "under-15000", "Under 20k": "under-20000",
        "Under 30k": "under-30000", "Under 50k": "under-50000", "Under 90k": "under-90000", "Above 90k": "90000-plus",
      };
      if (prices[item]) filters.price = prices[item];
      break;
    }
    case "KARATAGE":
      filters.karatage = item;
      break;
    case "SHOP FOR":
      filters.shopFor = item;
      break;
  }

  return collectionUrl(filters);
}
