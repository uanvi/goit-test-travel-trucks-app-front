import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CamperDetailsPage from './pages/CamperDetailsPage/CamperDetailsPage';
import './App.css';

const App = () => {
  const location = useLocation();
  const isCatalogPage = location.pathname.startsWith('/catalog');

  return (
    <div className="app">
      <Header />
      <main className={`main-content ${isCatalogPage ? 'catalog' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
