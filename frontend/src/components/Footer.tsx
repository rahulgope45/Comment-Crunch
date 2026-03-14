import React from 'react';
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";


const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full overflow-hidden "
      style={{
        backgroundColor: "#8e7e7e",
        fontFamily: "'EB Garamond', 'Garamond', 'Times New Roman', serif",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Top section */}
      <div className="flex justify-end px-10 pt-8">
        <div className="flex flex-col items-end gap-3">
          <span
            className="text-white text-lg tracking-wide"
            style={{ fontFamily: "'EB Garamond', Garamond, serif" }}
          >
            Connect With Us
          </span>
          <div className="flex gap-2">
            <a
              href="#"
              className="flex items-center justify-center w-9 h-9 rounded border border-white/40 bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FaXTwitter className="text-white text-base" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-9 h-9 rounded border border-white/40 bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FaLinkedinIn className="text-white text-base" />
            </a>
          </div>
        </div>
      </div>

      {/* Comment label */}
      <div className="px-10 mt-16 mb-0">
        <span
          className="text-white font-bold text-base text-[30px] tracking-wide"
          style={{ fontFamily: "'EB Garamond', Garamond, serif" }}
        >
          Comment
        </span>
      </div>

      {/* CRUNCH — cut off at bottom, no spacing below */}
      <div
        className="leading-none select-none"
        style={{
          fontSize: "clamp(100px, 22vw, 220px)",
          color: "white",
          fontFamily: "'EB Garamond', Garamond, 'Times New Roman', serif",
          fontWeight: 700,
          lineHeight: 0.82,
          paddingLeft: "0.12em",
          marginBottom: "-0.18em",
          letterSpacing: "-0.01em",
        }}
      >
        CRUNCH
      </div>
    </footer>
  );
};

export default Footer;