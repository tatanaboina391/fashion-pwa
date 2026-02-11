import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryListing from './pages/CategoryListing';
import Customize from './pages/Customize';
import SareeTypeSelection from './pages/SareeTypeSelection';
import SareePencilSketch from './pages/SareePencilSketch';
import SareeGeneratedPreview from './pages/SareeGeneratedPreview';
import SareeColorCustomization from './pages/SareeColorCustomization';
import Saree360View from './pages/Saree360View';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:categoryId" element={<CategoryListing />} />
          <Route path="/category/:categoryId/customize/:itemId" element={<Customize />} />
          {/* Saree Customization Flow */}
          <Route path="/saree/select" element={<SareeTypeSelection />} />
          <Route path="/saree/sketch" element={<SareePencilSketch />} />
          <Route path="/saree/preview" element={<SareeGeneratedPreview />} />
          <Route path="/saree/customize" element={<SareeColorCustomization />} />
          <Route path="/saree/360-view" element={<Saree360View />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
