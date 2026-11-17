"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Layers,
  Edit2,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  ArrowUpDown,
} from "lucide-react";
import type { Category } from "@/lib/db/schema";
import { ConfirmDeleteModal } from "@/components/admin/shared/confirm-delete-modal";
import {
  getCategories,
  deleteCategory,
} from "@/lib/actions/categories";

export default function CategoriesTable() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let cancelled = false;
    getCategories().then((data) => { if (!cancelled) setCategories(data); })
      .catch(() => { if (!cancelled) setLoadError("Categories could not be loaded. Refresh to try again."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  function showNotification(type: "success" | "error", message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
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

  function handleDelete(id: string, catName: string) {
    setCategoryToDelete({ id, name: catName });
  }

  async function handleConfirmDeleteCategory() {
    if (!categoryToDelete) return;
    const { id, name: catName } = categoryToDelete;

    setDeletingId(id);
    try {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setCategoryToDelete(null);
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

  if (loading) return <p role="status" className="py-16 text-center text-sm text-[#817b70]">Loading…</p>;
  if (loadError) return <p role="alert" className="py-16 text-center text-sm text-red-700">{loadError}</p>;

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
          <h1 className="font-serif text-4xl font-medium leading-tight text-[#214E34] sm:text-[42px]">Categories</h1>
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

          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 rounded-full bg-[#214E34] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1A3F2A]"
          >
            <Plus size={15} />
            <span>Add category</span>
          </Link>
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
                        <Link
                          href={`/admin/categories/edit/${cat.id}`}
                          className="rounded-lg p-1.5 text-[#8a837b] transition-colors hover:bg-white hover:text-[#214E34]"
                          title="Edit Category"
                        >
                          <Edit2 size={14} />
                        </Link>
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

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(categoryToDelete)}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleConfirmDeleteCategory}
        itemName={categoryToDelete?.name}
        itemType="category"
        isDeleting={Boolean(deletingId)}
      />

    </div>
  );
}

