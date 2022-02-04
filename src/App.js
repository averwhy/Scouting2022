import './App.css';
import React, {useEffect} from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navigation from './Navigation';
import Entry from './pages/Entry';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import useLocalStorage from 'use-local-storage';

function App() {
  useEffect(() => {
    document.title = "138 Scouting";  
  }, []);
  /*          //Unused because i cant get dark mode to work :(
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }
  */
  return (
    <div>
      <BrowserRouter>
        <Navigation><Entry /></Navigation>
        <Routes>
            <Route exact path="/" component={Entry} />
            <Route path="/matches" component={Matches} />
            <Route path="/teams" component={Teams} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

