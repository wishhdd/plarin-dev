import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

import HousesPage from './pages/housesPage/housesPage'
import FavouritesPage from './pages/favouritesPage/favouritesPage';
import HeadPanel from './components/headPanel/headPanel';

const App: React.FC  = () => (

  <BrowserRouter  basename={"/GoThouses"}>
  <div className='header_fixed'>
    <HeadPanel />
    </div>
    <Routes>
    <Route path='/*' element={<HousesPage />}/>
    <Route path='/favourites' element={<FavouritesPage />}/>
    </Routes>
    </BrowserRouter>

);

export default App;
