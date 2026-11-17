"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, RefreshCw, Pencil, Trash2, Gem } from "lucide-react";
import { getAdminProducts, deleteProduct } from "@/lib/actions/products";
import type { AdminProduct } from "@/lib/admin/types";
import { ConfirmDeleteModal } from "@/components/admin/shared/confirm-delete-modal";

const control = "h-10 rounded-lg border border-[#e5dfd9] bg-white px-3 text-xs outline-none focus:border-[#214E34]";

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [selected, setSelected] = useState<AdminProduct | null>(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let cancelled = false;
    getAdminProducts().then((items) => { if (!cancelled) setProducts(items); })
      .catch(() => { if (!cancelled) setMessage("Products could not be loaded. Please try again."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [revision]);

  const filtered = products.filter((item) => (!category || item.jewelleryType === category) && (!stock || item.status === stock) && `${item.name} ${item.sku}`.toLowerCase().includes(search.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / 15));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * 15, currentPage * 15);

  async function removeProduct() {
    if (!selected) return;
    setDeleting(true);
    try {
      const result = await deleteProduct(selected.id);
      if (result.success) { setProducts((items) => items.filter((item) => item.id !== selected.id)); setSelected(null); setMessage("Product deleted."); }
      else setMessage(result.error || "Product could not be deleted.");
    } catch { setMessage("Product could not be deleted. Please try again."); }
    finally { setDeleting(false); }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-[#e9e4df] pb-7">
        <div><h1 className="font-serif text-4xl font-medium text-[#214E34] sm:text-[42px]">Products</h1><p className="mt-2 text-xs leading-6 text-[#8a837b]">Manage your jewellery catalogue, variants and imagery.</p></div>
        <div className="flex gap-3"><button type="button" disabled={loading} onClick={() => { setLoading(true); setMessage(""); setRevision((value) => value + 1); }} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#ded8d1] bg-white px-4 text-xs text-[#214E34] disabled:opacity-50"><RefreshCw size={14} className={loading ? "animate-spin" : ""} />Refresh</button><Link href="/admin/products/new" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#214E34] px-5 text-xs font-medium text-white"><Plus size={15} />Add product</Link></div>
      </header>
      {message && <p role="status" className="rounded-lg border border-[#ded8d1] bg-white p-4 text-sm">{message}</p>}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[["Total products", products.length], ["In stock", products.filter((p) => p.status === "In Stock").length], ["Low stock", products.filter((p) => p.status === "Low Stock").length], ["Out of stock", products.filter((p) => p.status === "Out of Stock").length]].map(([label, value]) => <div key={label} className="rounded-lg border border-[#e9e4df] bg-white p-5"><p className="text-[11px] text-[#8a837b]">{label}</p><p className="mt-3 font-serif text-3xl text-[#214E34]">{loading ? "—" : value}</p></div>)}</div>
      <section className="overflow-hidden rounded-lg border border-[#e9e4df] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#e9e4df] bg-[#FAF8F7] p-4 sm:flex-row sm:p-5"><div className="relative min-w-0 flex-1"><Search size={15} className="absolute left-3 top-3 text-[#9b9587]" /><input aria-label="Search products" placeholder="Search name or SKU…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className={`${control} w-full pl-9`} /></div><select aria-label="Filter by category" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className={control}><option value="">All types</option>{[...new Set(products.map((p) => p.jewelleryType))].sort().map((type) => <option key={type}>{type}</option>)}</select><select aria-label="Filter by stock" value={stock} onChange={(e) => { setStock(e.target.value); setPage(1); }} className={control}><option value="">All stock</option>{["In Stock", "Low Stock", "Out of Stock"].map((status) => <option key={status}>{status}</option>)}</select></div>
        <div className="overflow-x-auto" aria-busy={loading}><table className="w-full min-w-[700px] text-left text-xs"><thead className="border-b border-[#eee9e4] bg-[#FAF8F7] text-[10px] uppercase tracking-wider text-[#8a837b]"><tr>{["Product", "Type", "Price", "Stock", "Actions"].map((title) => <th key={title} className="px-5 py-4 font-medium">{title}</th>)}</tr></thead><tbody className="divide-y divide-[#eee9e4]">{visible.map((product) => <tr key={product.id} className="hover:bg-[#faf9f6]"><td className="px-5 py-4"><Link href={`/admin/products/edit/${product.id}`} className="flex items-center gap-3"><Image src={product.image} alt="" width={48} height={48} className="size-12 rounded-md border border-[#e9e4df] object-cover" /><span className="min-w-0"><span className="block max-w-72 truncate font-medium">{product.name}</span><span className="mt-1 block text-[10px] text-[#8a837b]">{product.sku}</span></span></Link></td><td className="px-5 py-4 capitalize">{product.jewelleryType}</td><td className="px-5 py-4">{product.price > 0 ? `₹${product.price.toLocaleString("en-IN")}` : "Enquire for pricing"}</td><td className="px-5 py-4"><span className="rounded border border-[#e5dfd9] px-2 py-1 text-[10px]">{product.status}</span><span className="mt-2 block text-[#8a837b]">{product.stock} available</span></td><td className="px-5 py-4"><div className="flex gap-2"><Link href={`/admin/products/edit/${product.id}`} aria-label={`Edit ${product.name}`} className="grid size-9 place-items-center rounded-md border border-[#e5dfd9] text-[#214E34]"><Pencil size={14} /></Link><button onClick={() => { setMessage(""); setSelected(product); }} aria-label={`Delete ${product.name}`} className="grid size-9 place-items-center rounded-md border border-[#e5dfd9] text-[#9f5c4d]"><Trash2 size={14} /></button></div></td></tr>)}</tbody></table></div>
        {loading ? <p role="status" className="py-14 text-center text-sm text-[#817b70]">Loading products…</p> : !filtered.length && <div className="py-16 text-center"><Gem size={28} className="mx-auto text-[#a49a86]" /><p className="mt-3 text-sm text-[#817b70]">{products.length ? "No products match your filters." : "No products yet. Add your first design."}</p></div>}
        {!loading && filtered.length > 0 && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e9e4df] p-4 text-xs text-[#817b70]"><span>{filtered.length} products · Page {currentPage} of {pages}</span><div className="flex gap-3"><button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="rounded border px-3 py-2 disabled:opacity-40">Previous</button><button disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)} className="rounded border px-3 py-2 disabled:opacity-40">Next</button></div></div>}
      </section>
      <ConfirmDeleteModal isOpen={Boolean(selected)} onClose={() => { if (!deleting) setSelected(null); }} onConfirm={removeProduct} itemName={selected?.name} itemType="product" isDeleting={deleting} />
    </div>
  );
}
