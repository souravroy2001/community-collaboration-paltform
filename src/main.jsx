import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LogAuth from './context/LogAuth';
import ThemeAuth from './context/ThemeAuth';
import { BrowserRouter } from 'react-router';
import { Provider as ChakraUi } from './components/ui/provider';

createRoot(document.getElementById("root")).render(
  <LogAuth>
    <ThemeAuth>
      <BrowserRouter>
        <ChakraUi>
          <App />
        </ChakraUi>
      </BrowserRouter>
    </ThemeAuth>
  </LogAuth>
);
