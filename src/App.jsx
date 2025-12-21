import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import './index.css'
import ThemeProvider from './context/ThemeProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Birden fazla yöntem kullan - mobil uyumluluk için
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // Safari için
  }, [pathname]);

  return null;
};

// Page transition wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Animated routes component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/kurumsal" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
        <Route path="/referanslar" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/hizmetler" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/iletisim" element={<PageWrapper><ContactPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

