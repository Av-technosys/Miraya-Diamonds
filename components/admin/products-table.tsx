"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Plus,
  Gem,
  Trash2,
  Edit2,
  X,
  Eye,
  Ruler,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ImageIcon,
  RefreshCw,
} from "lucide-react";
import { initialProducts as fallbackProducts, type AdminProduct } from "./mock-data";
import { ProductMediaManager } from "./product-media-manager";
import { SuccessModal } from "./success-modal";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
import { toRelativeKey } from "@/lib/imageUrl";
import type { Category } from "@/lib/db/schema";
import { getCategories } from "@/lib/actions/categories";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/actions/products";

interface ProductsTableProps {
  initialProducts?: AdminProduct[];
  categories?: Category[];
  isAddModalOpenInitially?: boolean;
  onCloseAddModal?: () => void;
}

function normalizeJewelleryType(type: string): string {
  const t = (type || "").toLowerCase().trim();
  if (t === "ring" || t === "rings") return "rings";
  if (t === "necklace" || t === "necklaces") return "necklaces";
  if (t === "earring" || t === "earrings") return "earrings";
  if (t === "bracelet" || t === "bracelets") return "bracelets";
  if (t === "bangle" || t === "bangles") return "bangles";
  if (t === "pendant" || t === "pendants") return "pendants";
  if (t === "solitaire" || t === "solitaires") return "solitaires";
  if (t === "kid" || t === "kids" || t === "kids jewellery") return "kids";
  return t;
}

export function ProductsTable({
  initialProducts = [],
  categories = [],
  isAddModalOpenInitially = false,
  onCloseAddModal,
}: ProductsTableProps) {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>(() =>
    initialProducts.length > 0 ? initialProducts : fallbackProducts
  );
  const [categoriesList, setCategoriesList] = useState<Category[]>(categories);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(isAddModalOpenInitially);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Loading & notification states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Success popup & Delete confirmation modal states
  const [successPopup, setSuccessPopup] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({ isOpen: false, title: "Success!", message: "" });

  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Sync products when initialProducts prop updates from server revalidation
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  // Sync or fetch categories dynamically
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoriesList(categories);
    } else {
      getCategories().then((cats) => {
        if (cats && cats.length > 0) setCategoriesList(cats);
      });
    }
  }, [categories]);

  // Form State for Add / Edit
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [jewelleryType, setJewelleryType] = useState(() => categoriesList[0]?.slug || "rings");
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
  const [sellingPrice, setSellingPrice] = useState("48250");
  const [bannerImage, setBannerImage] = useState("");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  function showNotification(type: "success" | "error", message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  }

  async function handleManualRefresh() {
    setIsRefreshing(true);
    try {
      const fresh = await getAdminProducts();
      if (fresh && fresh.length > 0) {
        setProducts(fresh);
        showNotification("success", `Catalogue refreshed with ${fresh.length} pieces from live database.`);
      }
    } catch (err) {
      console.error("Refresh error:", err);
      showNotification("error", "Failed to refresh catalogue from database.");
    } finally {
      setIsRefreshing(false);
    }
  }

  function resetForm() {
    setName("");
    setSku("");
    setDescription("");
    const defaultCat = categoriesList[0];
    setSelectedCategoryId(defaultCat ? defaultCat.id : null);
    setJewelleryType(defaultCat ? defaultCat.slug : "rings");
    setDiamondGrades("EF-VVS, IJ-SI");
    setGoldPurities("14KT, 18KT");
    setGoldColours("yellow, rose, white");
    setSizes("10, 11, 12, 13");
    setGrossWeight("3.10");
    setNetGoldWeight("3.00");
    setDiamondPieces("12");
    setTotalDiamondWeight("0.500");
    setDiamondPrice("15000.00");
    setMakingCharge("3000.00");
    setDimHeight("5.20");
    setDimWidth("8.00");
    setDimLength("20.00");
    setStock("10");
    setSellingPrice("48250");
    setBannerImage("");
    setMediaUrls([]);
    setEditingProduct(null);
  }

  function openEditModal(prod: AdminProduct) {
    setEditingProduct(prod);
    setName(prod.name);
    setSku(prod.sku);
    setDescription(prod.description);
    let matchedCatId = prod.categoryId || null;
    if (!matchedCatId && prod.jewelleryType) {
      const match = categoriesList.find(
        (c) =>
          c.slug.toLowerCase() === prod.jewelleryType.toLowerCase() ||
          c.name.toLowerCase() === prod.jewelleryType.toLowerCase()
      );
      if (match) matchedCatId = match.id;
    }
    setSelectedCategoryId(matchedCatId);
    setJewelleryType(prod.jewelleryType);
    setDiamondGrades(prod.diamondGrades?.join?.(", ") || "");
    setGoldPurities(prod.goldPurities?.join?.(", ") || "");
    setGoldColours(prod.goldColours?.join?.(", ") || "");
    setSizes(prod.sizes?.join?.(", ") || "");
    setGrossWeight(prod.grossWeight || "3.10");
    setNetGoldWeight(prod.netGoldWeight || "3.00");
    setDiamondPieces((prod.diamondPieces ?? 12).toString());
    setTotalDiamondWeight(prod.totalDiamondWeight || "0.500");
    setDiamondPrice(prod.diamondPrice || "15000.00");
    setMakingCharge(prod.makingCharge || "3000.00");
    setDimHeight(prod.dimensions?.height || "5.20");
    setDimWidth(prod.dimensions?.width || "8.00");
    setDimLength(prod.dimensions?.length || "20.00");
    setStock((prod.stock ?? 10).toString());
    setSellingPrice((prod.price ?? 48250).toString());
    const prodBanner = toRelativeKey(prod.bannerImage || prod.image || "");
    setBannerImage(prodBanner);
    const existingMedia =
      prod.mediaUrls && prod.mediaUrls.length > 0
        ? prod.mediaUrls.map(toRelativeKey)
        : prodBanner
        ? [prodBanner]
        : [];
    setMediaUrls(existingMedia);
    setIsAddModalOpen(true);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(search.toLowerCase()) ||
        prod.sku.toLowerCase().includes(search.toLowerCase()) ||
        prod.jewelleryType.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" ||
        normalizeJewelleryType(prod.jewelleryType) === normalizeJewelleryType(categoryFilter);
      const matchesStock = stockFilter === "All" || prod.status === stockFilter;
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  async function handleSubmitProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !sku.trim()) {
      showNotification("error", "Name and SKU are required.");
      return;
    }

    setIsSubmitting(true);

    const parsedStock = parseInt(stock, 10) || 0;
    const parsedPrice = parseFloat(sellingPrice) || 0;
    const parsedDiamondPrice = parseFloat(diamondPrice) || 0;
    const parsedMaking = parseFloat(makingCharge) || 0;

    const cleanMediaUrls = mediaUrls.map((u) => toRelativeKey(u.trim())).filter(Boolean);
    const primaryBanner = toRelativeKey(bannerImage.trim()) || cleanMediaUrls[0] || "/customize/custom1.png";
    if (primaryBanner && !cleanMediaUrls.includes(primaryBanner)) {
      cleanMediaUrls.unshift(primaryBanner);
    }

    const payload = {
      sku: sku.trim(),
      name: name.trim(),
      categoryId: selectedCategoryId,
      description: description.trim() || "Handcrafted diamond jewellery by Miraya Diamonds.",
      jewelleryType: jewelleryType.toLowerCase().trim(),
      diamondGrades: diamondGrades.split(",").map((s) => s.trim()).filter(Boolean),
      goldPurities: goldPurities.split(",").map((s) => s.trim()).filter(Boolean),
      goldColours: goldColours.split(",").map((s) => s.trim()).filter(Boolean),
      sizes: sizes.split(",").map((s) => s.trim()).filter(Boolean),
      bannerImage: primaryBanner,
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
      price: parsedPrice > 0 ? parsedPrice : 48250,
      stock: parsedStock,
      mediaUrls: cleanMediaUrls.length > 0 ? cleanMediaUrls : [primaryBanner],
    };

    try {
      if (editingProduct) {
        // UPDATE EXISTING PRODUCT
        const res = await updateProduct(editingProduct.id, payload);
        if (!res.success) {
          showNotification("error", res.error || "Failed to update product.");
          setIsSubmitting(false);
          return;
        }

        const updatedProd: AdminProduct = res.product || {
          ...editingProduct,
          ...payload,
          price: payload.price,
          stock: parsedStock,
          status: parsedStock === 0 ? "Out of Stock" : parsedStock <= 3 ? "Low Stock" : "In Stock",
          image: payload.bannerImage,
        };

        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id ||
            p.sku.toLowerCase() === editingProduct.sku.toLowerCase() ||
            p.id === updatedProd.id ||
            p.sku.toLowerCase() === updatedProd.sku.toLowerCase()
              ? updatedProd
              : p
          )
        );
        showNotification("success", `Product "${payload.name}" updated successfully in database!`);
        setSuccessPopup({
          isOpen: true,
          title: "Product Updated!",
          message: `Product "${payload.name}" has been updated successfully in the catalogue.`,
        });

        getAdminProducts().then((fresh) => {
          if (fresh && fresh.length > 0) setProducts(fresh);
        });
        router.refresh();
      } else {
        // CREATE NEW PRODUCT
        const res = await createProduct(payload);
        if (!res.success || !res.product) {
          showNotification("error", res.error || "Failed to create product.");
          setIsSubmitting(false);
          return;
        }

        const newP = res.product;
        setProducts((prev) => [newP, ...prev.filter((p) => p.id !== newP.id && p.sku !== newP.sku)]);
        showNotification("success", `Product "${newP.name}" added to database!`);
        setSuccessPopup({
          isOpen: true,
          title: "Product Added!",
          message: `Product "${newP.name}" has been created and added to the catalogue.`,
        });

        getAdminProducts().then((fresh) => {
          if (fresh && fresh.length > 0) setProducts(fresh);
        });
        router.refresh();
      }

      setIsAddModalOpen(false);
      onCloseAddModal?.();
      resetForm();
    } catch (err) {
      console.error("Save product error:", err);
      showNotification("error", "An unexpected error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDeleteProduct(id: string, productName: string) {
    setProductToDelete({ id, name: productName });
  }

  async function handleConfirmDelete() {
    if (!productToDelete) return;
    const { id, name } = productToDelete;

    setDeletingId(id);
    try {
      const res = await deleteProduct(id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setProductToDelete(null);
        showNotification("success", `"${name}" deleted from database.`);
        setSuccessPopup({
          isOpen: true,
          title: "Product Deleted!",
          message: `"${name}" has been permanently deleted from the catalogue.`,
        });

        getAdminProducts().then((fresh) => {
          if (fresh && fresh.length > 0) setProducts(fresh);
        });
        router.refresh();
      } else {
        showNotification("error", res.error || "Failed to delete product.");
      }
    } catch (err) {
      console.error("Delete product error:", err);
      showNotification("error", "Error deleting product from database.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e9e4df] pb-7">
        <h1 className="font-serif text-4xl font-medium leading-tight text-[#214E34] sm:text-[42px]">Products</h1>
        <p className="mt-2 text-xs leading-6 text-[#8a837b]">Manage jewellery, product details and availability.</p>
      </div>
      {/* Notification */}
      {notification && (
        <div
          className={`flex items-center gap-3 rounded-lg border p-4 text-xs font-medium  transition-all ${
            notification.type === "success"
              ? "border-[#dce5d7] bg-[#f2f6f0] text-[#214E34]"
              : "border-[#ead8d1] bg-[#fcf2ef] text-[#9f5c4d]"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={16} className="text-[#597454] shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Category Pills Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCategoryFilter("All")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              categoryFilter === "All"
                ? "bg-[#214E34] text-white"
                : "border border-[#e5dfd9] bg-white text-[#57534E] hover:border-[#9b8966] hover:text-[#353333]"
            }`}
          >
            All Jewellery
          </button>
          {categoriesList.map((cat) => {
            const isSelected =
              normalizeJewelleryType(categoryFilter) === normalizeJewelleryType(cat.slug || cat.name);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.slug || cat.name)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[#214E34] text-white"
                    : "border border-[#e5dfd9] bg-white text-[#57534E] hover:border-[#9b8966] hover:text-[#353333]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Actions: Refresh & Add Product */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5dfd9] bg-white px-3.5 py-2 text-xs font-medium text-[#44403C] transition-colors hover:border-[#9b8966] hover:text-[#353333] disabled:opacity-50"
            title="Refresh products"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin text-[#9b8966]" : "text-[#8a837b]"} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#214E34] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#193e29]"
          >
            <Plus size={15} />
            <span>Add product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-lg border border-[#e9e4df] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa198]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, SKU, or type..."
              className="h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] pl-9 pr-3 text-xs text-[#353333] placeholder:text-[#aaa198] transition-all focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="h-10 rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-2.5 text-xs text-[#44403C] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
          >
            <option value="All">All Stock Levels</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="text-xs text-[#8a837b]">
          Showing <span className="font-semibold text-[#353333]">{filteredProducts.length}</span> pieces
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-lg border border-[#e9e4df] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-[#eee9e4] bg-[#FAF8F7] font-sans text-[11px] font-semibold uppercase tracking-wider text-[#8a837b]">
              <tr>
                <th className="py-3.5 pl-6 pr-4">Jewellery Piece</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Precious Metal</th>
                <th className="px-4 py-3.5 text-right">Price (INR)</th>
                <th className="px-4 py-3.5 text-center">Stock</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee9e4]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-[#aaa198]">
                    No diamond jewellery items match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    className="group transition-colors hover:bg-[#FAF8F7]/80"
                  >
                    {/* 1. Jewellery Piece */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-[#e5dfd9] bg-[#FAF8F7]">
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
                            className="text-left font-semibold text-[#353333] hover:text-[#214E34] hover:underline"
                          >
                            {prod.name}
                          </button>
                          <div className="flex items-center gap-2 text-[11px] text-[#8a837b]">
                            <span className="font-mono text-[#aaa198]">SKU: {prod.sku}</span>
                            <span>•</span>
                            <span className="text-[#8d7c61]">
                              {prod.diamondPieces} pcs ({prod.totalDiamondWeight} ct)
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Category */}
                    <td className="px-4 py-4">
                      <span className="inline-flex capitalize rounded-md bg-[#FAF8F7] px-2 py-1 text-[11px] font-medium text-[#44403C]">
                        {prod.jewelleryType}
                      </span>
                    </td>

                    {/* 3. Precious Metal */}
                    <td className="px-4 py-4 text-[#44403C]">
                      <div className="font-medium">
                        {prod.goldPurities.join(", ")}
                      </div>
                      <div className="capitalize text-[11px] text-[#8a837b]">
                        {prod.goldColours.join(", ")}
                      </div>
                    </td>

                    {/* 4. Price (INR) */}
                    <td className="px-4 py-4 text-right text-[14px] font-semibold text-[#353333]">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </td>

                    {/* 5. Stock */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          prod.status === "In Stock"
                            ? "bg-[#f2f6f0] text-[#214E34] border border-[#dce5d7]/60"
                            : prod.status === "Low Stock"
                            ? "bg-[#faf7ef] text-[#8f7752] border border-[#e8dfce]/60"
                            : "bg-[#fcf2ef] text-[#9f5c4d] border border-[#ead8d1]/60"
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
                          className="rounded-lg p-1.5 text-[#8a837b] transition-colors hover:bg-white hover:text-[#214E34]"
                          title="View product details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(prod)}
                          className="rounded-lg p-1.5 text-[#8a837b] transition-colors hover:bg-white hover:text-[#214E34]"
                          title="Edit Product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === prod.id}
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          className="rounded-lg p-1.5 text-[#8a837b] transition-colors hover:bg-white hover:text-rose-600 disabled:opacity-40"
                          title="Delete SKU"
                        >
                          {deletingId === prod.id ? (
                            <Loader2 size={14} className="animate-spin text-rose-600" />
                          ) : (
                            <Trash2 size={14} />
                          )}
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

      {/* Product details */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg border border-[#e9e4df] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee9e4] bg-[#FAF8F7] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-lg bg-[#9b8966]/20 text-[#8d7c61]">
                  <Gem size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-[28px] font-medium text-[#353333]">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#8a837b]">
                    <span className="font-mono text-[#8d7c61]">SKU: {selectedProduct.sku}</span>
                    <span>•</span>
                    <span className="capitalize">{selectedProduct.jewelleryType}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="grid size-8 place-items-center rounded-lg text-[#8a837b] hover:bg-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-xs">
              <div className="flex gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-[#e9e4df]">
                  <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[#57534E] leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-3">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#aaa198]">
                    Gross Weight
                  </span>
                  <div className="mt-1 text-sm font-bold text-[#353333]">
                    {selectedProduct.grossWeight} g
                  </div>
                </div>
                <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-3">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#aaa198]">
                    Net Gold Weight
                  </span>
                  <div className="mt-1 text-sm font-bold text-[#353333]">
                    {selectedProduct.netGoldWeight} g
                  </div>
                </div>
                <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-3">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#aaa198]">
                    Diamond Pieces
                  </span>
                  <div className="mt-1 text-sm font-bold text-[#353333]">
                    {selectedProduct.diamondPieces} pcs
                  </div>
                </div>
                <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-3">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#aaa198]">
                    Total Diamond Wt
                  </span>
                  <div className="mt-1 text-sm font-bold text-[#353333]">
                    {selectedProduct.totalDiamondWeight} ct
                  </div>
                </div>
              </div>

              {/* Price & Charges */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-3.5">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#aaa198]">
                    Diamond Price
                  </span>
                  <div className="mt-1 font-bold text-base text-[#353333]">
                    ₹{parseFloat(selectedProduct.diamondPrice).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-3.5">
                  <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#aaa198]">
                    Making Charge
                  </span>
                  <div className="mt-1 font-bold text-base text-[#353333]">
                    ₹{parseFloat(selectedProduct.makingCharge).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="rounded-lg border border-[#214E34]/20 bg-[#214E34]/5 p-3.5">
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
                <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-4 space-y-2">
                  <h4 className="font-semibold text-xs text-[#353333]">Configurations</h4>
                  <div>
                    <span className="text-[#aaa198]">Gold Purities:</span>{" "}
                    <span className="font-medium text-[#353333]">{selectedProduct.goldPurities.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-[#aaa198]">Colours:</span>{" "}
                    <span className="font-medium capitalize text-[#353333]">{selectedProduct.goldColours.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-[#aaa198]">Diamond Grades:</span>{" "}
                    <span className="font-medium text-[#353333]">{selectedProduct.diamondGrades.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-[#aaa198]">Available Sizes:</span>{" "}
                    <span className="font-medium text-[#353333]">{selectedProduct.sizes.join(", ")}</span>
                  </div>
                </div>

                <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-4 space-y-2">
                  <h4 className="font-semibold text-xs text-[#353333]">Dimensions (mm)</h4>
                  <div className="flex items-center gap-2">
                    <Ruler size={14} className="text-[#9b8966]" />
                    <span className="text-[#aaa198]">Height:</span>{" "}
                    <span className="font-semibold text-[#353333]">{selectedProduct.dimensions.height} mm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler size={14} className="text-[#9b8966]" />
                    <span className="text-[#aaa198]">Width:</span>{" "}
                    <span className="font-semibold text-[#353333]">{selectedProduct.dimensions.width} mm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler size={14} className="text-[#9b8966]" />
                    <span className="text-[#aaa198]">Length:</span>{" "}
                    <span className="font-semibold text-[#353333]">{selectedProduct.dimensions.length} mm</span>
                  </div>
                </div>
              </div>


            </div>

            <div className="flex justify-end border-t border-[#eee9e4] bg-[#FAF8F7] px-6 py-3.5">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg bg-[#214E34] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1A3F2A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => {
            setIsAddModalOpen(false);
            onCloseAddModal?.();
            resetForm();
          }}
        >
          <div
            className="w-full max-w-xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg border border-[#e9e4df] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee9e4] bg-[#FAF8F7] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 place-items-center rounded-lg bg-[#9b8966]/20 text-[#8d7c61]">
                  <Gem size={17} />
                </div>
                <div>
                  <h3 className="font-serif text-[28px] font-medium text-[#353333]">
                    {editingProduct ? "Edit Diamond Product" : "Add product"}
                  </h3>
                  <p className="text-[11px] text-[#8a837b]">
                    {editingProduct
                      ? `Edit ${editingProduct.sku}`
                      : "Add product details and available options."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  onCloseAddModal?.();
                  resetForm();
                }}
                className="grid size-8 place-items-center rounded-lg text-[#8a837b] hover:bg-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitProduct} className="p-6 space-y-4 text-xs">
              {/* Name & SKU */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Product name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Gold Diamond Ring"
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                  className="mt-1 w-full rounded-lg border border-[#e5dfd9] bg-[#FAF8F7] p-2.5 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Dynamic Product Media & Images Manager with AWS S3 Upload */}
              <ProductMediaManager
                bannerImage={bannerImage}
                onBannerImageChange={setBannerImage}
                mediaUrls={mediaUrls}
                onMediaUrlsChange={setMediaUrls}
                disabled={isSubmitting}
              />

              {/* Type, Purities, Colours */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Jewellery Category *
                  </label>
                  <select
                    value={selectedCategoryId || jewelleryType}
                    onChange={(e) => {
                      const val = e.target.value;
                      const matched = categoriesList.find(
                        (c) => c.id === val || c.slug === val || c.name.toLowerCase() === val.toLowerCase()
                      );
                      if (matched) {
                        setSelectedCategoryId(matched.id);
                        setJewelleryType(matched.slug || matched.name.toLowerCase());
                      } else {
                        setSelectedCategoryId(null);
                        setJewelleryType(val);
                      }
                    }}
                    required
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-2.5 text-xs font-medium text-[#44403C] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                  >
                    {categoriesList.length > 0 ? (
                      categoriesList.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name} ({cat.slug})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="rings">Rings (rings)</option>
                        <option value="earrings">Earrings (earrings)</option>
                        <option value="necklaces">Necklaces (necklaces)</option>
                        <option value="bracelets">Bracelets (bracelets)</option>
                        <option value="bangles">Bangles (bangles)</option>
                        <option value="pendants">Pendants (pendants)</option>
                        <option value="solitaires">Solitaires (solitaires)</option>
                      </>
                    )}
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Diamond Grades & Sizes */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Diamond Grades
                  </label>
                  <input
                    type="text"
                    value={diamondGrades}
                    onChange={(e) => setDiamondGrades(e.target.value)}
                    placeholder="EF-VVS, IJ-SI"
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Pricing, Making Charges, Selling Price & Stock */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Diamond Price (₹)
                  </label>
                  <input
                    type="text"
                    value={diamondPrice}
                    onChange={(e) => setDiamondPrice(e.target.value)}
                    placeholder="15000.00"
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
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
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#214E34]">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="48250"
                    className="mt-1 h-10 w-full rounded-md border border-[#214E34]/40 bg-[#FAF8F7] px-3 text-xs font-semibold text-[#353333] focus:border-[#214E34] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="10"
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Dimensions */}
              <div className="rounded-lg border border-[#eee9e4] bg-[#FAF8F7] p-3">
                <span className="block text-xs font-semibold text-[#44403C] mb-2">
                  Dimensions (mm)
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-[#8a837b]">Height</label>
                    <input
                      type="text"
                      value={dimHeight}
                      onChange={(e) => setDimHeight(e.target.value)}
                      placeholder="5.20"
                      className="mt-0.5 h-8 w-full rounded-lg border border-[#e5dfd9] bg-white px-2.5 text-xs text-[#353333] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8a837b]">Width</label>
                    <input
                      type="text"
                      value={dimWidth}
                      onChange={(e) => setDimWidth(e.target.value)}
                      placeholder="8.00"
                      className="mt-0.5 h-8 w-full rounded-lg border border-[#e5dfd9] bg-white px-2.5 text-xs text-[#353333] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8a837b]">Length</label>
                    <input
                      type="text"
                      value={dimLength}
                      onChange={(e) => setDimLength(e.target.value)}
                      placeholder="20.00"
                      className="mt-0.5 h-8 w-full rounded-lg border border-[#e5dfd9] bg-white px-2.5 text-xs text-[#353333] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 flex items-center justify-end gap-2.5 pt-2 border-t border-[#eee9e4]">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsAddModalOpen(false);
                    onCloseAddModal?.();
                    resetForm();
                  }}
                  className="rounded-lg border border-[#e5dfd9] px-4 py-2 text-xs font-medium text-[#44403C] hover:bg-[#FAF8F7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#214E34] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1A3F2A] disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingProduct ? "Save changes" : "Add product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={productToDelete?.name}
        itemType="product"
        isDeleting={Boolean(deletingId)}
      />

      {/* Centered Success Popup */}
      <SuccessModal
        isOpen={successPopup.isOpen}
        onClose={() => setSuccessPopup((prev) => ({ ...prev, isOpen: false }))}
        title={successPopup.title}
        message={successPopup.message}
      />
    </div>
  );
}
