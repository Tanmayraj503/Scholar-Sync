import { useState, useEffect, lazy, Suspense } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
const ScrollToTop = lazy(() => import('./components/ScrollToTopButton'))
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('./components/Home'))
const About = lazy(() => import('./Pages/About'))
const Contact = lazy(() => import('./Pages/Contact'))
import { SearchProvider } from './components/SearchContext'
import Loader from './components/Loader'

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <SearchProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="About" element={<About />} />
              <Route path="Contact" element={<Contact />} />
            </Routes>
          </SearchProvider>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
