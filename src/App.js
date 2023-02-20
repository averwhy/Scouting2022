import './App.css';
import React, {useEffect} from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navigation from './Navigation';
import Entry from './pages/Entry';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Test from './pages/Test';
import Submitted from './pages/Submitted';
// import PitEntry from './pages/PitEntry'
// import PitViewer from './pages/PitViewer';
// deprecated ^^

function App() {
  useEffect(() => {
    document.title = "131 Scouting"; }, []);
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
            <Route exact path="/" element={<Entry/>} />
            {/* <Route path="/pitentry" element={<PitEntry/>} />
            <Route path="/pitdata" element={<PitViewer/>} /> */}
            <Route path="/matches" element={<Matches/>} />
            <Route path="/teams" element={<Teams/>} />
            <Route path="/test" element={<Test/>} />
            <Route path="/submitted" element={<Submitted/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

