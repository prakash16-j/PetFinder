// src/pages/AddPet.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* ---------- sample breed lists ---------- */
const dogBreeds = ["Labrador", "Beagle", "Bulldog", "German Shepherd", "Pug"];
const catBreeds = ["Persian", "Siamese", "Maine Coon", "Ragdoll", "Bengal"];

/* ---------- default form state ---------- */
const defaultForm = {
  petName: "",
  petType: "",
  breed: "",
  customBreed: "",
  color: "",
  customColor: "",
  size: "",
  customSize: "",
  gender: "",
  dateLost: "",
  location: "",
  description: "",
  microchipId: "",
  contactNumber: "",
  imageFile: null,
  imageData: "",
};

export default function AddPet() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [breedsList, setBreedsList] = useState([]);
  const [descCount, setDescCount] = useState(0);
  const navigate = useNavigate();

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      if (!file) return resolve("");
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // file input
    if (files) {
      const file = files[0] || null;
      setForm((s) => ({ ...s, imageFile: file }));
      // preview immediately
      if (file) {
        const fr = new FileReader();
        fr.onload = () => setForm((s) => ({ ...s, imageData: fr.result }));
        fr.readAsDataURL(file);
      } else {
        setForm((s) => ({ ...s, imageData: "" }));
      }
      return;
    }

    // update normal field
    setForm((s) => ({ ...s, [name]: value }));

    // update description counter
    if (name === "description") setDescCount(value.length);

    // when petType changes, update breed list and clear breed fields
    if (name === "petType") {
      if (value === "dog") setBreedsList(dogBreeds);
      else if (value === "cat") setBreedsList(catBreeds);
      else setBreedsList([]);
      setForm((s) => ({ ...s, breed: "", customBreed: "" }));
    }

    // clear per-field error while typing
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.petName.trim()) e.petName = "Pet name is required.";
    if (!form.petType) e.petType = "Pet type is required.";

    if (form.petType === "dog" || form.petType === "cat") {
      if (!form.breed && !form.customBreed.trim()) e.breed = "Breed is required.";
    } else if (!form.customBreed.trim()) {
      e.breed = "Please specify the breed/type.";
    }

    if (!form.color) e.color = "Color is required.";
    if (form.color === "Other" && !form.customColor.trim()) e.customColor = "Please specify color.";

    if (!form.size) e.size = "Size is required.";
    if (form.size === "Other" && !form.customSize.trim()) e.customSize = "Please specify size.";

    if (!form.gender) e.gender = "Gender is required.";
    if (!form.dateLost) e.dateLost = "Date lost is required.";
    if (!form.location.trim()) e.location = "Lost location is required.";
    if (!form.description.trim()) e.description = "Description is required.";

    if (!/^\d{10}$/.test(form.contactNumber)) e.contactNumber = "Contact must be 10 digits.";

    setErrors(e);
    return e;
  };

  const clearImage = () => {
    setForm((s) => ({ ...s, imageFile: null, imageData: "" }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.warning("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      // ensure image data is prepared
      let dataUrl = form.imageData;
      if (!dataUrl && form.imageFile) {
        dataUrl = await readFileAsDataURL(form.imageFile);
      }

      const breedValue = form.breed || form.customBreed;
      const colorValue = form.color === "Other" ? form.customColor : form.color;
      const sizeValue = form.size === "Other" ? form.customSize : form.size;

      const newPet = {
        id: Date.now(),
        petName: form.petName.trim(),
        petType: form.petType,
        breed: breedValue.trim(),
        color: (colorValue || "").trim(),
        size: (sizeValue || "").trim(),
        gender: form.gender,
        dateLost: form.dateLost,
        location: form.location.trim(),
        description: form.description.trim(),
        microchipId: form.microchipId ? form.microchipId.trim() : "",
        contactNumber: form.contactNumber.trim(),
        image: dataUrl || "",
        createdAt: new Date().toISOString(),
      };

      // save to localStorage (prepend)
      const raw = localStorage.getItem("lostPets");
      let arr = [];
      try {
        arr = raw ? JSON.parse(raw) : [];
      } catch {
        arr = [];
      }
      arr.unshift(newPet);
      localStorage.setItem("lostPets", JSON.stringify(arr));

      // success
      toast.success("Lost pet reported — thank you! 🎉", { autoClose: 1700 });

      // small delay so user sees toast, then navigate
      setTimeout(() => {
        navigate("/lost-pet"); // adjust route as needed
      }, 900);
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save. Try again.");
      setErrors({ submit: "Failed to save the report. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--black-bg)] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* MAIN CARD */}
        <div className="form-card rounded-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* LEFT: header / visual */}
            <div className="md:w-1/3 p-6 flex flex-col gap-4 border-r border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "var(--brand)" }}>
                  <span className="text-black text-xl">🐾</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">Report Lost Pet</h2>
                  <p className="text-sm helper">Help reunite a pet with its family — it only takes a minute.</p>
                </div>
              </div>

              <div className="mt-4 text-sm helper">
                <p><strong>Tip:</strong> Add clear photos and a precise location to increase chances of reunion.</p>
              </div>

              <div className="mt-auto w-full">
                <div className="text-xs helper mb-2">Preview</div>
                <div className="w-full h-36 rounded-lg border border-[var(--border)] flex items-center justify-center overflow-hidden bg-[var(--black-card)]">
                  {form.imageData ? (
                    <img src={form.imageData} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 text-sm">Image preview will appear here</div>
                  )}
                </div>
                {form.imageData && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="mt-3 w-full text-sm py-2 rounded border border-[var(--border)] text-white hover:bg-black/10"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: form */}
            <form onSubmit={handleSubmit} className="md:w-2/3 p-6 space-y-4">
              {/* Row: name + type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="petName" className="block text-sm font-medium text-white">Pet Name *</label>
                  <input
                    id="petName"
                    name="petName"
                    value={form.petName}
                    onChange={handleChange}
                    placeholder="e.g., Bruno"
                    aria-required="true"
                    className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.petName ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                  />
                  {errors.petName && <div className="text-xs text-error mt-1">{errors.petName}</div>}
                </div>

                <div>
                  <label htmlFor="petType" className="block text-sm font-medium text-white">Type *</label>
                  <select
                    id="petType"
                    name="petType"
                    value={form.petType}
                    onChange={handleChange}
                    aria-required="true"
                    className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.petType ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                  >
                    <option value="">Select type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.petType && <div className="text-xs text-error mt-1">{errors.petType}</div>}
                </div>
              </div>

              {/* Row: breed & color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="breed" className="block text-sm font-medium text-white">Breed *</label>
                  {form.petType === "dog" || form.petType === "cat" ? (
                    <>
                      <select
                        id="breed"
                        name="breed"
                        value={form.breed}
                        onChange={handleChange}
                        className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.breed ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                      >
                        <option value="">Select breed (or enter below)</option>
                        {(form.petType === "dog" ? dogBreeds : catBreeds).map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>

                      <input
                        name="customBreed"
                        value={form.customBreed}
                        onChange={handleChange}
                        placeholder="If not listed, type breed here (optional)"
                        className="mt-2 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white"
                      />
                    </>
                  ) : (
                    <input
                      name="customBreed"
                      value={form.customBreed}
                      onChange={handleChange}
                      placeholder="Specify breed/type"
                      className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.breed ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                    />
                  )}
                  {errors.breed && <div className="text-xs text-error mt-1">{errors.breed}</div>}
                </div>

                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-white">Color *</label>
                  <select
                    id="color"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.color ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                  >
                    <option value="">Select color</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Brown">Brown</option>
                    <option value="Golden">Golden</option>
                    <option value="Gray">Gray</option>
                    <option value="Other">Other</option>
                  </select>

                  {form.color === "Other" && (
                    <input
                      name="customColor"
                      value={form.customColor}
                      onChange={handleChange}
                      placeholder="Specify color"
                      className="mt-2 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white"
                    />
                  )}
                  {errors.color && <div className="text-xs text-error mt-1">{errors.color}</div>}
                  {errors.customColor && <div className="text-xs text-error mt-1">{errors.customColor}</div>}
                </div>
              </div>

              {/* Row: size & gender/date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-white">Size *</label>
                  <select
                    id="size"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.size ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                  >
                    <option value="">Select size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Other">Other</option>
                  </select>

                  {form.size === "Other" && (
                    <input
                      name="customSize"
                      value={form.customSize}
                      onChange={handleChange}
                      placeholder="Describe size"
                      className="mt-2 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white"
                    />
                  )}
                  {errors.size && <div className="text-xs text-error mt-1">{errors.size}</div>}
                  {errors.customSize && <div className="text-xs text-error mt-1">{errors.customSize}</div>}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-white">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.gender ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                  {errors.gender && <div className="text-xs text-error mt-1">{errors.gender}</div>}
                </div>

                <div>
                  <label htmlFor="dateLost" className="block text-sm font-medium text-white">Date Lost *</label>
                  <input
                    id="dateLost"
                    name="dateLost"
                    type="date"
                    value={form.dateLost}
                    onChange={handleChange}
                    className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.dateLost ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                  />
                  {errors.dateLost && <div className="text-xs text-error mt-1">{errors.dateLost}</div>}
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-white">Lost Location *</label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City / Landmark / Area"
                  className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.location ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                />
                {errors.location && <div className="text-xs text-error mt-1">{errors.location}</div>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-white">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Distinguishing marks, last seen details, behavior, etc."
                  className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.description ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                />
                <div className="flex items-center justify-between mt-1 text-xs helper">
                  <div>{errors.description ? <span className="text-error">{errors.description}</span> : "Be specific — helps volunteers identify the pet."}</div>
                  <div>{descCount}/300</div>
                </div>
              </div>

              {/* microchip + contact + image */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div>
                  <label htmlFor="microchipId" className="block text-sm font-medium text-white">Microchip / Tag ID</label>
                  <input
                    id="microchipId"
                    name="microchipId"
                    value={form.microchipId}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border border-[var(--border)] focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-white">Contact Number *</label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    className={`mt-1 w-full px-3 py-2 rounded-lg bg-[var(--black-card)] border ${errors.contactNumber ? "input-error" : "border-[var(--border)]"} focus:ring-2 focus:ring-[var(--brand)] focus:outline-none text-white`}
                  />
                  {errors.contactNumber && <div className="text-xs text-error mt-1">{errors.contactNumber}</div>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">Upload Image (optional)</label>
                  <label htmlFor="imageFile" className="mt-1 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent border border-[var(--border)] cursor-pointer text-sm">
                    Choose image
                  </label>
                  <input
                    id="imageFile"
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="mt-2 text-xs helper">Clear face/markings & good lighting.</div>
                </div>
              </div>

              {/* submit row */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 btn-primary px-4 py-2 rounded-lg shadow disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Submit Report"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm(defaultForm);
                    setErrors({});
                    setDescCount(0);
                  }}
                  className="px-4 py-2 border rounded-lg text-sm hover:bg-black/5 text-white"
                >
                  Reset
                </button>

                {errors.submit && <div className="text-sm text-error ml-4">{errors.submit}</div>}
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
