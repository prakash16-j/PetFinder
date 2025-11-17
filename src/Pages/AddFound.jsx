// src/pages/AddFound.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";

const dogBreeds = ["Labrador", "Beagle", "Bulldog", "Pug", "German Shepherd"];
const catBreeds = ["Persian", "Siamese", "Maine Coon", "Ragdoll", "Bengal"];

/** Helper to convert File -> dataURL */
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

/** Normalize color text: prefer custom when present, trim and capitalise first word */
const normalizeColor = (value, custom) => {
  const raw = (value === "Other" ? custom : value) || "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  // simple capitalization: First letter uppercase, rest lowercase (multi-word: keep lower for rest)
  return trimmed
    .split(" ")
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()))
    .join(" ");
};

export default function AddFound() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    breed: "",
    customBreed: "",
    color: "",
    customColor: "",
    location: "",
    date: "",
    description: "",
    imageFile: null,
    imageData: "",
  });

  const [breedsList, setBreedsList] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // update breed list when type changes
  useEffect(() => {
    if (form.type === "Dog") setBreedsList(dogBreeds);
    else if (form.type === "Cat") setBreedsList(catBreeds);
    else setBreedsList([]);
    // clear breed fields when switching type
    setForm((f) => ({ ...f, breed: "", customBreed: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.type]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files && files[0] ? files[0] : null;
      setForm((s) => ({ ...s, imageFile: file }));
      if (file) {
        const fr = new FileReader();
        fr.onload = () => setForm((s) => ({ ...s, imageData: fr.result }));
        fr.readAsDataURL(file);
      } else {
        setForm((s) => ({ ...s, imageData: "" }));
      }
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const clearImage = () => setForm((s) => ({ ...s, imageFile: null, imageData: "" }));

  const validate = () => {
    const e = {};
    if (!form.type) e.type = "Pet Type is required.";
    if (breedsList.length > 0) {
      if (!form.breed && !form.customBreed.trim()) e.breed = "Breed is required.";
    } else {
      if (!form.customBreed.trim()) e.breed = "Breed is required.";
    }
    if (!form.color && !form.customColor.trim()) e.color = "Color is required.";
    if (!form.location.trim()) e.location = "Found location is required.";
    if (!form.date) e.date = "Found date is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const breed = form.breed || form.customBreed || "";
      const colorNormalized = normalizeColor(form.color, form.customColor);
      const imageDataUrl = form.imageData || (form.imageFile ? await readFileAsDataURL(form.imageFile) : null);

      const newPet = {
        id: Date.now(),
        type: form.type,
        breed: breed.trim(),
        color: colorNormalized,
        location: form.location.trim(),
        date: form.date,
        description: form.description.trim(),
        image: imageDataUrl,
      };

      const raw = localStorage.getItem("foundPets");
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(newPet);
      localStorage.setItem("foundPets", JSON.stringify(arr));

      // notify other components
      window.dispatchEvent(new Event("found-updated"));

      // redirect to home (home reads localStorage and shows Found Pets)
      navigate("/");
    } catch (err) {
      console.error("Saving found pet failed:", err);
      // keep simple UX if you don't use toast: alert
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="form-card rounded-2xl overflow-hidden">
        <div className="md:flex">
          {/* left info + preview */}
          <div className="md:w-1/3 p-6 border-r border-[var(--border)]">
            <h2 className="text-xl font-semibold" style={{ color: "var(--brand)" }}>Found a pet?</h2>
            <p className="helper mt-2 text-sm">Add details here — collar/tags and exact location help a lot.</p>

            <div className="mt-6">
              <div className="w-full h-40 rounded-lg overflow-hidden bg-[var(--black-card)] border border-[var(--border)] flex items-center justify-center">
                {form.imageData ? (
                  <img src={form.imageData} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="helper text-sm flex flex-col items-center">
                    <AiOutlineCamera size={28} />
                    <span className="mt-2">Image preview</span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                {form.imageData && (
                  <button type="button" onClick={clearImage} className="px-3 py-2 rounded border text-sm hover:bg-[#2a2a2a] inline-flex items-center gap-2">
                    <AiOutlineDelete /> Remove
                  </button>
                )}
                <div className="text-xs helper ml-auto">Listings saved locally.</div>
              </div>
            </div>
          </div>

          {/* right: form */}
          <form onSubmit={handleSubmit} className="md:w-2/3 p-6 space-y-4">
            {/* Pet Type */}
            <div>
              <label className="text-sm helper block mb-1">Pet Type *</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded border ${errors.type ? "input-error" : "border-[var(--border)]"}`}
              >
                <option value="">Select type</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Other</option>
              </select>
              {errors.type && <div className="text-xs text-error mt-1">{errors.type}</div>}
            </div>

            {/* Breed (conditional) */}
            <div>
              <label className="text-sm helper block mb-1">Breed *</label>
              {breedsList.length > 0 ? (
                <>
                  <select
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border ${errors.breed ? "input-error" : "border-[var(--border)]"}`}
                  >
                    <option value="">Select breed</option>
                    {breedsList.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>

                  {form.breed === "Other" && (
                    <input
                      type="text"
                      name="customBreed"
                      value={form.customBreed}
                      onChange={handleChange}
                      placeholder="Enter breed"
                      className="mt-2 w-full px-3 py-2 rounded border border-[var(--border)] bg-[#1f1f1f]"
                    />
                  )}
                </>
              ) : (
                <input
                  type="text"
                  name="customBreed"
                  value={form.customBreed}
                  onChange={handleChange}
                  placeholder="Enter breed"
                  className={`w-full px-3 py-2 rounded border ${errors.breed ? "input-error" : "border-[var(--border)]"}`}
                />
              )}
              {errors.breed && <div className="text-xs text-error mt-1">{errors.breed}</div>}
            </div>

            {/* Color */}
            <div>
              <label className="text-sm helper block mb-1">Color *</label>
              <select
                name="color"
                value={form.color}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded border ${errors.color ? "input-error" : "border-[var(--border)]"}`}
              >
                <option value="">Select color</option>
                <option>Black</option>
                <option>White</option>
                <option>Brown</option>
                <option>Golden</option>
                <option>Gray</option>
                <option value="Other">Other</option>
              </select>

              {form.color === "Other" && (
                <input
                  type="text"
                  name="customColor"
                  value={form.customColor}
                  onChange={handleChange}
                  placeholder="Enter color (e.g., light brown)"
                  className="mt-2 w-full px-3 py-2 rounded border border-[var(--border)] bg-[#1f1f1f]"
                />
              )}

              {errors.color && <div className="text-xs text-error mt-1">{errors.color}</div>}
            </div>

            {/* Location */}
            <div>
              <label className="text-sm helper block mb-1">Found Location *</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Park Street, Mumbai"
                className={`w-full px-3 py-2 rounded border ${errors.location ? "input-error" : "border-[var(--border)]"}`}
              />
              {errors.location && <div className="text-xs text-error mt-1">{errors.location}</div>}
            </div>

            {/* Date */}
            <div>
              <label className="text-sm helper block mb-1">Date Found *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded border ${errors.date ? "input-error" : "border-[var(--border)]"}`}
              />
              {errors.date && <div className="text-xs text-error mt-1">{errors.date}</div>}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm helper block mb-1">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Short details (appearance, collar, tags, behaviour)..."
                className={`w-full px-3 py-2 rounded border ${errors.description ? "input-error" : "border-[var(--border)]"}`}
              />
              {errors.description && <div className="text-xs text-error mt-1">{errors.description}</div>}
            </div>

            {/* Image upload */}
            <div>
              <label className="text-sm helper block mb-1">Upload Image (optional)</label>
              <input type="file" accept="image/*" name="imageFile" onChange={handleChange} className="w-full text-sm" />
            </div>

            {/* actions */}
            <div className="pt-2 flex items-center gap-3">
              <button type="submit" disabled={saving} className="btn-primary px-4 py-2 rounded">
                {saving ? "Saving..." : "Submit Found Pet"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    type: "",
                    breed: "",
                    customBreed: "",
                    color: "",
                    customColor: "",
                    location: "",
                    date: "",
                    description: "",
                    imageFile: null,
                    imageData: "",
                  })
                }
                className="px-4 py-2 rounded border"
              >
                Reset
              </button>

              <div className="ml-auto text-xs helper">Listings saved locally.</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
