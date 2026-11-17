export interface ProductDimensions {
  height: string;
  width: string;
  length: string;
}

export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  jewelleryType: "ring" | "necklace" | "earring" | "bracelet" | "solitaire" | string;
  diamondGrades: string[];
  goldPurities: string[];
  goldColours: string[];
  sizes: string[];
  grossWeight: string;
  netGoldWeight: string;
  diamondPieces: number;
  totalDiamondWeight: string;
  diamondPrice: string;
  makingCharge: string;
  dimensions: ProductDimensions;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
  bannerImage?: string;
  mediaUrls?: string[];
  categoryId?: string | null;
}

