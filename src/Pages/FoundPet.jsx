// src/pages/FoundPet.jsx
import React, { useEffect, useState } from "react";

/* Helper: friendly date */
const formatDate = (d) => {
  if (!d) return "Not specified";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
};

/* Map color text -> hex swatch */
const colorToHex = (colorText) => {
  if (!colorText) return "#6B7280"; // muted gray
  const c = colorText.toLowerCase();
  if (c.includes("black")) return "#111827";
  if (c.includes("white")) return "#F9FAFB";
  if (c.includes("brown")) return "#8B5E3C";
  if (c.includes("gold") || c.includes("golden")) return "#D4A373";
  if (c.includes("gray") || c.includes("grey")) return "#94A3B8";
  if (c.includes("tan")) return "#DDB892";
  if (c.includes("beige")) return "#F5E6D3";
  if (c.includes("orange")) return "var(--brand)";
  if (c.includes("red")) return "#EF4444";
  // fallback: hashed HSL color
  let hash = 0;
  for (let i = 0; i < colorText.length; i++) hash = colorText.charCodeAt(i) + ((hash << 5) - hash);
  const h = Math.abs(hash) % 360;
  return `hsl(${h} 60% 55%)`;
};

export default function FoundPet() {
  const [foundPets, setFoundPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadFound = () => {
    try {
      const data = JSON.parse(localStorage.getItem("foundPets") || "[]");
      setFoundPets(Array.isArray(data) ? data : []);
    } catch {
      setFoundPets([]);
    }
  };

  useEffect(() => {
    loadFound();
    const handler = () => loadFound();
    window.addEventListener("found-updated", handler);
    return () => window.removeEventListener("found-updated", handler);
  }, []);

  const openModal = (pet, e) => {
    if (e) e.stopPropagation();
    setSelected(pet);
    setShowModal(true);
    // lock scroll
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
    document.body.style.overflow = "";
  };

  const copyToClipboard = async (text) => {
    if (!text) {
      alert("No contact provided.");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      // simple feedback — replace with toast if you have toast installed
      alert("Contact number copied to clipboard.");
    } catch {
      alert("Could not copy. Please copy manually: " + text);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">Recently Found Pets</h2>
        <p className="text-sm text-[var(--muted)]">{foundPets.length} results</p>
      </div>

      {foundPets.length === 0 ? (
        <div className="py-12 text-center text-[var(--muted)] bg-[var(--black-card)] border border-[var(--border)] rounded-lg shadow-sm">
          No found pet reports yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {foundPets.map((pet) => (
            <article
              key={pet.id}
              onClick={() => openModal(pet)}
              className="group bg-[var(--black-card)] rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal(pet, e)}
              aria-label={`View details for ${pet.petName || pet.type || "pet"}`}
            >
              {/* image */}
              <div className="relative h-44 bg-gray-800">
                {pet.image ? (
                  <img
                    src={pet.image}
                    alt={pet.petName || pet.type || "Found pet"}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--muted)]">
                    No Image
                  </div>
                )}

                {/* type badge */}
                <span className="absolute top-3 left-3 bg-black/60 text-[var(--brand)] px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {pet.type || "Pet"}
                </span>

                {/* date pill */}
                <span className="absolute top-3 right-3 bg-black/60 text-[var(--muted)] text-xs px-2 py-0.5 rounded-full">
                  {formatDate(pet.date)}
                </span>
              </div>

              {/* content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {pet.petName ? pet.petName : `${pet.type || "Pet"} — ${pet.breed || "Unknown"}`}
                </h3>

                <p className="text-sm text-[var(--muted)] mt-1 truncate">📍 {pet.location || "Unknown location"}</p>

                <p
                  className="mt-3 text-[var(--muted)] text-sm"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {pet.description || "No description provided."}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        aria-hidden
                        style={{ width: 12, height: 12, borderRadius: 6, background: colorToHex(pet.color) }}
                        className="border border-[var(--border)]"
                      />
                      <div className="text-sm text-[var(--muted)]">{pet.color || "—"}</div>
                    </div>

                    <div className="ml-2 hidden md:flex items-center gap-2 text-sm text-[var(--muted)]">
                      <span className="text-[var(--muted)]">•</span>
                      <span>{pet.breed || "—"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(pet, e);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[var(--brand)] text-black text-sm font-medium hover:bg-[var(--brand-dark)] transition focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                      aria-label={`View details for ${pet.petName || pet.type}`}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* modal */}
      {showModal && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Found pet details"
        >
          <div
            className="fixed inset-0 bg-black/60"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative max-w-3xl w-full bg-[var(--black-card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gray-800">
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.petName || selected.type || "Found pet"}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: 420 }}
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-[var(--muted)] p-6">
                    No Image
                  </div>
                )}
              </div>

              <div className="md:w-1/2 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {selected.petName || selected.type}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      {selected.breed || "Unknown breed"} • {selected.location || "Unknown location"}
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="text-[var(--muted)] hover:text-white focus:outline-none"
                    aria-label="Close dialog"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 text-[var(--muted)] text-sm space-y-2">
                  <p><strong className="text-white">Date Found:</strong> {formatDate(selected.date)}</p>
                  {selected.color && (
                    <p>
                      <strong className="text-white">Color:</strong>{" "}
                      <span className="inline-flex items-center gap-2">
                        <span style={{ width: 12, height: 12, borderRadius: 6, background: colorToHex(selected.color) }} className="inline-block border border-[var(--border)]" />
                        <span>{selected.color}</span>
                      </span>
                    </p>
                  )}
                  {selected.size && <p><strong className="text-white">Size:</strong> {selected.size}</p>}
                  {selected.gender && <p><strong className="text-white">Gender:</strong> {selected.gender}</p>}
                  <p><strong className="text-white">Description:</strong></p>
                  <p className="text-[var(--muted)]">{selected.description || "No additional details."}</p>

                  {selected.contactNumber && (
                    <p className="mt-2"><strong className="text-white">Contact:</strong> <span className="text-[var(--muted)] ml-2">{selected.contactNumber}</span></p>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => copyToClipboard(selected.contactNumber)}
                    className="px-4 py-2 rounded-md border border-[var(--border)] text-sm text-[var(--muted)] hover:bg-black/10"
                  >
                    Copy Contact
                  </button>

                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-md bg-[var(--brand)] text-black text-sm font-medium hover:bg-[var(--brand-dark)]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
