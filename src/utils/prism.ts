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
  
  // Log available languages for debugging
  console.log('Prism languages loaded:', Object.keys(Prism.languages || {}));
}

export const highlightCode = (element: HTMLElement): boolean => {
  try {
    if (!element) {
      console.warn('No element provided for highlighting');
      return false;
    }

    if (!Prism) {
      console.error('Prism is not available');
      return false;
    }

    if (!Prism.highlightElement) {
      console.error('Prism.highlightElement is not available');
      return false;
    }

    // Get the language from the element's class
    const languageMatch = element.className.match(/language-(\w+)/);
    const language = languageMatch ? languageMatch[1] : null;
    
    if (language && !Prism.languages[language]) {
      console.warn(`Language '${language}' is not loaded in Prism`);
      // Still try to highlight, Prism might handle it gracefully
    }

    Prism.highlightElement(element);
    console.log(`Successfully highlighted code with language: ${language}`);
    return true;
  } catch (error) {
    console.error('Error highlighting code:', error);
    return false;
  }
};

export default Prism;