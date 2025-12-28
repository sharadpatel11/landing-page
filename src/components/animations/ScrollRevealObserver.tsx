import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function observeCurrentPage() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
    (el) => el.getAttribute("data-revealed") !== "true"
  );
  if (nodes.length === 0) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.setAttribute("data-revealed", "true");
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  nodes.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

export default function ScrollRevealObserver() {
  const location = useLocation();

  useEffect(() => {
    return observeCurrentPage();
  }, [location.key]);

  return null;
}

