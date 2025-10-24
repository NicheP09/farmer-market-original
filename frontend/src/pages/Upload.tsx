// UploadProduce.tsx
import { useEffect, useRef, useState } from "react";

/**
 * UploadProduce.tsx
 * Single-file React + TypeScript + Tailwind component.
 *
 * Features:
 * - Add produce (Publish) / Save as Draft / Update existing item
 * - Processing loader modal (360° spinner) with action-specific text
 * - Result modal that auto-closes after 2s
 * - LocalStorage persistence under key: produceList_v1
 * - File input styled to mimic "Choose File / No file chosen" bordered box
 * - Responsive table (desktop) -> cards (mobile)
 *
 * Important: Tailwind should be configured in the project.
 */

/* --------------------------- Types & Constants --------------------------- */

type Status = "Draft" | "Published";

interface ProduceItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description?: string;
  availableDate: string;
  startDate: string;
  farmLocation: string;
  imageBase64?: string | null;
  status: Status;
  createdAt: number;
}

const LOCALSTORAGE_KEY = "produceList_v1";

/* ----------------------------- Utilities -------------------------------- */

const uid = () => crypto.randomUUID;

const readLocal = (): ProduceItem[] => {
  try {
    const s = localStorage.getItem(LOCALSTORAGE_KEY);
    return s ? (JSON.parse(s) as ProduceItem[]) : [];
  } catch {
    return [];
  }
};

const writeLocal = (list: ProduceItem[]) => {
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore (demo)
  }
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result));
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

// Helper function to format price nicely (₦1,200)
const formatPrice = (value: number | string) => {
  if (!value) return "₦0";
  const num = typeof value === "string" ? parseFloat(value) : value;
  return `₦${num.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
  })}`;
};

/* ----------------------------- Component -------------------------------- */

const Upload = () => {
  /* ------------------------- Form State --------------------------------- */
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [imageFileName, setImageFileName] = useState("No file chosen");
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  /* ------------------------- Produce List ------------------------------- */
  const [list, setList] = useState<ProduceItem[]>([]);

  /* ------------------------- Modal & Loader ----------------------------- */
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [loaderText, setLoaderText] = useState("Processing...");
  const [resultOpen, setResultOpen] = useState(false);
  const [resultText, setResultText] = useState("");
  const resultTimerRef = useRef<number | null>(null);

  /* ------------------------- Edit Mode --------------------------------- */
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ------------------------- Mount / Persist ---------------------------- */
  useEffect(() => {
    setList(readLocal());
  }, []);

  useEffect(() => {
    writeLocal(list);
  }, [list]);

  useEffect(() => {
    return () => {
      if (resultTimerRef.current) window.clearTimeout(resultTimerRef.current);
    };
  }, []);

  /* ------------------------- Validation -------------------------------- */
  const isRequiredValid = (): boolean =>
    name.trim().length > 0 &&
    category.trim().length > 0 &&
    typeof quantity === "number" &&
    quantity > 0 &&
    typeof price === "number" &&
    price > 0 &&
    availableDate.trim().length > 0 &&
    startDate.trim().length > 0 &&
    farmLocation.trim().length > 0;

  /* ------------------------- Reset Form -------------------------------- */
  const resetForm = (keepImage = false) => {
    setName("");
    setCategory("");
    setQuantity("");
    setPrice("");
    setDescription("");
    setAvailableDate("");
    setStartDate("");
    setFarmLocation("");
    if (!keepImage) {
      setImageBase64(null);
      setImageFileName("No file chosen");
    }
    setEditingId(null);
  };

  /* ------------------------- Handler: File Input ------------------------ */
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) {
      setImageFileName("No file chosen");
      setImageBase64(null);
      return;
    }
    setImageFileName(f.name);
    try {
      const b = await fileToBase64(f);
      setImageBase64(b);
    } catch {
      setImageBase64(null);
    }
  };

  /* ------------------------- CRUD Actions ------------------------------- */

  // generic flow for publish / draft / update
  type Action = "publish" | "draft" | "update";

  const performAction = async (action: Action) => {
    if (!isRequiredValid()) return;

    // set loader message per action
    if (action === "publish") setLoaderText("Uploading your produce...");
    else if (action === "draft") setLoaderText("Saving your draft...");
    else setLoaderText("Updating your produce...");

    setLoaderOpen(true);

    // simulate processing time (or replace with real API call)
    setTimeout(() => {
      // build payload
      const payload: ProduceItem = {
        id: (editingId || uid()) as string,
        name: name.trim(),
        category: category.trim(),
        quantity: Number(quantity),
        price: Number(price),
        description: description.trim(),
        availableDate,
        startDate,
        farmLocation: farmLocation.trim(),
        imageBase64: imageBase64 ?? null,
        status:
          action === "publish"
            ? "Published"
            : action === "draft"
            ? "Draft"
            : getStatusForUpdate(editingId),
        createdAt: Date.now(),
      };

      // update list appropriately
      setList((prev) => {
        const exists = prev.find((p) => p.id === payload.id);
        if (exists) {
          // update in-place
          return prev.map((p) => (p.id === payload.id ? payload : p));
        } else {
          // add new at top
          return [payload, ...prev];
        }
      });

      // loader -> result modal
      setLoaderOpen(false);
      if (action === "publish")
        setResultText("Your produce has been uploaded successfully!");
      else if (action === "draft")
        setResultText("Your produce has been saved as draft.");
      else setResultText("Your produce has been updated successfully!");

      setResultOpen(true);
      // auto close after 2s
      resultTimerRef.current = window.setTimeout(() => {
        setResultOpen(false);
      }, 2000);

      // after successful create/update: reset form
      // For update, keep image (since we have base64)
      resetForm(false);
    }, 1100);
  };

  // when updating an existing record we want to preserve its previous status if user chooses Update
  const getStatusForUpdate = (id: string | null): Status => {
    if (!id) return "Published";
    const it = list.find((p) => p.id === id);
    return it ? it.status : "Published";
  };

  /* ------------------------- Delete / Edit ------------------------------ */

  const handleDelete = (id: string) => {
    // confirm
    if (!confirm("Delete this produce?")) return;
    setList((prev) => prev.filter((p) => p.id !== id));
    // If user was editing this item, reset form
    if (editingId === id) {
      resetForm();
    }
  };

  const handleEdit = (id: string) => {
    const it = list.find((p) => p.id === id);
    if (!it) return;
    // prefill all fields except the file input (we keep existing base64 for preview / persistence)
    setEditingId(id);
    setName(it.name);
    setCategory(it.category);
    setQuantity(it.quantity);
    setPrice(it.price);
    setDescription(it.description ?? "");
    setAvailableDate(it.availableDate);
    setStartDate(it.startDate);
    setFarmLocation(it.farmLocation);
    setImageBase64(it.imageBase64 ?? null);
    setImageFileName(it.imageBase64 ? "Selected image" : "No file chosen");

    // scroll to top/form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ------------------------- Sample Options ------------------------------ */
  const categories = ["Fruits", "Vegetables", "Grains", "Pulses", "Dairy"];
  const locations = ["Lagos", "Kano", "Rivers", "Ogun", "Oyo", "Kaduna"];

  /* ------------------------- Render ------------------------------------- */
  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-semibold mb-2">Upload Produce</h1>
        <p className="text-gray-500 mb-6">
          Add your farm-fresh produce. Publish or save a draft.
        </p>

        {/* Form */}
        <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            {/* Produce Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Produce Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  name.trim().length
                    ? "border-gray-300 focus:ring-green-200"
                    : "border-gray-200"
                }`}
                placeholder="Enter the name of Produce"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Food Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  category
                    ? "border-gray-300 focus:ring-green-200"
                    : "border-gray-200"
                }`}
              >
                <option value="">Select food category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity Available (kg/bag)
                </label>
                <input
                  value={quantity}
                  onChange={(e) => {
                    const v = e.target.value;
                    setQuantity(v === "" ? "" : Number(v));
                  }}
                  type="number"
                  min={0}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    quantity !== ""
                      ? "border-gray-300 focus:ring-green-200"
                      : "border-gray-200"
                  }`}
                  placeholder="How many (Kg) do you have in store"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Price per Unit (₦/kg)
                </label>
                <input
                  value={price}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPrice(v === "" ? "" : Number(v));
                  }}
                  type="number"
                  min={0}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    price !== ""
                      ? "border-gray-300 focus:ring-green-200"
                      : "border-gray-200"
                  }`}
                  placeholder="Enter amount per unit"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                placeholder="Say something about the produce"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Available
                </label>
                <input
                  type="date"
                  value={availableDate}
                  onChange={(e) => setAvailableDate(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Start</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Farm Location
              </label>
              <select
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  farmLocation
                    ? "border-gray-300 focus:ring-green-200"
                    : "border-gray-200"
                }`}
              >
                <option value="">Select location</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Images - styled exactly like the screenshot: Choose File + filename inline */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Images
              </label>
              <label
                htmlFor="file"
                className="flex items-center justify-start gap-3 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer w-full"
              >
                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm">
                  Choose File
                </span>
                <span className="text-sm text-gray-500 truncate">
                  {imageFileName}
                </span>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>

              {/* Preview (if available) */}
              {imageBase64 && (
                <div className="mt-3">
                  <img
                    src={imageBase64}
                    alt="preview"
                    className="h-28 w-auto rounded-lg object-cover border"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => performAction(editingId ? "update" : "publish")}
                disabled={!isRequiredValid()}
                className={`px-6 py-3 rounded-lg font-medium transition transform disabled:opacity-40 disabled:cursor-not-allowed ${
                  isRequiredValid()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {editingId ? "Update Produce" : "Publish your produce"}
              </button>

              <button
                type="button"
                onClick={() => performAction("draft")}
                disabled={!isRequiredValid() || Boolean(editingId)} // disabled during editing
                className={`px-5 py-3 rounded-lg font-medium border transition transform disabled:opacity-40 disabled:cursor-not-allowed ${
                  !editingId && isRequiredValid()
                    ? "border-green-600 text-green-600"
                    : "border-gray-200 text-gray-400"
                }`}
              >
                Save as draft
              </button>

              {/* Cancel edit (visible when editing) */}
              {editingId && (
                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="px-4 py-2 rounded-lg border text-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Uploaded Produce */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Uploaded Produce</h2>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    #Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Categories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {list.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-6 text-center text-gray-400"
                    >
                      No produce uploaded yet.
                    </td>
                  </tr>
                )}
                {list.map((p) => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {p.id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-3">
                      {p.imageBase64 ? (
                        <img
                          src={p.imageBase64}
                          alt={p.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-400">
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span>{p.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {p.quantity}kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {p.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          p.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(p.id)}
                        className="p-2 rounded hover:bg-gray-50 text-gray-600"
                        title="Edit"
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 rounded hover:bg-gray-50 text-gray-600"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {list.length === 0 && (
              <div className="text-gray-400">No produce uploaded yet.</div>
            )}
            {list.map((p) => (
              <div key={p.id} className="border rounded-lg p-4 flex gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  {p.imageBase64 ? (
                    <img
                      src={p.imageBase64}
                      alt={p.name}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{p.name}</h3>
                      <p className="text-xs text-gray-500">{p.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {formatPrice(p.price)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {p.quantity}kg
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(p.id)}
                        className="text-gray-600"
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-gray-600"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ----------------------------- Loader Modal ------------------------------- */}
      {loaderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-lg animate-fade-in">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-4 border-gray-200 flex items-center justify-center">
                <div className="h-14 w-14 rounded-full border-4 border-green-600 border-t-transparent animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium">{loaderText}</p>
              <p className="text-sm text-gray-500">Please wait...</p>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------- Result Modal ------------------------------- */}
      {resultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="bg-white rounded-lg p-6 w-11/12 sm:w-96 shadow-lg transform transition-all duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 rounded-full bg-green-50">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-center">
                {resultText}
              </h3>
              <button
                onClick={() => setResultOpen(false)}
                className="mt-2 px-4 py-2 rounded-lg bg-green-600 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;

/* ----------------------------- Notes -------------------------------------
- animate-fade-in: If you want a custom fade-in class, you can add:
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  .animate-fade-in { animation: fadeIn .16s ease-in; }
  Or rely on Tailwind's transition utilities.
- Images are saved as base64 in localStorage for demo convenience. Replace with
  server upload if you expect large images/production usage.
- Save as draft disabled while editing to avoid mode confusion (per spec).
-------------------------------------------------------------------------- */
