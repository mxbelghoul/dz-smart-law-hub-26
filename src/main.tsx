
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Font display optimization
if ('fonts' in document) {
  document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
  });
}

createRoot(document.getElementById("root")!).render(<App />);
