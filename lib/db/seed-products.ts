import { Pool } from "pg";
import "dotenv/config";

interface SeedItem {
  sku: string;
  name: string;
  description: string;
  jewelleryType: string;
  diamondGrades: string[];
  goldPurities: string[];
  goldColours: string[];
  sizes: string[];
  bannerImage: string;
  grossWeight: string;
  netGoldWeight: string;
  diamondPieces: number;
  totalDiamondWeight: string;
  diamondPrice: string;
  makingCharge: string;
  dimensions: { height: string; width: string; length: string };
  price: number;
  strikethroughPrice?: number;
  stock: number;
  gallery?: string[];
}

const seedItems: SeedItem[] = [
  {
    sku: "MR-84920",
    name: "Bhvita 18KT Rose Gold Filigree Solitaire Diamond Ring",
    description:
      "Handcrafted filigree solitaire diamond ring in 18KT rose gold featuring an IGI certified lab-grown diamond with micro-pavé accents.",
    jewelleryType: "ring",
    diamondGrades: ["VVS-EF", "SI-IJ"],
    goldPurities: ["18KT"],
    goldColours: ["rose", "yellow", "white"],
    sizes: ["10", "11", "12", "13", "14"],
    bannerImage: "/PDP/product1.jpg",
    grossWeight: "4.950",
    netGoldWeight: "4.820",
    diamondPieces: 15,
    totalDiamondWeight: "0.650",
    diamondPrice: "32000.00",
    makingCharge: "5500.00",
    dimensions: { height: "5.10", width: "6.20", length: "20.00" },
    price: 48250,
    strikethroughPrice: 54000,
    stock: 10,
    gallery: [
      "/PDP/product1.jpg",
      "/PDP/product2.jpg",
      "/PDP/product3.jpg",
      "/PDP/product4.jpg",
      "/PDP/product5.jpg",
    ],
  },
  {
    sku: "MIR-001",
    name: "Gold Diamond Ring",
    description: "A rose gold ring with round brilliant diamonds handcrafted to perfection.",
    jewelleryType: "ring",
    diamondGrades: ["EF-VVS", "IJ-SI"],
    goldPurities: ["14KT", "18KT"],
    goldColours: ["yellow", "rose", "white"],
    sizes: ["10", "11", "12", "13"],
    bannerImage: "/customize/custom1.png",
    grossWeight: "3.100",
    netGoldWeight: "3.000",
    diamondPieces: 12,
    totalDiamondWeight: "0.500",
    diamondPrice: "15000.00",
    makingCharge: "3000.00",
    dimensions: { height: "5.20", width: "8.00", length: "20.00" },
    price: 48250,
    strikethroughPrice: 52000,
    stock: 12,
    gallery: ["/customize/custom1.png", "/PDP/product2.jpg", "/PDP/product3.jpg"],
  },
  {
    sku: "MIR-002",
    name: "Celeste Cushion Halo Diamond Pendant",
    description: "Lab-grown cushion solitaire with sparkling micro-pavé halo setting.",
    jewelleryType: "necklace",
    diamondGrades: ["VVS2-DE", "VVS1-EF"],
    goldPurities: ["18KT"],
    goldColours: ["white", "yellow"],
    sizes: ["16 inch", "18 inch"],
    bannerImage: "/customize/custom4.png",
    grossWeight: "4.500",
    netGoldWeight: "4.200",
    diamondPieces: 28,
    totalDiamondWeight: "1.200",
    diamondPrice: "48000.00",
    makingCharge: "6500.00",
    dimensions: { height: "14.50", width: "12.00", length: "450.00" },
    price: 89500,
    strikethroughPrice: 96000,
    stock: 5,
    gallery: ["/customize/custom4.png", "/PDP/explore2.png"],
  },
  {
    sku: "MIR-003",
    name: "Elysian Solitaire Tennis Diamond Bracelet",
    description: "Classic continuous row of brilliant round cut natural diamonds.",
    jewelleryType: "bracelet",
    diamondGrades: ["VS1-FG", "VVS2-EF"],
    goldPurities: ["18KT"],
    goldColours: ["yellow", "white", "rose"],
    sizes: ["6.5 inch", "7 inch"],
    bannerImage: "/customize/custom1.png",
    grossWeight: "12.800",
    netGoldWeight: "11.900",
    diamondPieces: 54,
    totalDiamondWeight: "3.500",
    diamondPrice: "165000.00",
    makingCharge: "14000.00",
    dimensions: { height: "3.20", width: "4.10", length: "180.00" },
    price: 245000,
    strikethroughPrice: 260000,
    stock: 2,
    gallery: ["/customize/custom1.png", "/PDP/explore1.png"],
  },
  {
    sku: "MIR-004",
    name: "Aura Butterfly Motif Diamond Drop Earrings",
    description: "Delicate feminine butterfly silhouette adorned with pave diamonds.",
    jewelleryType: "earring",
    diamondGrades: ["VVS1-DF", "VS-GH"],
    goldPurities: ["14KT", "18KT"],
    goldColours: ["rose", "yellow"],
    sizes: ["Standard"],
    bannerImage: "/customize/custom2.png",
    grossWeight: "5.400",
    netGoldWeight: "5.100",
    diamondPieces: 36,
    totalDiamondWeight: "0.900",
    diamondPrice: "34000.00",
    makingCharge: "4500.00",
    dimensions: { height: "22.00", width: "11.50", length: "14.00" },
    price: 64900,
    strikethroughPrice: 72000,
    stock: 8,
    gallery: ["/customize/custom2.png", "/PDP/explore5.png"],
  },
  {
    sku: "MIR-005",
    name: "The Royal Mirage 2.05ct Oval Solitaire Ring",
    description: "Magnificent single oval solitaire set with hidden diamond gallery.",
    jewelleryType: "solitaire",
    diamondGrades: ["IF-D", "VVS1-EF"],
    goldPurities: ["18KT", "950 Platinum"],
    goldColours: ["white", "yellow"],
    sizes: ["11", "12", "13", "14"],
    bannerImage: "/lab-grown/grownbanner.png",
    grossWeight: "6.200",
    netGoldWeight: "5.700",
    diamondPieces: 1,
    totalDiamondWeight: "2.050",
    diamondPrice: "240000.00",
    makingCharge: "18000.00",
    dimensions: { height: "8.10", width: "9.50", length: "24.00" },
    price: 310000,
    strikethroughPrice: 335000,
    stock: 1,
    gallery: ["/lab-grown/grownbanner.png", "/PDP/product1.jpg"],
  },
  {
    sku: "MIR-006",
    name: "Seraphina Open Cuff Diamond Bangle",
    description: "Flexible modern cuff with micro-pave diamond terminals.",
    jewelleryType: "bracelet",
    diamondGrades: ["VVS2-EF"],
    goldPurities: ["18KT"],
    goldColours: ["yellow", "rose"],
    sizes: ["2.4", "2.6"],
    bannerImage: "/customize/custom3.png",
    grossWeight: "9.800",
    netGoldWeight: "9.300",
    diamondPieces: 42,
    totalDiamondWeight: "1.450",
    diamondPrice: "78000.00",
    makingCharge: "9500.00",
    dimensions: { height: "4.50", width: "60.00", length: "55.00" },
    price: 138000,
    strikethroughPrice: 150000,
    stock: 0,
    gallery: ["/customize/custom3.png"],
  },
  {
    sku: "MIR-007",
    name: "Bhvita 22KT Bracelet",
    description: "Exquisite 22KT artisanal gold bracelet with subtle diamond highlights.",
    jewelleryType: "bracelet",
    diamondGrades: ["EF-VVS"],
    goldPurities: ["22KT"],
    goldColours: ["yellow"],
    sizes: ["6.5 inch", "7 inch"],
    bannerImage: "/PDP/explore1.png",
    grossWeight: "8.400",
    netGoldWeight: "8.100",
    diamondPieces: 10,
    totalDiamondWeight: "0.350",
    diamondPrice: "18000.00",
    makingCharge: "5000.00",
    dimensions: { height: "3.00", width: "4.00", length: "175.00" },
    price: 38255,
    strikethroughPrice: 40255,
    stock: 6,
    gallery: ["/PDP/explore1.png"],
  },
  {
    sku: "MIR-008",
    name: "Bhvita 22KT Necklace",
    description: "Graceful 22KT gold necklace handcrafted with lustrous brilliant accents.",
    jewelleryType: "necklace",
    diamondGrades: ["EF-VVS"],
    goldPurities: ["22KT"],
    goldColours: ["yellow"],
    sizes: ["16 inch"],
    bannerImage: "/PDP/explore2.png",
    grossWeight: "10.200",
    netGoldWeight: "9.900",
    diamondPieces: 14,
    totalDiamondWeight: "0.450",
    diamondPrice: "22000.00",
    makingCharge: "6000.00",
    dimensions: { height: "12.00", width: "10.00", length: "400.00" },
    price: 38255,
    strikethroughPrice: 40255,
    stock: 4,
    gallery: ["/PDP/explore2.png"],
  },
  {
    sku: "MIR-009",
    name: "22KT Gold Diamond Ring",
    description: "Contemporary 22KT gold ring encrusted with brilliant cut diamonds.",
    jewelleryType: "ring",
    diamondGrades: ["EF-VVS"],
    goldPurities: ["22KT"],
    goldColours: ["yellow"],
    sizes: ["11", "12", "13"],
    bannerImage: "/PDP/explore3.png",
    grossWeight: "5.100",
    netGoldWeight: "4.850",
    diamondPieces: 8,
    totalDiamondWeight: "0.280",
    diamondPrice: "16000.00",
    makingCharge: "4200.00",
    dimensions: { height: "4.80", width: "6.00", length: "20.00" },
    price: 38255,
    strikethroughPrice: 40255,
    stock: 7,
    gallery: ["/PDP/explore3.png"],
  },
  {
    sku: "MIR-010",
    name: "Bhvita 22KT Layered Necklace",
    description: "Layered elegance in pure 22KT hallmarked gold with fine diamond pavé.",
    jewelleryType: "necklace",
    diamondGrades: ["EF-VVS"],
    goldPurities: ["22KT"],
    goldColours: ["yellow"],
    sizes: ["18 inch"],
    bannerImage: "/PDP/explore4.png",
    grossWeight: "11.500",
    netGoldWeight: "11.100",
    diamondPieces: 16,
    totalDiamondWeight: "0.520",
    diamondPrice: "24000.00",
    makingCharge: "6500.00",
    dimensions: { height: "15.00", width: "12.00", length: "450.00" },
    price: 38255,
    strikethroughPrice: 40255,
    stock: 5,
    gallery: ["/PDP/explore4.png"],
  },
  {
    sku: "MIR-011",
    name: "Bhvita 22KT Diamond Earring",
    description: "Signature drop earrings handcrafted in 22KT gold with delicate diamonds.",
    jewelleryType: "earring",
    diamondGrades: ["EF-VVS"],
    goldPurities: ["22KT"],
    goldColours: ["yellow"],
    sizes: ["Standard"],
    bannerImage: "/PDP/explore5.png",
    grossWeight: "4.800",
    netGoldWeight: "4.550",
    diamondPieces: 12,
    totalDiamondWeight: "0.380",
    diamondPrice: "17500.00",
    makingCharge: "4000.00",
    dimensions: { height: "18.00", width: "8.50", length: "12.00" },
    price: 38255,
    strikethroughPrice: 40255,
    stock: 9,
    gallery: ["/PDP/explore5.png"],
  },
];

export async function seedProducts() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 2,
    connectionTimeoutMillis: 10_000,
  });

  try {
    console.log("Starting idempotent product seed...");

    for (const item of seedItems) {
      // 1. Check if product exists by SKU
      const existing = await pool.query(
        "SELECT id FROM products WHERE sku = $1",
        [item.sku]
      );

      let productId: string;

      if (existing.rows.length > 0) {
        productId = existing.rows[0].id;
        console.log(`Product ${item.sku} exists (${productId}), updating...`);

        await pool.query(
          `UPDATE products SET
            name = $1,
            description = $2,
            jewellery_type = $3,
            diamond_grades = $4,
            gold_purities = $5,
            gold_colours = $6,
            sizes = $7,
            banner_image = $8,
            gross_weight = $9,
            net_gold_weight = $10,
            diamond_pieces = $11,
            total_diamond_weight = $12,
            diamond_price = $13,
            making_charge = $14,
            dimensions = $15,
            updated_at = NOW()
          WHERE id = $16`,
          [
            item.name,
            item.description,
            item.jewelleryType,
            item.diamondGrades,
            item.goldPurities,
            item.goldColours,
            item.sizes,
            item.bannerImage,
            item.grossWeight,
            item.netGoldWeight,
            item.diamondPieces,
            item.totalDiamondWeight,
            item.diamondPrice,
            item.makingCharge,
            JSON.stringify(item.dimensions),
            productId,
          ]
        );
      } else {
        console.log(`Creating product ${item.sku} (${item.name})...`);
        const insertRes = await pool.query(
          `INSERT INTO products (
            sku, name, description, jewellery_type,
            diamond_grades, gold_purities, gold_colours, sizes,
            banner_image, gross_weight, net_gold_weight,
            diamond_pieces, total_diamond_weight, diamond_price,
            making_charge, dimensions, created_at, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW()
          ) RETURNING id`,
          [
            item.sku,
            item.name,
            item.description,
            item.jewelleryType,
            item.diamondGrades,
            item.goldPurities,
            item.goldColours,
            item.sizes,
            item.bannerImage,
            item.grossWeight,
            item.netGoldWeight,
            item.diamondPieces,
            item.totalDiamondWeight,
            item.diamondPrice,
            item.makingCharge,
            JSON.stringify(item.dimensions),
          ]
        );
        productId = insertRes.rows[0].id;
      }

      // 2. Ensure default variant exists
      const variantSku = `${item.sku}-DEFAULT`;
      const existingVar = await pool.query(
        "SELECT id FROM product_variants WHERE sku = $1",
        [variantSku]
      );

      let variantId: string;
      if (existingVar.rows.length > 0) {
        variantId = existingVar.rows[0].id;
        await pool.query(
          `UPDATE product_variants SET
            name = $1,
            metal_colour = $2,
            gold_purity = $3,
            diamond_grade = $4,
            size = $5,
            price = $6,
            strikethrough_price = $7,
            stock = $8,
            is_in_stock = $9,
            updated_at = NOW()
          WHERE id = $10`,
          [
            item.name,
            item.goldColours[0] || "rose",
            item.goldPurities[0] || "18KT",
            item.diamondGrades[0] || "EF-VVS",
            item.sizes[0] || "Standard",
            item.price.toFixed(2),
            item.strikethroughPrice ? item.strikethroughPrice.toFixed(2) : null,
            item.stock,
            item.stock > 0,
            variantId,
          ]
        );
      } else {
        const insertVar = await pool.query(
          `INSERT INTO product_variants (
            product_id, sku, name, metal_colour, gold_purity,
            diamond_grade, size, price, strikethrough_price,
            stock, is_in_stock, created_at, updated_at
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW()
          ) RETURNING id`,
          [
            productId,
            variantSku,
            item.name,
            item.goldColours[0] || "rose",
            item.goldPurities[0] || "18KT",
            item.diamondGrades[0] || "EF-VVS",
            item.sizes[0] || "Standard",
            item.price.toFixed(2),
            item.strikethroughPrice ? item.strikethroughPrice.toFixed(2) : null,
            item.stock,
            item.stock > 0,
          ]
        );
        variantId = insertVar.rows[0].id;
      }

      // 3. Ensure product_media records exist for this variant & product
      const gallery = item.gallery && item.gallery.length > 0 ? item.gallery : [item.bannerImage];
      for (const mediaUrl of gallery) {
        const existingMedia = await pool.query(
          "SELECT id FROM product_media WHERE product_variant_id = $1 AND media_url = $2",
          [variantId, mediaUrl]
        );
        if (existingMedia.rows.length === 0) {
          await pool.query(
            `INSERT INTO product_media (
              product_variant_id, product_id, media_type, media_url, created_at
            ) VALUES ($1, $2, 'image', $3, NOW())`,
            [variantId, productId, mediaUrl]
          );
        }
      }
    }

    console.log("Product seed completed successfully!");
  } finally {
    await pool.end();
  }
}

if (process.argv[1] && process.argv[1].endsWith("seed-products.ts")) {
  seedProducts()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seed error:", err);
      process.exit(1);
    });
}

