// Import Prism core first
import Prism from 'prismjs';

// Import CSS files
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// Import clike first as it's a dependency for many languages
import 'prismjs/components/prism-clike';

// Import other languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';

// Import plugins after languages
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

// Ensure Prism is properly initialized
if (typeof window !== 'undefined') {
  // Force manual initialization if needed
  if (Prism.manual === undefined) {
    Prism.manual = true;
  }
}

export const highlightCode = (element: HTMLElement): boolean => {
  try {
    if (!Prism || !Prism.highlightElement) {
      console.warn('Prism is not properly loaded');
      return false;
    }
    
    Prism.highlightElement(element);
    return true;
  } catch (error) {
    console.error('Error highlighting code:', error);
    return false;
  }
};

export default Prism;