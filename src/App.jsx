import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
