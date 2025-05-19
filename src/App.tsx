import React from 'react';
import './App.css';
import {AppRouter, Links} from "./router/AppRouter";

function App() {
  return (
    <div className="App">
      <div className="main">
        <AppRouter></AppRouter>
      </div>
      <div className="side">
        <Links></Links>
      </div>
    </div>
  );
}

export default App;
