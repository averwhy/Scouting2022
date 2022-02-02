import './App.css';
import React, {useEffect} from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navigation from './Navigation';
import Home from './pages/Home';
import Entry from './pages/Entry';
import Matches from './pages/Matches';
import Teams from './pages/Teams';

function App() {
  useEffect(() => {
    document.title = "138 Scouting";  
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Navigation>
          <Entry />
        </Navigation>
        <Routes>
            <Route path="/home" component={Home} />
            <Route path="/entry" component={Entry} />
            <Route path="/matches" component={Matches} />
            <Route path="/teams" component={Teams} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

