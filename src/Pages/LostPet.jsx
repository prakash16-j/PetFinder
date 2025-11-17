// src/pages/LostPet.jsx
import React, { useEffect, useState } from "react";

/* small helpers */
function formatDate(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
}

/* map color text -> hex */
const colorToHex = (colorText) => {
  if (!colorText) return "#6B7280";
  const c = colorText.toLowerCase();
  if (c.includes("black")) return "#111827";
  if (c.includes("white")) return "#F9FAFB";
  if (c.includes("brown")) return "#8B5E3C";
  if (c.includes("gold") || c.includes("golden")) return "#D4A373";
  if (c.includes("gray") || c.includes("grey")) return "#94A3B8";
  if (c.includes("orange")) return "var(--brand)";
  let hash = 0;
  for (let i = 0; i < colorText.length; i++) hash = colorText.charCodeAt(i) + ((hash << 5) - hash);
  const h = Math.abs(hash) % 360;
  return `hsl(${h} 60% 55%)`;
};

export default function LostPet() {
  const [lostPets, setLostPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const loadLost = () => {
    try {
      const data = JSON.parse(localStorage.getItem("lostPets") || "[]");
      setLostPets(Array.isArray(data) ? data : []);
    } catch {
      setLostPets([]);
    }
  };

  useEffect(() => {
    loadLost();
    const handler = () => loadLost();
    window.addEventListener("lost-updated", handler);
    return () => window.removeEventListener("lost-updated", handler);
  }, []);

  const openModal = (pet, e) => {
    if (e) e.stopPropagation();
    setSelected(pet);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // lock scroll
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
    document.body.style.overflow = "";
  };

  // Move a lost pet to foundPets (add to foundPets and remove from lostPets)
  const markAsFound = (pet) => {
    try {
      // 1) add to foundPets
      const rawFound = localStorage.getItem("foundPets");
      const foundArr = rawFound ? JSON.parse(rawFound) : [];
      const foundItem = {
        ...pet,
        movedAt: new Date().toISOString(),
        date: pet.date || pet.dateLost || pet.lostDate || new Date().toISOString(),
      };
      foundArr.unshift(foundItem);
      localStorage.setItem("foundPets", JSON.stringify(foundArr));

      // 2) remove from lostPets
      const rawLost = localStorage.getItem("lostPets");
      const lostArr = rawLost ? JSON.parse(rawLost) : [];
      const filtered = lostArr.filter((p) => p.id !== pet.id);
      localStorage.setItem("lostPets", JSON.stringify(filtered));
      setLostPets(filtered);

      // 3) dispatch events for other components to refresh
      window.dispatchEvent(new Event("found-updated"));
      window.dispatchEvent(new Event("lost-updated"));

      // feedback
      setMessage("Moved to Found Pets ✅");
      setTimeout(() => setMessage(""), 3000);

      closeModal();
    } catch (err) {
      console.error(err);
      alert("Unable to mark as found. Try again.");
    }
  };

  const copyToClipboard = async (text) => {
    if (!text) return alert("No contact provided.");
    try {
      await navigator.clipboard.writeText(text);
      alert("Contact copied to clipboard.");
    } catch {
      alert("Could not copy. Please copy manually: " + text);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white">Recently Reported Lost Pets</h1>
        {message ? (
          <div className="text-sm text-black bg-[var(--brand)] px-3 py-1 rounded">{message}</div>
        ) : (
          <div className="text-sm text-[var(--muted)]">{lostPets.length} results</div>
        )}
      </header>

      {lostPets.length === 0 ? (
        <div className="py-12 text-center text-[var(--muted)] bg-[var(--black-card)] border border-[var(--border)] rounded-lg">
          No lost pets reported yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lostPets.map((pet) => (
            <article
              key={pet.id}
              onClick={() => openModal(pet)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal(pet, e)}
              className="group bg-[var(--black-card)] rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              aria-label={`View details for ${pet.petName || pet.name || pet.type || "pet"}`}
            >
              <div className="relative h-44 bg-gray-800">
                {pet.image ? (
                  <img
                    src={pet.image}
                    alt={pet.petName || pet.name || pet.type}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--muted)]">
                    No Image
                  </div>
                )}

                <div className="absolute left-3 top-3 bg-black/60 text-[var(--brand)] px-2 py-1 rounded-full text-xs font-medium shadow">
                  {pet.type || "Pet"}
                </div>

                <div className="absolute right-3 top-3 bg-black/60 text-[var(--muted)] text-xs px-2 py-0.5 rounded-full">
                  {formatDate(pet.date || pet.dateLost || pet.lostDate)}
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-white truncate">{pet.petName || pet.name || "Unknown Name"}</h2>

                <div className="text-sm text-[var(--muted)] mt-1">
                  {pet.breed || "Unknown breed"} • {pet.location || "Unknown"}
                </div>

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

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        aria-hidden
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          background: colorToHex(pet.color),
                        }}
                        className="border border-[var(--border)]"
                      />
                      <div className="text-sm text-[var(--muted)]">{pet.color || "—"}</div>
                    </div>

                    <div className="hidden sm:block text-xs text-[var(--muted)]">· Lost on: <strong className="text-white ml-1">{formatDate(pet.date || pet.dateLost || pet.lostDate)}</strong></div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(pet, e);
                    }}
                    className="text-sm px-3 py-1 rounded-md bg-[var(--brand)] text-black hover:bg-[var(--brand-dark)] transition focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                  >
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Lost pet details"
        >
          <div className="fixed inset-0 bg-black/60" onClick={closeModal} aria-hidden="true" />

          <div className="relative max-w-3xl w-full bg-[var(--black-card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gray-800">
                {selected.image ? (
                  <img src={selected.image} alt={selected.petName || selected.name || selected.type} className="w-full h-full object-cover" style={{ maxHeight: 420 }} />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-[var(--muted)] p-6">No Image</div>
                )}
              </div>

              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selected.petName || selected.name || selected.type}</h3>
                    <p className="text-sm text-[var(--muted)] mt-1">{selected.breed || "Unknown breed"} • {selected.location || "Unknown location"}</p>
                  </div>

                  <button onClick={closeModal} className="text-[var(--muted)] hover:text-white" aria-label="Close">✕</button>
                </div>

                <div className="mt-4 text-[var(--muted)] text-sm space-y-2">
                  <p><strong className="text-white">Lost Date:</strong> {formatDate(selected.date || selected.dateLost || selected.lostDate)}</p>
                  {selected.size && <p><strong className="text-white">Size:</strong> {selected.size}</p>}
                  {selected.color && (
                    <p>
                      <strong className="text-white">Color:</strong>{" "}
                      <span className="inline-flex items-center gap-2">
                        <span style={{ width: 12, height: 12, borderRadius: 6, background: colorToHex(selected.color) }} className="inline-block border border-[var(--border)]" />
                        <span>{selected.color}</span>
                      </span>
                    </p>
                  )}
                  {selected.gender && <p><strong className="text-white">Gender:</strong> {selected.gender}</p>}
                  {selected.microchipId && <p><strong className="text-white">Tag/Microchip ID:</strong> {selected.microchipId}</p>}

                  <p className="mt-3 text-[var(--muted)]">{selected.description || "No additional details."}</p>

                  {selected.contactNumber && <p className="mt-3"><strong className="text-white">Contact:</strong> <span className="text-[var(--muted)] ml-2">{selected.contactNumber}</span></p>}
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={() => { markAsFound(selected); }} className="px-4 py-2 rounded-md bg-[var(--brand)] text-black hover:bg-[var(--brand-dark)]">Add to Found</button>

                  <button onClick={() => { copyToClipboard(selected.contactNumber); }} className="px-4 py-2 rounded-md border border-[var(--border)] text-[var(--muted)]">Copy Contact</button>

                  <button onClick={closeModal} className="px-4 py-2 rounded-md border border-[var(--border)] text-[var(--muted)]">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
