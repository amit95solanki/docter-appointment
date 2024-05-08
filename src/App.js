import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import Spinner from './components/Spinner';

// ----------------------------------------------------------------------

export default function App() {
  const loading = false;
  return (
    <HelmetProvider>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />

            <Router />
          </ThemeProvider>
        )}
      </BrowserRouter>
    </HelmetProvider>
  );
}
