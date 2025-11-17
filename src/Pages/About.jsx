// src/pages/About.jsx
import React from "react";
import { FaHandsHelping, FaSearch, FaHeart, FaUsers } from "react-icons/fa";
import { GiPawPrint } from "react-icons/gi";
import { MdOutlineVolunteerActivism } from "react-icons/md";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* HERO */}
      <header className="mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: "var(--brand)" }}>
              We help reunite pets with families
            </h1>
            <p className="helper mt-3 max-w-xl">
              PawFinder is a community-driven platform that helps people report, find, and reunite lost pets.
              We partner with volunteers, shelters and neighbours to amplify sightings and bring pets home faster.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="/add-lost"
                className="inline-flex items-center gap-2 btn-primary px-4 py-2 rounded-lg shadow hover:brightness-95"
              >
                <GiPawPrint className="text-black" />
                Report a Lost Pet
              </a>

              <a
                href="/contact"
                className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-[#2A2A2A] flex items-center gap-2"
              >
                <FaHandsHelping />
                Contact Us
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="form-card rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div style={{ background: "var(--brand)", color: "#000" }} className="w-12 h-12 rounded-lg flex items-center justify-center text-xl">
                  🐶
                </div>
                <div>
                  <div className="text-xs helper">Our promise</div>
                  <div className="font-semibold">Fast, compassionate help</div>
                </div>
              </div>

              <p className="helper text-sm mt-3">
                We prioritise privacy, speed and accuracy — every listing is reviewed and local volunteers receive alerts.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="form-card rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold" style={{ color: "var(--brand)" }}>1,248+</div>
          <div className="helper mt-1">Pets reunited</div>
        </div>

        <div className="form-card rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold" style={{ color: "var(--brand)" }}>560+</div>
          <div className="helper mt-1">Active volunteers</div>
        </div>

        <div className="form-card rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold" style={{ color: "var(--brand)" }}>12k+</div>
          <div className="helper mt-1">Community posts</div>
        </div>
      </section>

      {/* VALUES / FEATURES */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What we do</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="form-card rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,165,89,0.12)" }}>
              <FaSearch className="text-[var(--brand)]" />
            </div>
            <div>
              <h3 className="font-semibold">Fast searches</h3>
              <p className="helper text-sm mt-1">Easily search by location, breed, and date to spot sightings quickly.</p>
            </div>
          </div>

          <div className="form-card rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(30,167,167,0.08)" }}>
              <MdOutlineVolunteerActivism className="text-[var(--brand)]" />
            </div>
            <div>
              <h3 className="font-semibold">Volunteer network</h3>
              <p className="helper text-sm mt-1">Local volunteers help search and spread the word in nearby neighborhoods.</p>
            </div>
          </div>

          <div className="form-card rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,165,89,0.12)" }}>
              <FaHeart className="text-[var(--brand)]" />
            </div>
            <div>
              <h3 className="font-semibold">Support & resources</h3>
              <p className="helper text-sm mt-1">Guides for what to do when you find or lose a pet, plus shelter contacts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Meet the team</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Anita Sharma", role: "Founder" },
            { name: "Rohit Verma", role: "Community Lead" },
            { name: "Meera Patel", role: "Volunteer Coordinator" },
            { name: "Aditya Rao", role: "Product" },
          ].map((t) => (
            <div key={t.name} className="form-card rounded-2xl p-4 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#3a3a3a] flex items-center justify-center text-2xl mb-3">
                {/* replace with <img src=... /> if available */}
                {t.name.split(" ").map((n) => n[0]).slice(0,2).join("")}
              </div>
              <div className="font-semibold">{t.name}</div>
              <div className="helper text-sm mt-1">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="mt-8">
        <div className="form-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Ready to help reunite a pet?</h3>
            <p className="helper text-sm mt-1">Report a lost or found pet and we’ll amplify your post across our network.</p>
          </div>

          <div className="flex gap-3">
            <a href="/add-lost" className="btn-primary px-4 py-2 rounded-lg flex items-center gap-2">
              <GiPawPrint className="text-black" /> Report Lost
            </a>
            <a href="/add-found" className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-[#2A2A2A]">
              Report Found
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
