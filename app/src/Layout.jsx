import './Layout.css';

import { Outlet, Link } from "react-router-dom";

function Layout() {  
  return (
    <div className="site-wrapper">
      <div id="header">
        <div class="header-l">
          <Link to="" className="text-lg">Home</Link>
          <div class="banner-separator"></div>
          <Link to="/play" className="text-lg">Play</Link>
          <div class="banner-separator"></div>
          <Link to="/instructions" className="text-lg">Rules</Link>
          <div class="banner-separator"></div>
          <a href="https://www.wabradshaw.com/privacypolicy.html">Privacy</a>
        </div>
		  </div>
      <div className="central-wrapper">
        <div className="name">
          <img className="name-large" src="/angry-yellow-fruit/name.png" alt="Angry Yellow Fruit"/>
          <img className="name-small" src="/angry-yellow-fruit/name-long.png" alt="Angry Yellow Fruit"/>
        </div>
        <div className="site-content">
          <Outlet />
        </div>
      </div>
      <div id="footer">
			  <a id="cc" href="https://wabradshaw.com">©W.A.Bradshaw</a>
		  </div>
    </div>
  );
}

export default Layout;
