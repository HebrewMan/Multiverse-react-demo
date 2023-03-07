import React, { useState } from 'react';
import { ethers, Signer } from 'ethers';
import { Game as _Game } from './contracts';

import Header from './components/Header';

import Tips from './components/Tips';
import { renderRoutes, RouteConfig } from "react-router-config";
import Routers from './router';
import Arena from "./views/arena";
import Vault from "./views/vault";
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/vault">Vault</Link>
            </li>
            <li>
              <Link to="/arena">Arena</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/vault" element={<Vault />} />
          <Route path="/arena" element={<Arena />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
