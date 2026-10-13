export type ProductOption = {
  name: string;
  detail: string;
  tone?: string;
};

export const product = {
  slug: "bhvita-18kt-rose-gold-filigree-solitaire-diamond-ring",
  name: "Bhvita 18KT Rose Gold Filigree Solitaire Diamond Ring",
  collection: "Bespoke Artist • The Solitaire Collection",
  sku: "#MR-84920",
  badge: "Natural Solitaire",
  price: "₹48,250",
  oldPrice: "₹54,000",
  discount: "11% OFF",
  rating: "4.9 / 5.0",
  reviews: "148 Person Reviews",
  emi: "Or pay ₹16,083/mo with no-cost 3-month EMI.",
  gallery: [
    "/PDP/product1.jpg",
    "/PDP/product2.jpg",
    "/PDP/product3.jpg",
    "/PDP/product4.jpg",
    "/PDP/product5.jpg",
    "/PDP/product4.jpg",
  ],
  metalOptions: [
    { name: "Rose Gold", detail: "18KT", tone: "bg-[linear-gradient(135deg,#E4A494_0%,#F4C5B8_48%,#E3A393_100%)]" },
    { name: "Yellow Gold", detail: "18KT", tone: "bg-[linear-gradient(135deg,#E5C158_0%,#FDE599_48%,#D8B042_100%)]" },
    { name: "Platinum", detail: "950 Pure", tone: "bg-[linear-gradient(135deg,#D6D8DC_0%,#F1F3F5_48%,#B0B4B9_100%)]" },
  ] satisfies ProductOption[],
  qualities: [
    { name: "SI • IJ", detail: "Slightly Included, Warm Sparkle" },
    { name: "VVS • EF", detail: "Very Very Slight, Colorless White" },
  ],
  specs: [
    ["Product Type", "Ring"],
    ["Metal", "18KT Rose Gold"],
    ["Net Weight", "4.820 g"],
    ["Gross Weight", "4.950 g"],
    ["Diamond Weight", "0.65 ct"],
    ["Diamond Colour", "E - F"],
    ["Diamond Clarity", "VVS1"],
    ["Diamond Shape", "Round Brilliant"],
    ["Setting Type", "Prong & Pavé"],
    ["Finish", "High Polish"],
    ["Occasion", "Engagement, Wedding, Gifting"],
  ],
};

export const suiteProducts = [
  { name: "Bhvita 22KT Bracelet", image: "/PDP/explore1.png" },
  { name: "Bhvita 22KT Necklace", image: "/PDP/explore2.png" },
  { name: "22KT Gold Ring", image: "/PDP/explore3.png" },
  { name: "Bhvita 22KT Necklace", image: "/PDP/explore4.png" },
  { name: "Bhvita 22KT Earring", image: "/PDP/explore5.png" },
];
