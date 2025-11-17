import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>

      {/* ================= HERO / BANNER SECTION ================= */}
      <section className="bg-orange-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 items-center gap-10">

          {/* LEFT TEXT SECTION */}
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Find Your Furry Friend — <br />
              <span className="text-orange-600">
                Help Reunite Lost Pets
              </span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Report lost or found pets and help reunite families.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Link
                to="/lost-pet"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-orange-700 transition"
              >
                Report Lost Pet
              </Link>

              <Link
                to="/addfound"
                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-100 transition"
              >
                Report Found Pet
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="w-full flex justify-center">
            <img
              src="/homeimg.webp"
              alt="Pets Banner"
              className="rounded-xl shadow-lg w-full h-[300px] md:h-[380px] object-cover"
            />
          </div>

        </div>
      </section>
      {/* ================= END HERO SECTION ================= */}

    </div>
  );
};

export default Home;
