import { Routes, Route, Navigate } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import AllGuitars from './pages/AllGuitars';
import Detail from './pages/Detail';

import a from './App.module.css';

function App() {

  return (
    
    <div className={a.app}>
      <Header />

      <Routes>
        <Route path="/" element={<AllGuitars />} />
        <Route path="/guitars" element={<Navigate to="/" />} />
        <Route path="/guitars/:id" element={<Detail />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App;
