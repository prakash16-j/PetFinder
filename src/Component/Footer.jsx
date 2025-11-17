import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">

        {/* LOGO + DESCRIPTION */}
        <div>
          <h2 className="text-2xl font-bold text-white">PawFinder</h2>
          <p className="mt-2 text-sm text-gray-400">
            Helping lost pets reunite with their families. Share, search, and support local pet reunions.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-gray-400">Email</span>
            <a href="mailto:help@pawfinder.example" className="text-sm text-gray-200 hover:text-white ml-2">help@pawfinder.example</a>
          </div>
        </div>

        {/* IMPORTANT LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* SOCIAL ICONS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <p className="text-sm text-gray-400 mb-3">Join our community on social media for updates & success stories.</p>

          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PawFinder on Facebook"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
            >
              <FaFacebookF className="text-white text-sm" />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PawFinder on Twitter"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-sky-500 flex items-center justify-center transition"
            >
              <FaTwitter className="text-white text-sm" />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PawFinder on Instagram"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-500 flex items-center justify-center transition"
            >
              <FaInstagram className="text-white text-sm" />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PawFinder on YouTube"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition"
            >
              <FaYoutube className="text-white text-sm" />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PawFinder on LinkedIn"
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition"
            >
              <FaLinkedinIn className="text-white text-sm" />
            </a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} PawFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
