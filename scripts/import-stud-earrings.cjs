require("dotenv/config");
const { Pool } = require("pg");

const items = [
  ["MD-E001", "Classic Round Brilliant Solitaire", "The traditional round diamond with maximum sparkle. Suitable for daily wear, gifting and timeless luxury.", ["950 Platinum"], null, 2],
  ["MD-E002", "Bezel-Setting Solitaire", "The diamond is surrounded by a thin gold rim, creating a modern, clean look with extra protection around the stone.", ["14K"], null, 1],
  ["MD-E003", "Martini-Setting Solitaire", "A tapered three-prong setting that sits close to the earlobe and gives the diamond a sleek, minimal appearance.", [], null, 2],
  ["MD-E004", "Princess-Cut Solitaire", "A square-shaped diamond with a contemporary, geometric look.", [], null, 2],
  ["MD-E005", "Oval Solitaire", "An elongated shape that gives an elegant, distinctive appearance while retaining a classic solitaire design.", ["14K"], null, 1],
  ["MD-E006", "Pear-Shaped Solitaire", "A teardrop-shaped diamond for customers who want a distinctive design rather than a traditional round stud.", [], "2.000", 3],
  ["MD-E007", "Petite Halo Solitaire", "A centre diamond surrounded by a fine circle of small diamonds.", [], null, 2],
  ["MD-E008", "Classic Heart Solitaire", "One heart-shaped diamond in a delicate yellow-gold prong setting. Elegant, timeless and romantic.", [], null, 1],
  ["MD-E009", "Oval Solitaire Drop", "An oval diamond suspended from a tiny diamond-set stud. The elongated centre stone creates a refined, premium appearance.", [], null, 2],
  ["MD-E010", "Classic Solitaire Drop", "A single brilliant-cut diamond hangs delicately from a small gold stud. Minimal, timeless and perfect for daily wear or evening occasions.", [], null, 3],
];

const imageCounts = { "MD-E001": 4, "MD-E003": 2 };
const obsoleteSkus = ["MIR-002", "MIR-003", "MIR-005", "MIR-006", "MIR-007", "MIR-008", "MIR-010"];

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 10000 });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const cat = await client.query("SELECT id FROM categories WHERE slug = 'earrings' AND name = 'Stud Earrings'");
    if (cat.rowCount !== 1) throw new Error("Stud Earrings category missing");
    const obsolete = await client.query("SELECT sku FROM products WHERE sku = ANY($1::text[]) ORDER BY sku", [obsoleteSkus]);
    if (obsolete.rowCount !== obsoleteSkus.length) throw new Error("Expected dummy SKU set has changed; inspect the database before importing");
    await client.query("DELETE FROM products WHERE sku = ANY($1::text[])", [obsoleteSkus]);

    for (const [sku, name, description, purities, grossWeight, primaryImage] of items) {
      const image = `/products/stud-earrings/${sku}-${primaryImage}.png`;
      const product = await client.query(`
        INSERT INTO products (category_id, sku, name, description, jewellery_type, diamond_grades, gold_purities,
          gold_colours, sizes, banner_image, gross_weight, net_gold_weight, diamond_pieces,
          total_diamond_weight, diamond_price, making_charge, dimensions)
        VALUES ($1, $2, $3, $4, 'earrings', '{}', $5, $6, '{}', $7, $8, NULL, NULL, NULL, NULL, NULL, NULL)
        ON CONFLICT (sku) DO UPDATE SET category_id = EXCLUDED.category_id, name = EXCLUDED.name,
          description = EXCLUDED.description, jewellery_type = EXCLUDED.jewellery_type,
          diamond_grades = EXCLUDED.diamond_grades, gold_purities = EXCLUDED.gold_purities,
          gold_colours = EXCLUDED.gold_colours, sizes = EXCLUDED.sizes, banner_image = EXCLUDED.banner_image,
          gross_weight = EXCLUDED.gross_weight, net_gold_weight = NULL, diamond_pieces = NULL,
          total_diamond_weight = NULL, diamond_price = NULL, making_charge = NULL, dimensions = NULL,
          updated_at = NOW()
        RETURNING id`, [cat.rows[0].id, sku, name, description, purities, ["yellow", "white", "rose"], image, grossWeight]);
      const productId = product.rows[0].id;
      await client.query("DELETE FROM product_variants WHERE product_id = $1", [productId]);
      await client.query("DELETE FROM product_media WHERE product_id = $1", [productId]);
      const variant = await client.query(`
        INSERT INTO product_variants (product_id, sku, name, price, stock, is_in_stock)
        VALUES ($1, $2, $3, NULL, 1, TRUE) RETURNING id`, [productId, `${sku}-DEFAULT`, name]);
      for (let n = 1; n <= (imageCounts[sku] || 3); n++) {
        await client.query(`INSERT INTO product_media (product_id, product_variant_id, media_type, media_url)
          VALUES ($1, $2, 'image', $3)`, [productId, variant.rows[0].id, `/products/stud-earrings/${sku}-${n}.png`]);
      }
    }
    await client.query("COMMIT");
    console.log(`Removed ${obsoleteSkus.length} dummy products; imported ${items.length} stud earrings with 30 images.`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
