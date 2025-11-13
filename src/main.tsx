import { store } from '@/core/store/store.ts';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from 'next-themes';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </Provider>
);
