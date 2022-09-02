import React from "react";
import { Route, Routes, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profiles from "./Profiles";
import HistorySample from "./HistorySample";

const App = () => {
  return (
      <div>
          <ul>
              <li>
                  <Link to="/">홈</Link>
              </li>
              <li>
                  <Link to="/about">소개</Link>
              </li>
              <li>
                  <Link to="/profiles">프로필</Link>
              </li>
              <li>
                  <Link to="/history">History 예제</Link>
              </li>
          </ul>
          <hr />

          <Routes>
              <Route path="/" element={<Home />} />
              {["/about", "/info"].map(path => (
                  <Route
                    key = "About"
                    path={path}
                    element={<About />}
                  />
              ))}
              <Route path="/profiles/*" element={<Profiles />} />
              <Route path="/history" element={<HistorySample />} />
          </Routes>
      </div>
  );
};

export default App;