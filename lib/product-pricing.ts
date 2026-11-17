export const GOLD_PRICING = {
  currency: "INR",
  retrievedOn: "2026-11-17",
  source: "https://www.ibjarates.com/",
  session: "AM",
  ratesPerGram: { "24KT": 13441.8, "22KT": 12312.7, "18KT": 10081.4, "14KT": 7863.5 },
} as const;

type Decimal = string | number | null | undefined;
export type PricingProduct = {
  netGoldWeight?: Decimal;
  grossWeight?: Decimal;
  totalDiamondWeight?: Decimal;
  diamondPrice?: Decimal;
  makingCharge?: Decimal;
  goldPurities?: string[];
};
export type PricingVariant = {
  price?: Decimal;
  metalColour?: string | null;
  goldPurity?: string | null;
  diamondGrade?: string | null;
  size?: string | null;
};
export type ProductSelection = Pick<PricingVariant, "metalColour" | "goldPurity" | "diamondGrade" | "size">;

const positiveNumber = (value: Decimal) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
};
const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const normalized = (value: string) => value.trim().toLowerCase().replace(/\s+/g, "");
const normalizedColour = (value: string) => normalized(value).replace(/gold$/, "");

export function getGoldRate(purity: string | null | undefined): number | null {
  const value = (purity || "").trim().toUpperCase();
  const karats = value.match(/^(\d{1,2}(?:\.\d+)?)\s*(?:KT|K|KARAT)$/)?.[1];
  if (karats) {
    const number = Number(karats);
    if (number <= 0 || number > 24) return null;
    const published = GOLD_PRICING.ratesPerGram[`${number}KT` as keyof typeof GOLD_PRICING.ratesPerGram];
    return published ?? money(GOLD_PRICING.ratesPerGram["24KT"] * number / 24);
  }
  const fineness: Record<string, keyof typeof GOLD_PRICING.ratesPerGram> = { "999": "24KT", "999.9": "24KT", "916": "22KT", "750": "18KT", "585": "14KT" };
  return fineness[value] ? GOLD_PRICING.ratesPerGram[fineness[value]] : null;
}

export function calculateProductPrice(product: PricingProduct, purity?: string | null, override?: Decimal) {
  const netWeightProvided = product.netGoldWeight !== null && product.netGoldWeight !== undefined && product.netGoldWeight !== "";
  const goldWeight = netWeightProvided ? positiveNumber(product.netGoldWeight) : Math.max(0, positiveNumber(product.grossWeight) - positiveNumber(product.totalDiamondWeight) * 0.2);
  const selectedPurity = purity ?? product.goldPurities?.[0] ?? null;
  const goldRate = getGoldRate(selectedPurity);
  const goldPrice = goldWeight > 0 && goldRate !== null ? money(goldWeight * goldRate) : null;
  const diamondPrice = money(positiveNumber(product.diamondPrice));
  const makingCharge = money(positiveNumber(product.makingCharge));
  const manualPrice = positiveNumber(override);
  const calculated = goldWeight > 0 && goldPrice === null ? null : money((goldPrice || 0) + diamondPrice + makingCharge);
  const amount = manualPrice > 0 ? money(manualPrice) : calculated && calculated > 0 ? calculated : null;
  return { amount, goldWeight, goldRate, goldPrice, diamondPrice, makingCharge, purity: selectedPurity, manual: manualPrice > 0, usesGrossWeight: !netWeightProvided && goldWeight > 0 };
}

export function getCataloguePrice(product: PricingProduct, variants: PricingVariant[] = []) {
  const choices = variants.length
    ? variants.flatMap((variant) => (variant.goldPurity ? [variant.goldPurity] : product.goldPurities?.length ? product.goldPurities : [null]).map((purity) => calculateProductPrice(product, purity, variant.price).amount))
    : (product.goldPurities?.length ? product.goldPurities : [null]).map((purity) => calculateProductPrice(product, purity).amount);
  const amounts = choices.filter((amount): amount is number => amount !== null);
  return { price: amounts.length ? Math.min(...amounts) : null, from: new Set(choices).size > 1 };
}

export function findMatchingVariant<T extends PricingVariant>(variants: T[], selection: ProductSelection): T | undefined {
  const fields = ["metalColour", "goldPurity", "diamondGrade", "size"] as const;
  return variants.filter((variant) => fields.every((field) => {
    if (!variant[field]) return true;
    const normalize = field === "metalColour" ? normalizedColour : normalized;
    return normalize(variant[field]!) === normalize(selection[field] || "");
  })).sort((a, b) => fields.filter((field) => Boolean(b[field])).length - fields.filter((field) => Boolean(a[field])).length)[0];
}

export function formatProductPrice(amount: number | null) {
  return amount !== null && amount > 0 ? `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}` : "Enquire for Pricing";
}
