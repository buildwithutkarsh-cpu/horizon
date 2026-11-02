"use client";
import { useEffect } from "react";
// Everything here is time-driven. No cursor / scroll / click listeners.
export default function Motion() {
  useEffect(() => {
    const ld = document.getElementById("ld"), num = document.getElementById("lnum");
    document.querySelectorAll("[data-wave]").forEach((el) => {
      const t = el.textContent; el.setAttribute("aria-label", t); el.textContent = "";
      [...t].forEach((c, i) => { const s = document.createElement("span"); s.className = "ch"; s.textContent = c; s.setAttribute("aria-hidden", "true"); s.style.animationDelay = i * 0.15 + "s"; el.appendChild(s); });
    });
    const t0 = performance.now(); let raf;
    (function tk(now) {
      const p = Math.min(1, (now - t0) / 1600);
      num.textContent = Math.round(p * 100); num.style.fontWeight = 200 + p * 650;
      if (p < 1) raf = requestAnimationFrame(tk);
      else { ld.classList.add("out"); setTimeout(() => ld.remove(), 900); }
    })(t0);
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}
