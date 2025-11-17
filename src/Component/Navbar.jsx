import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoPawSharp } from "react-icons/io5";   // 👉 Paw icon added

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50 
        backdrop-blur-xl 
        bg-[#FFF7ED]/70
        border-b border-orange-300/30
      "
    >
      <div
        className="
          max-w-7xl mx-auto w-[95%]
          flex items-center justify-between
          px-6 py-4
          bg-[#FFF7ED]/80
          rounded-3xl shadow-md border border-orange-200
          mt-3
        "
      >
        {/* LOGO WITH PAW ICON */}
        <Link
          to="/"
          className="
            flex items-center gap-2
            text-3xl font-extrabold text-orange-700 drop-shadow-sm 
            hover:text-orange-800 transition
          "
        >
          <IoPawSharp className="text-orange-600 text-4xl" />
          PawFinder
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-12 font-semibold">
          <Link className="text-orange-900 hover:text-orange-600 transition" to="/home">
            Home
          </Link>
          <Link className="text-orange-900 hover:text-orange-600 transition" to="/lost-pet">
            Lost Pets
          </Link>
          <Link className="text-orange-900 hover:text-orange-600 transition" to="/found-pet">
            Found Pets
          </Link>
          <Link className="text-orange-900 hover:text-orange-600 transition" to="/addpet">
            Add Pet
          </Link>
          <Link className="text-orange-900 hover:text-orange-600 transition" to="/about">
            About
          </Link>
          <Link className="text-orange-900 hover:text-orange-600 transition" to="/contact">
            Contact
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-orange-700 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div
          className="
            md:hidden 
            bg-[#FFF7ED]/95 backdrop-blur-xl 
            px-6 py-4 flex flex-col gap-4
            border-t border-orange-200
            rounded-b-2xl mx-3 mt-1 shadow-md
          "
        >
          <Link onClick={() => setOpen(false)} className="text-orange-900 text-lg" to="/home">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} className="text-orange-900 text-lg" to="/lost-pet">
            Lost Pets
          </Link>
          <Link onClick={() => setOpen(false)} className="text-orange-900 text-lg" to="/found-pet">
            Found Pets
          </Link>
          <Link onClick={() => setOpen(false)} className="text-orange-900 text-lg" to="/addpet">
            Add Pet
          </Link>
          <Link onClick={() => setOpen(false)} className="text-orange-900 text-lg" to="/about">
            About
          </Link>
          <Link onClick={() => setOpen(false)} className="text-orange-900 text-lg" to="/contact">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
