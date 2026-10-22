import { Pool } from "pg";
import "dotenv/config";

interface SeedCategory {
  name: string;
  slug: string;
  redirectSlug?: string;
  bannerImage?: string;
  description?: string;
  priority: number;
}

const seedCategories: SeedCategory[] = [
  {
    name: "Rings",
    slug: "rings",
    redirectSlug: "/collection?category=Rings",
    bannerImage: "/Images/Header_ring.png",
    description: "Handcrafted natural and lab-grown diamond rings in 14KT, 18KT, and 22KT gold.",
    priority: 1,
  },
  {
    name: "Earrings",
    slug: "earrings",
    redirectSlug: "/collection?category=Earrings",
    bannerImage: "/Images/Header_earring.png",
    description: "Diamond studs, drop earrings, and hoops crafted to radiate luxury.",
    priority: 2,
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    redirectSlug: "/collection?category=Necklaces",
    bannerImage: "/Images/Header_necklace.png",
    description: "Signature diamond necklaces and chokers certified by international ateliers.",
    priority: 3,
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    redirectSlug: "/collection?category=Bracelets",
    bannerImage: "/Images/Header_bracelet.png",
    description: "Fine tennis bracelets, diamond bangles, and flexible cuffs.",
    priority: 4,
  },
  {
    name: "Bangles",
    slug: "bangles",
    redirectSlug: "/collection?category=Bangles",
    bannerImage: "/customize/custom3.png",
    description: "Traditional and modern diamond bangles in hallmarked gold.",
    priority: 5,
  },
  {
    name: "Pendants",
    slug: "pendants",
    redirectSlug: "/collection?category=Pendants",
    bannerImage: "/customize/custom4.png",
    description: "Solitaire and halo diamond pendants with certified clarity and brilliance.",
    priority: 6,
  },
  {
    name: "Solitaires",
    slug: "solitaires",
    redirectSlug: "/collection?category=Rings&stone=Diamond",
    bannerImage: "/lab-grown/grownbanner.png",
    description: "IGI and GIA authenticated solitary cut natural diamonds.",
    priority: 7,
  },
  {
    name: "Kids Jewellery",
    slug: "kids",
    redirectSlug: "/collection?shopFor=Kids",
    bannerImage: "/Images/Header_kids.png",
    description: "Delicate and safe fine diamond jewellery crafted for children.",
    priority: 8,
  },
];

export async function seedCategoriesToDb() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 2,
    connectionTimeoutMillis: 10_000,
  });

  try {
    console.log("Seeding categories into database...");
    for (const cat of seedCategories) {
      const existing = await pool.query(
        "SELECT id FROM categories WHERE slug = $1",
        [cat.slug]
      );

      if (existing.rows.length > 0) {
        console.log(`Category "${cat.name}" exists, updating...`);
        await pool.query(
          `UPDATE categories SET
            name = $1,
            redirect_slug = $2,
            banner_image = $3,
            description = $4,
            priority = $5,
            updated_at = NOW()
          WHERE slug = $6`,
          [
            cat.name,
            cat.redirectSlug,
            cat.bannerImage,
            cat.description,
            cat.priority,
            cat.slug,
          ]
        );
      } else {
        console.log(`Inserting category "${cat.name}"...`);
        await pool.query(
          `INSERT INTO categories (
            name, slug, redirect_slug, banner_image, description, priority, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
          [
            cat.name,
            cat.slug,
            cat.redirectSlug,
            cat.bannerImage,
            cat.description,
            cat.priority,
          ]
        );
      }
    }
    console.log("Categories seeded successfully!");
  } finally {
    await pool.end();
  }
}

if (process.argv[1] && process.argv[1].endsWith("seed-categories.ts")) {
  seedCategoriesToDb()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seed categories error:", err);
      process.exit(1);
    });
}

