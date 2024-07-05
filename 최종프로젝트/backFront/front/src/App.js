import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import MyComponent from './components/main';
import Menu from './components/menu'; // Menu 컴포넌트의 경로가 올바른지 확인하세요.
import Login from './components/login';
import Input from './components/input';
import Mystyle from './components/mystlye';
import Mybrand from './components/mybrand';
import Wishlist from './components/wishlist';
import Search from './components/search';
import SearchBrand from './components/searchbrand';
import Brand from './components/brand';
import Result from './components/result';


function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<MyComponent />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path='/input' element={<Input />} />
          <Route path='/mystyle' element={<Mystyle />} />
          <Route path='/mybrand' element={<Mybrand />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/search' element={<Search />} />
          <Route path='/searchbrand' element={<SearchBrand />} />
          <Route path='/brand/:brandId' element={<Brand />} />
          <Route path="/result/:itemId" element={<Result />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
