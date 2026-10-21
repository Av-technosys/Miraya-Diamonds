"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Gem,
  Sparkles,
  Trash2,
  Edit2,
  X,
  FileCode2,
  Eye,
  Scale,
  Ruler,
} from "lucide-react";
import { initialProducts, type AdminProduct } from "./mock-data";

interface ProductsTableProps {
  isAddModalOpenInitially?: boolean;
  onCloseAddModal?: () => void;
}

export function ProductsTable({
  isAddModalOpenInitially = false,
  onCloseAddModal,
}: ProductsTableProps) {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(isAddModalOpenInitially);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);

  // Add Product Form State matching exact user sample schema
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [jewelleryType, setJewelleryType] = useState("ring");
  const [diamondGrades, setDiamondGrades] = useState("EF-VVS, IJ-SI");
  const [goldPurities, setGoldPurities] = useState("14KT, 18KT");
  const [goldColours, setGoldColours] = useState("yellow, rose, white");
  const [sizes, setSizes] = useState("10, 11, 12, 13");
  const [grossWeight, setGrossWeight] = useState("3.10");
  const [netGoldWeight, setNetGoldWeight] = useState("3.00");
  const [diamondPieces, setDiamondPieces] = useState("12");
  const [totalDiamondWeight, setTotalDiamondWeight] = useState("0.500");
  const [diamondPrice, setDiamondPrice] = useState("15000.00");
  const [makingCharge, setMakingCharge] = useState("3000.00");
  const [dimHeight, setDimHeight] = useState("5.20");
  const [dimWidth, setDimWidth] = useState("8.00");
  const [dimLength, setDimLength] = useState("20.00");
  const [stock, setStock] = useState("10");

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(search.toLowerCase()) ||
        prod.sku.toLowerCase().includes(search.toLowerCase()) ||
        prod.jewelleryType.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" ||
        prod.jewelleryType.toLowerCase() === categoryFilter.toLowerCase();
      const matchesStock = stockFilter === "All" || prod.status === stockFilter;
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedStock = parseInt(stock, 10) || 1;
    const parsedDiamondPrice = parseFloat(diamondPrice) || 0;
    const parsedMaking = parseFloat(makingCharge) || 0;
    // Base estimated price: diamond price + making + base gold estimation
    const estimatedPrice = parsedDiamondPrice + parsedMaking + (parseFloat(netGoldWeight) || 3) * 7500;

    const newProd: AdminProduct = {
      id: `product_${Date.now()}`,
      sku: sku.trim() || `MIR-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      description: description.trim() || "Handcrafted fine diamond jewellery by Miraya Diamonds.",
      jewelleryType,
      diamondGrades: diamondGrades.split(",").map((s) => s.trim()).filter(Boolean),
      goldPurities: goldPurities.split(",").map((s) => s.trim()).filter(Boolean),
      goldColours: goldColours.split(",").map((s) => s.trim()).filter(Boolean),
      sizes: sizes.split(",").map((s) => s.trim()).filter(Boolean),
      grossWeight: grossWeight || "3.10",
      netGoldWeight: netGoldWeight || "3.00",
      diamondPieces: parseInt(diamondPieces, 10) || 12,
      totalDiamondWeight: totalDiamondWeight || "0.500",
      diamondPrice: parsedDiamondPrice.toFixed(2),
      makingCharge: parsedMaking.toFixed(2),
      dimensions: {
        height: dimHeight || "5.20",
        width: dimWidth || "8.00",
        length: dimLength || "20.00",
      },
      price: Math.round(estimatedPrice),
      stock: parsedStock,
      status: parsedStock === 0 ? "Out of Stock" : parsedStock <= 3 ? "Low Stock" : "In Stock",
      image: "/customize/custom1.png",
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    onCloseAddModal?.();
    setName("");
    setSku("");
  }

  function handleDeleteProduct(id: string) {
    if (confirm("Are you sure you want to delete this diamond piece from the catalogue?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Pills Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Ring", "Necklace", "Earring", "Bracelet", "Solitaire"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                categoryFilter === cat
                  ? "bg-[#214E34] text-white shadow-xs"
                  : "border border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C5A880] hover:text-[#161D1A]"
              }`}
            >
              {cat === "All" ? "All Jewellery" : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Add Product Button */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#C5A880] px-4 py-2 text-xs font-semibold text-[#121714] shadow-xs transition-transform hover:scale-[1.02] hover:bg-[#d1b690]"
        >
          <Plus size={15} />
          <span>Add New Diamond Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#EAE6DE] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, SKU, or type..."
              className="h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] pl-9 pr-3 text-xs text-[#1C1B1A] placeholder:text-[#A8A29E] transition-all focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-2.5 text-xs text-[#44403C] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
          >
            <option value="All">All Stock Levels</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="text-xs text-[#78716C]">
          Showing <span className="font-semibold text-[#161D1A]">{filteredProducts.length}</span> pieces
        </div>
      </div>

      {/* Products Table with EXACT columns requested */}
      <div className="overflow-hidden rounded-2xl border border-[#EAE6DE] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#F0EBE3] bg-[#FAF8F5] font-sans text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
              <tr>
                <th className="py-3.5 pl-6 pr-4">Jewellery Piece</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Precious Metal</th>
                <th className="px-4 py-3.5 text-right">Price (INR)</th>
                <th className="px-4 py-3.5 text-center">Stock</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EB]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-[#A8A29E]">
                    No diamond jewellery items match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    className="group transition-colors hover:bg-[#FAF8F5]/80"
                  >
                    {/* 1. Jewellery Piece */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-[#E7E2D8] bg-[#FAF8F5]">
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(prod)}
                            className="text-left font-semibold text-[#161D1A] hover:text-[#214E34] hover:underline"
                          >
                            {prod.name}
                          </button>
                          <div className="flex items-center gap-2 text-[11px] text-[#78716C]">
                            <span className="font-mono text-[#A8A29E]">SKU: {prod.sku}</span>
                            <span>•</span>
                            <span className="text-[#8C7350]">
                              {prod.diamondPieces} pcs ({prod.totalDiamondWeight} ct)
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Category */}
                    <td className="px-4 py-4">
                      <span className="inline-flex capitalize rounded-md bg-[#FAF8F5] px-2 py-1 text-[11px] font-medium text-[#44403C]">
                        {prod.jewelleryType}
                      </span>
                    </td>

                    {/* 3. Precious Metal */}
                    <td className="px-4 py-4 text-[#44403C]">
                      <div className="font-medium">
                        {prod.goldPurities.join(", ")}
                      </div>
                      <div className="capitalize text-[11px] text-[#78716C]">
                        {prod.goldColours.join(", ")}
                      </div>
                    </td>

                    {/* 4. Price (INR) */}
                    <td className="px-4 py-4 text-right text-[14px] font-semibold text-[#161D1A]">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </td>

                    {/* 5. Stock */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          prod.status === "In Stock"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                            : prod.status === "Low Stock"
                            ? "bg-amber-50 text-amber-800 border border-amber-200/60"
                            : "bg-rose-50 text-rose-800 border border-rose-200/60"
                        }`}
                      >
                        {prod.stock} units
                      </span>
                    </td>

                    {/* 6. Actions */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(prod)}
                          className="rounded-lg p-1.5 text-[#78716C] transition-colors hover:bg-white hover:text-[#214E34]"
                          title="View Specs & JSON"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newP = prompt("Update price in ₹:", prod.price.toString());
                            if (newP && !isNaN(Number(newP))) {
                              setProducts(
                                products.map((p) =>
                                  p.id === prod.id ? { ...p, price: Number(newP) } : p
                                )
                              );
                            }
                          }}
                          className="rounded-lg p-1.5 text-[#78716C] transition-colors hover:bg-white hover:text-[#214E34]"
                          title="Quick Edit Price"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="rounded-lg p-1.5 text-[#78716C] transition-colors hover:bg-white hover:text-rose-600"
                          title="Delete SKU"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Detailed Specs & JSON Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#EAE6DE] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F0EBE3] bg-[#FAF8F5] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-xl bg-[#C5A880]/20 text-[#8C7350]">
                  <Gem size={18} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#161D1A]">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span className="font-mono text-[#8C7350]">SKU: {selectedProduct.sku}</span>
                    <span>•</span>
                    <span className="capitalize">{selectedProduct.jewelleryType}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="grid size-8 place-items-center rounded-lg text-[#78716C] hover:bg-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-xs">
              <p className="text-[#57534E] leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-3">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#A8A29E]">
                    Gross Weight
                  </span>
                  <div className="mt-1 text-sm font-bold text-[#161D1A]">
                    {selectedProduct.grossWeight} g
                  </div>
                </div>
                <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-3">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#A8A29E]">
                    Net Gold Weight
                  </span>
                  <div className="mt-1 text-sm font-bold text-[#161D1A]">
                    {selectedProduct.netGoldWeight} g
                  </div>
                </div>
                <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-3">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#A8A29E]">
                    Diamond Pieces
                  </span>
                  <div className="mt-1 text-sm font-bold text-[#161D1A]">
                    {selectedProduct.diamondPieces} pcs
                  </div>
                </div>
                <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-3">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#A8A29E]">
                    Total Diamond Wt
                  </span>
                  <div className="mt-1 text-sm font-bold text-[#161D1A]">
                    {selectedProduct.totalDiamondWeight} ct
                  </div>
                </div>
              </div>

              {/* Price & Charges */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-3.5">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#A8A29E]">
                    Diamond Price
                  </span>
                  <div className="mt-1 font-bold text-base text-[#161D1A]">
                    ₹{parseFloat(selectedProduct.diamondPrice).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-3.5">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#A8A29E]">
                    Making Charge
                  </span>
                  <div className="mt-1 font-bold text-base text-[#161D1A]">
                    ₹{parseFloat(selectedProduct.makingCharge).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="rounded-xl border border-[#214E34]/20 bg-[#214E34]/5 p-3.5">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#214E34]">
                    Total Selling Price
                  </span>
                  <div className="mt-1 font-bold text-base text-[#214E34]">
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Options & Dimensions */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-4 space-y-2">
                  <h4 className="font-semibold text-xs text-[#161D1A]">Configurations</h4>
                  <div>
                    <span className="text-[#A8A29E]">Gold Purities:</span>{" "}
                    <span className="font-medium text-[#161D1A]">{selectedProduct.goldPurities.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A29E]">Colours:</span>{" "}
                    <span className="font-medium capitalize text-[#161D1A]">{selectedProduct.goldColours.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A29E]">Diamond Grades:</span>{" "}
                    <span className="font-medium text-[#161D1A]">{selectedProduct.diamondGrades.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A29E]">Available Sizes:</span>{" "}
                    <span className="font-medium text-[#161D1A]">{selectedProduct.sizes.join(", ")}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-4 space-y-2">
                  <h4 className="font-semibold text-xs text-[#161D1A]">Dimensions (mm)</h4>
                  <div className="flex items-center gap-2">
                    <Ruler size={14} className="text-[#C5A880]" />
                    <span className="text-[#A8A29E]">Height:</span>{" "}
                    <span className="font-semibold text-[#161D1A]">{selectedProduct.dimensions.height} mm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler size={14} className="text-[#C5A880]" />
                    <span className="text-[#A8A29E]">Width:</span>{" "}
                    <span className="font-semibold text-[#161D1A]">{selectedProduct.dimensions.width} mm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler size={14} className="text-[#C5A880]" />
                    <span className="text-[#A8A29E]">Length:</span>{" "}
                    <span className="font-semibold text-[#161D1A]">{selectedProduct.dimensions.length} mm</span>
                  </div>
                </div>
              </div>

              {/* Raw JSON Preview Button */}
              <div className="rounded-xl border border-[#E7E2D8] bg-[#121714] p-4 text-[#E8E6E3]">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#C5A880]">
                    <FileCode2 size={13} />
                    Database Payload Format
                  </span>
                  <span className="text-[10px] text-white/40">JSON format matching schema</span>
                </div>
                <pre className="overflow-x-auto text-[11px] font-mono leading-relaxed text-[#A7F3D0]">
                  {JSON.stringify(
                    {
                      id: selectedProduct.id,
                      sku: selectedProduct.sku,
                      name: selectedProduct.name,
                      description: selectedProduct.description,
                      jewelleryType: selectedProduct.jewelleryType,
                      diamondGrades: selectedProduct.diamondGrades,
                      goldPurities: selectedProduct.goldPurities,
                      goldColours: selectedProduct.goldColours,
                      sizes: selectedProduct.sizes,
                      grossWeight: selectedProduct.grossWeight,
                      netGoldWeight: selectedProduct.netGoldWeight,
                      diamondPieces: selectedProduct.diamondPieces,
                      totalDiamondWeight: selectedProduct.totalDiamondWeight,
                      diamondPrice: selectedProduct.diamondPrice,
                      makingCharge: selectedProduct.makingCharge,
                      dimensions: selectedProduct.dimensions,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#F0EBE3] bg-[#FAF8F5] px-6 py-3.5">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg bg-[#214E34] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1A3F2A]"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Product Modal Form with exact schema fields */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => {
            setIsAddModalOpen(false);
            onCloseAddModal?.();
          }}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#EAE6DE] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F0EBE3] bg-[#FAF8F5] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 place-items-center rounded-lg bg-[#C5A880]/20 text-[#8C7350]">
                  <Gem size={17} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#161D1A]">
                    Add New Diamond Product
                  </h3>
                  <p className="text-[11px] text-[#78716C]">
                    Enter jewellery piece specifications matching database model
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  onCloseAddModal?.();
                }}
                className="grid size-8 place-items-center rounded-lg text-[#78716C] hover:bg-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4 text-xs">
              {/* Name & SKU */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Product Name (name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Gold Diamond Ring"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    SKU Code (sku) *
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="MIR-001"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#44403C]">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A rose gold ring with round diamonds."
                  className="mt-1 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] p-2.5 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Type & Purities */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Jewellery Type
                  </label>
                  <select
                    value={jewelleryType}
                    onChange={(e) => setJewelleryType(e.target.value)}
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-2.5 text-xs text-[#44403C] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  >
                    <option value="ring">ring</option>
                    <option value="necklace">necklace</option>
                    <option value="earring">earring</option>
                    <option value="bracelet">bracelet</option>
                    <option value="solitaire">solitaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Gold Purities
                  </label>
                  <input
                    type="text"
                    value={goldPurities}
                    onChange={(e) => setGoldPurities(e.target.value)}
                    placeholder="14KT, 18KT"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Gold Colours
                  </label>
                  <input
                    type="text"
                    value={goldColours}
                    onChange={(e) => setGoldColours(e.target.value)}
                    placeholder="yellow, rose, white"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Diamond Grades & Sizes */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Diamond Grades (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={diamondGrades}
                    onChange={(e) => setDiamondGrades(e.target.value)}
                    placeholder="EF-VVS, IJ-SI"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Sizes Available
                  </label>
                  <input
                    type="text"
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    placeholder="10, 11, 12, 13"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Weights & Diamonds */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Gross Wt (g)
                  </label>
                  <input
                    type="text"
                    value={grossWeight}
                    onChange={(e) => setGrossWeight(e.target.value)}
                    placeholder="3.10"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Net Gold Wt (g)
                  </label>
                  <input
                    type="text"
                    value={netGoldWeight}
                    onChange={(e) => setNetGoldWeight(e.target.value)}
                    placeholder="3.00"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Diamond Pcs
                  </label>
                  <input
                    type="number"
                    value={diamondPieces}
                    onChange={(e) => setDiamondPieces(e.target.value)}
                    placeholder="12"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Total Dia Wt (ct)
                  </label>
                  <input
                    type="text"
                    value={totalDiamondWeight}
                    onChange={(e) => setTotalDiamondWeight(e.target.value)}
                    placeholder="0.500"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Pricing & Charges */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Diamond Price (₹)
                  </label>
                  <input
                    type="text"
                    value={diamondPrice}
                    onChange={(e) => setDiamondPrice(e.target.value)}
                    placeholder="15000.00"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Making Charge (₹)
                  </label>
                  <input
                    type="text"
                    value={makingCharge}
                    onChange={(e) => setMakingCharge(e.target.value)}
                    placeholder="3000.00"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Initial Stock Units
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="10"
                    className="mt-1 h-9 w-full rounded-lg border border-[#E7E2D8] bg-[#FAF8F5] px-3 text-xs text-[#1C1B1A] focus:border-[#C5A880] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Dimensions */}
              <div className="rounded-xl border border-[#F0EBE3] bg-[#FAF8F5] p-3">
                <span className="block text-xs font-semibold text-[#44403C] mb-2">
                  Dimensions (mm)
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-[#78716C]">Height</label>
                    <input
                      type="text"
                      value={dimHeight}
                      onChange={(e) => setDimHeight(e.target.value)}
                      placeholder="5.20"
                      className="mt-0.5 h-8 w-full rounded-lg border border-[#E7E2D8] bg-white px-2.5 text-xs text-[#1C1B1A] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#78716C]">Width</label>
                    <input
                      type="text"
                      value={dimWidth}
                      onChange={(e) => setDimWidth(e.target.value)}
                      placeholder="8.00"
                      className="mt-0.5 h-8 w-full rounded-lg border border-[#E7E2D8] bg-white px-2.5 text-xs text-[#1C1B1A] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#78716C]">Length</label>
                    <input
                      type="text"
                      value={dimLength}
                      onChange={(e) => setDimLength(e.target.value)}
                      placeholder="20.00"
                      className="mt-0.5 h-8 w-full rounded-lg border border-[#E7E2D8] bg-white px-2.5 text-xs text-[#1C1B1A] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 flex items-center justify-end gap-2.5 pt-2 border-t border-[#F0EBE3]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    onCloseAddModal?.();
                  }}
                  className="rounded-lg border border-[#E7E2D8] px-4 py-2 text-xs font-medium text-[#44403C] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#214E34] px-5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#1A3F2A]"
                >
                  Save Product to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
