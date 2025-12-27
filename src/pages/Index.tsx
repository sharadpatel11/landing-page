
import { useEffect } from 'react';
import { useUiMode } from "@/theme/ui-mode";
import IndexClassic from "@/pages/index/IndexClassic";
import IndexModern from "@/pages/index/IndexModern";

const Index = () => {
  const { mode } = useUiMode();

  useEffect(() => {
    // Immediately scroll to top without smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // No smooth scrolling on page load
    });
    
    // Re-enable smooth scrolling after a brief delay
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return mode === "classic" ? <IndexClassic /> : <IndexModern />;
};

export default Index;
