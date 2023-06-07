import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import ProductAdd from './components/ProductAdd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductUpdate from './components/ProductUpdate';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <h1 className='alert alert-info mb-3'>GrosMart Store</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='product/list' element={<ProductList />}></Route>
          <Route path='product/addproduct' element={<ProductAdd />}></Route>
          <Route path='product/update/:id' element={<ProductUpdate />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
