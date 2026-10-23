"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Layers,
  Edit2,
  Trash2,
  X,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  ImageIcon,
  ArrowUpDown,
} from "lucide-react";
import type { Category } from "@/lib/db/schema";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/actions/categories";

interface CategoriesTableProps {
  initialCategories?: Category[];
}

export function CategoriesTable({ initialCategories = [] }: CategoriesTableProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Loading & Notification state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [redirectSlug, setRedirectSlug] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  // Sync state if initialCategories updates
  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
    }
  }, [initialCategories]);

  function showNotification(type: "success" | "error", message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  }

  function resetForm() {
    setName("");
    setSlug("");
    setRedirectSlug("");
    setBannerImage("");
    setDescription("");
    setPriority("1");
    setEditingCategory(null);
  }

  function openAddModal() {
    resetForm();
    setIsAddModalOpen(true);
  }

  function openEditModal(cat: Category) {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setRedirectSlug(cat.redirectSlug || "");
    setBannerImage(cat.bannerImage || "");
    setDescription(cat.description || "");
    setPriority((cat.priority ?? 1).toString());
    setIsAddModalOpen(true);
  }

  async function handleRefresh() {
    setIsRefreshing(true);
    try {
      const fresh = await getCategories();
      setCategories(fresh);
      showNotification("success", `Refreshed ${fresh.length} categories from database.`);
    } catch {
      showNotification("error", "Failed to refresh categories.");
    } finally {
      setIsRefreshing(false);
    }
  }

  // Auto generate slug from name if adding
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setName(val);
    if (!editingCategory) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
      setRedirectSlug(`/collection?category=${encodeURIComponent(val)}`);
    }
  }

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    });
  }, [categories, search]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      showNotification("error", "Category name is required.");
      return;
    }

    setIsSubmitting(true);
    const parsedPriority = parseInt(priority, 10) || 1;

    try {
      if (editingCategory) {
        // UPDATE CATEGORY
        const res = await updateCategory(editingCategory.id, {
          name: name.trim(),
          slug: slug.trim(),
          redirectSlug: redirectSlug.trim() || undefined,
          bannerImage: bannerImage.trim() || undefined,
          description: description.trim() || undefined,
          priority: parsedPriority,
        });

        if (!res.success || !res.category) {
          showNotification("error", res.error || "Failed to update category.");
          setIsSubmitting(false);
          return;
        }

        const updated = res.category;
        setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        showNotification("success", `Category "${updated.name}" updated successfully!`);

        getCategories().then((fresh) => {
          if (fresh?.length) setCategories(fresh);
        });
        router.refresh();
      } else {
        // CREATE CATEGORY
        const res = await createCategory({
          name: name.trim(),
          slug: slug.trim(),
          redirectSlug: redirectSlug.trim() || undefined,
          bannerImage: bannerImage.trim() || undefined,
          description: description.trim() || undefined,
          priority: parsedPriority,
        });

        if (!res.success || !res.category) {
          showNotification("error", res.error || "Failed to create category.");
          setIsSubmitting(false);
          return;
        }

        const created = res.category;
        setCategories((prev) => [...prev, created]);
        showNotification("success", `Category "${created.name}" created successfully!`);

        getCategories().then((fresh) => {
          if (fresh?.length) setCategories(fresh);
        });
        router.refresh();
      }

      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Save category error:", err);
      showNotification("error", "An error occurred while saving category.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string, catName: string) {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        showNotification("success", `Category "${catName}" deleted.`);
        getCategories().then((fresh) => {
          if (fresh?.length) setCategories(fresh);
        });
        router.refresh();
      } else {
        showNotification("error", res.error || "Failed to delete category.");
      }
    } catch {
      showNotification("error", "Error deleting category.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
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

      {/* Header with Title and Actions */}
      <div className="flex flex-col gap-4 border-b border-[#e9e4df] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-medium leading-tight text-[#214E34] sm:text-[42px]">Category</h1>
          <p className="mt-2 text-xs leading-6 text-[#8a837b]">
            Organise your website categories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5dfd9] bg-white px-3.5 py-2 text-xs font-medium text-[#44403C] transition-colors hover:border-[#9b8966] hover:text-[#353333] disabled:opacity-50"
            title="Refresh category"
          >
            <RefreshCw size={13} className={isRefreshing ? "animate-spin text-[#9b8966]" : "text-[#8a837b]"} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-full bg-[#214E34] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1A3F2A]"
          >
            <Plus size={15} />
            <span>Add category</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col gap-3 rounded-lg border border-[#e9e4df] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa198]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories by name or slug..."
            className="h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] pl-9 pr-3 text-xs text-[#353333] placeholder:text-[#aaa198] transition-all focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="text-xs text-[#8a837b]">
          Total <span className="font-semibold text-[#353333]">{filteredCategories.length}</span> categories
        </div>
      </div>

      {/* Categories Table */}
      <div className="overflow-hidden rounded-lg border border-[#e9e4df] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-[#eee9e4] bg-[#FAF8F7] font-sans text-[11px] font-semibold uppercase tracking-wider text-[#8a837b]">
              <tr>
                <th className="py-3.5 pl-6 pr-4">Category</th>
                <th className="px-4 py-3.5">Slug</th>
                <th className="px-4 py-3.5">Redirect URL</th>
                <th className="px-4 py-3.5 text-center">Priority</th>
                <th className="px-4 py-3.5">Description</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee9e4]">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-[#aaa198]">
                    No categories found. Click &quot;Add category&quot; to create one.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="group transition-colors hover:bg-[#FAF8F7]/80">
                    {/* Category Name & Image */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-[#e5dfd9] bg-[#FAF8F7]">
                          {cat.bannerImage ? (
                            <Image
                              src={cat.bannerImage}
                              alt={cat.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center text-[#aaa198]">
                              <Layers size={18} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-[#353333]">{cat.name}</div>
                          <div className="text-[10px] text-[#aaa198]">ID: {cat.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-md bg-[#FAF8F7] px-2 py-1 font-mono text-[11px] text-[#214E34]">
                        /{cat.slug}
                      </span>
                    </td>

                    {/* Redirect Slug */}
                    <td className="px-4 py-4 text-[#57534E]">
                      {cat.redirectSlug ? (
                        <a
                          href={cat.redirectSlug}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[#214E34] hover:underline"
                        >
                          <span className="truncate max-w-[180px]">{cat.redirectSlug}</span>
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-[#aaa198]">—</span>
                      )}
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#9b8966]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#8d7c61]">
                        <ArrowUpDown size={10} />
                        Order: {cat.priority ?? 1}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-4 py-4 text-[#8a837b] max-w-xs">
                      <p className="truncate text-xs">{cat.description || "—"}</p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          className="rounded-lg p-1.5 text-[#8a837b] transition-colors hover:bg-white hover:text-[#214E34]"
                          title="Edit Category"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === cat.id}
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="rounded-lg p-1.5 text-[#8a837b] transition-colors hover:bg-white hover:text-rose-600 disabled:opacity-40"
                          title="Delete Category"
                        >
                          {deletingId === cat.id ? (
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

      {/* Add / Edit Category Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => {
            setIsAddModalOpen(false);
            resetForm();
          }}
        >
          <div
            className="w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg border border-[#e9e4df] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee9e4] bg-[#FAF8F7] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 place-items-center rounded-lg bg-[#214E34]/15 text-[#214E34]">
                  <Layers size={17} />
                </div>
                <div>
                  <h3 className="font-serif text-[28px] font-medium text-[#353333]">
                    {editingCategory ? "Edit Category" : "Add category"}
                  </h3>
                  <p className="text-[11px] text-[#8a837b]">
                    {editingCategory
                      ? `Edit ${editingCategory.name}`
                      : "Create a jewellery category for navigation and filtering"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
                className="grid size-8 place-items-center rounded-lg text-[#8a837b] hover:bg-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              {/* Category Name & Slug */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    Category Name (name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={handleNameChange}
                    placeholder="e.g. Rings, Solitaires"
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403C]">
                    URL Slug (slug) *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. rings"
                    className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 font-mono text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Redirect Slug / Target */}
              <div>
                <label className="block text-xs font-semibold text-[#44403C]">
                  Redirect URL (redirect_slug)
                </label>
                <input
                  type="text"
                  value={redirectSlug}
                  onChange={(e) => setRedirectSlug(e.target.value)}
                  placeholder="/collection?category=Rings"
                  className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Banner Image URL */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#44403C]">
                  <ImageIcon size={14} className="text-[#9b8966]" />
                  Banner Image (banner_image)
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    placeholder="/Images/Header_ring.png or https://..."
                    className="h-9 flex-1 rounded-lg border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                  />
                  {bannerImage && (
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-[#e5dfd9] bg-neutral-100">
                      <Image src={bannerImage} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-semibold text-[#44403C]">
                  Display Priority (order: 1, 2, 3...)
                </label>
                <input
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  placeholder="1"
                  className="mt-1 h-10 w-full rounded-md border border-[#e5dfd9] bg-[#FAF8F7] px-3 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#44403C]">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category highlights and collection description..."
                  className="mt-1 w-full rounded-lg border border-[#e5dfd9] bg-[#FAF8F7] p-2.5 text-xs text-[#353333] focus:border-[#9b8966] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 flex items-center justify-end gap-2.5 pt-2 border-t border-[#eee9e4]">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsAddModalOpen(false);
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
                  <span>{editingCategory ? "Update Category" : "Save Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

