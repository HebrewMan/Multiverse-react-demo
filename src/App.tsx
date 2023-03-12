import React, { useState } from 'react';
import Routers from './router';
import Tips from './components/Tips';
import Header from './components/Header';
import { Watermark } from 'antd';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {MyContext} from "./components/store"
export default function App() {
  const [milk, setMilk] = useState(0);
  
  return (
    <BrowserRouter>
    <MyContext.Provider value={{ milk, setMilk }}>
      <Header />
      <Watermark content="HebrewMan">
      <Routers />
      <Tips />
      </Watermark>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

