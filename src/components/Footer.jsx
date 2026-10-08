

import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";




export default function Footer() {
  return (
    <footer className="mt-20 bg-[#1F1A1B] text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-[#D9A5B3]">
            LIBAS
          </h2>

          <p className="max-w-sm text-sm leading-7 text-gray-300">
            Discover elegant fashion for women, men and kids.
            Quality styles designed for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 font-semibold text-white">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm">

            <Link
              href="/"
              className="w-fit text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A5B3]"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="w-fit text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A5B3]"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="w-fit text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A5B3]"
            >
              Contact Us
            </Link>

            <Link
              href="/track-order"
              className="w-fit text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A5B3]"
            >
              Track Order
            </Link>

            <Link
              href="/cart"
              className="w-fit text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A5B3]"
            >
              Cart
            </Link>

          </div>
        </div>

        {/* Collections */}
        <div>
          <h3 className="mb-5 font-semibold text-white">
            Collections
          </h3>

          <div className="flex flex-col gap-3 text-sm">

            <Link
              href="/collections/female"
              className="w-fit text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A5B3]"
            >
              Female
            </Link>

            <Link
              href="/collections/male"
              className="w-fit text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A5B3]"
            >
              Male
            </Link>

            <Link
              href="/collections/kids"
              className="w-fit text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A5B3]"
            >
              Kids
            </Link>

          </div>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="mb-5 font-semibold text-white">
            Follow Us
          </h3>

          {/* Social Icons */}
          <div className="flex items-center gap-3">

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A5B3] hover:bg-[#D9A5B3] hover:text-[#1F1A1B]"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A5B3] hover:bg-[#D9A5B3] hover:text-[#1F1A1B]"
            >
              <FaTiktok size={17} />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#D9A5B3] hover:bg-[#D9A5B3] hover:text-[#1F1A1B]"
            >
              <FaFacebookF size={17} />
            </a>

          </div>

          {/* Location */}
          <p className="mt-6 text-sm text-gray-400">
            📍 Islamabad, Pakistan
          </p>

          {/* Email */}
          <p className="mt-2 text-sm text-gray-400">
            ✉️ support@libas.com
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
        © 2026 Libas. All rights reserved.
      </div>

    </footer>
  );
}

