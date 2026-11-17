"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ImageUploadInput } from "@/components/admin/shared/image-upload-input";
import { createCategory, getCategoryById, updateCategory } from "@/lib/actions/categories";

const emptyForm = { name: "", slug: "", redirectSlug: "", description: "", bannerImage: "", dimensions: "", priority: "1" };
const inputClass = "mt-2 w-full rounded-lg border border-[#e5dfd9] bg-white px-3 py-2.5 text-sm text-[#353333] placeholder:text-[#aaa198] focus:border-[#214E34] focus:outline-none focus:ring-1 focus:ring-[#214E34]";

export default function CategoryPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(Boolean(id));
  const [loaded, setLoaded] = useState(!id);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [dimensionsUploading, setDimensionsUploading] = useState(false);
  const manualSlug = useRef(false);
  const manualRedirect = useRef(false);
  const busy = saving || bannerUploading || dimensionsUploading;

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    getCategoryById(id).then((category) => {
      if (cancelled) return;
      if (!category) { setError("Category not found."); return; }
      setForm({ name: category.name, slug: category.slug, redirectSlug: category.redirectSlug || "", description: category.description || "", bannerImage: category.bannerImage || "", dimensions: category.dimensions || "", priority: String(category.priority ?? 1) });
      setLoaded(true);
    }).catch(() => { if (!cancelled) setError("Could not load this category. Refresh to try again."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  function update(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function changeName(value: string) {
    setForm((current) => ({
      ...current, name: value,
      ...(!id && !manualSlug.current ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") } : {}),
      ...(!id && !manualRedirect.current ? { redirectSlug: value.trim() ? `/collection?category=${encodeURIComponent(value.trim())}` : "" } : {}),
    }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !loaded) return;
    setError("");
    if (!form.name.trim() || !form.slug.trim()) { setError("Enter a category name and URL slug."); return; }
    const priority = Number(form.priority);
    if (form.priority.trim() === "" || !Number.isSafeInteger(priority) || priority < 0) { setError("Display order must be a whole number of 0 or more."); return; }
    setSaving(true);
    try {
      const input = { ...form, name: form.name.trim(), slug: form.slug.trim(), description: form.description.trim(), redirectSlug: form.redirectSlug.trim(), priority };
      const result = id ? await updateCategory(id, input) : await createCategory(input);
      if (!result.success) { setError(result.error || "Could not save the category. Please try again."); return; }
      router.push("/admin/categories");
      router.refresh();
    } catch {
      setError("Could not save the category. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <header className="border-b border-[#e9e4df] pb-6">
        <Link href="/admin/categories" className="mb-5 inline-flex items-center gap-2 text-xs text-[#81776e] hover:text-[#214E34]"><ArrowLeft size={14} />Categories</Link>
        <h1 className="font-serif text-4xl font-medium text-[#214E34]">{id ? "Edit category" : "Add category"}</h1>
        <p className="mt-2 text-sm text-[#8a837b]">Manage category details and images.</p>
      </header>
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading ? <p role="status" className="py-12 text-center text-sm text-[#81776e]">Loading category…</p> : loaded && (
        <form onSubmit={save} className="space-y-6">
          <fieldset disabled={saving} className="space-y-6 disabled:opacity-70">
            <div className="space-y-5 rounded-xl border border-[#e9e4df] bg-white p-5 sm:p-7">
              <label className="block text-sm font-medium text-[#44403C]">Category name <span className="text-red-700">*</span>
                <input required value={form.name} onChange={(event) => changeName(event.target.value)} placeholder="e.g. Stud Earrings" className={inputClass} />
              </label>
              <label className="block text-sm font-medium text-[#44403C]">Description
                <textarea rows={3} value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="A short description of this category" className={inputClass} />
              </label>
              <div className="grid gap-7 sm:grid-cols-2">
                <ImageUploadInput label="Category image" value={form.bannerImage} onChange={(value) => update("bannerImage", value)} onUploadingChange={setBannerUploading} folder="categories" helperText="Used to represent this category." disabled={saving} />
                <ImageUploadInput label="Dimensions image" value={form.dimensions} onChange={(value) => update("dimensions", value)} onUploadingChange={setDimensionsUploading} folder="categories" helperText="Shown on product pages in this category." disabled={saving} contain />
              </div>
            </div>
            <details onInvalidCapture={(event) => { event.currentTarget.open = true; }} className="rounded-xl border border-[#e9e4df] bg-white p-5 sm:p-7">
              <summary className="cursor-pointer text-sm font-medium text-[#44403C]">URL & display settings</summary>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block text-sm text-[#44403C]">URL slug <span className="text-red-700">*</span>
                  <input required value={form.slug} onChange={(event) => { manualSlug.current = true; update("slug", event.target.value); }} placeholder="stud-earrings" className={inputClass} />
                </label>
                <label className="block text-sm text-[#44403C]">Display order
                  <input type="number" required min="0" step="1" value={form.priority} onChange={(event) => update("priority", event.target.value)} className={inputClass} />
                </label>
                <label className="block text-sm text-[#44403C] sm:col-span-2">Category link
                  <input value={form.redirectSlug} onChange={(event) => { manualRedirect.current = true; update("redirectSlug", event.target.value); }} placeholder="/collection?category=Earrings" className={inputClass} />
                </label>
              </div>
            </details>
          </fieldset>
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#e9e4df] pt-5">
            {(bannerUploading || dimensionsUploading) && <p role="status" className="mr-auto text-xs text-[#81776e]">Wait for images to finish uploading.</p>}
            <Link href="/admin/categories" className="rounded-lg border border-[#e5dfd9] px-5 py-2.5 text-sm text-[#44403C] hover:bg-white">Cancel</Link>
            <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-[#214E34] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1A3F2A] disabled:opacity-50">{saving && <Loader2 size={15} className="animate-spin" />}{saving ? "Saving…" : id ? "Save changes" : "Create category"}</button>
          </div>
        </form>
      )}
    </div>
  );
}
