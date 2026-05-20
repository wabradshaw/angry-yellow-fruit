import './Layout.css';

import { Outlet, Link, useLocation } from "react-router-dom";

function Layout() {
  const isAiPage = useLocation().pathname === '/ai';

  return (
    <div className="site-wrapper">
      <div id="header">
        <div className="header-l">
          <Link to="" className="text-lg">Home</Link>
          <div className="banner-separator"></div>
          <Link to="/play" className="text-lg">Play</Link>
          <div className="banner-separator"></div>
          <Link to="/instructions" className="text-lg">Rules</Link>
          <div className="banner-separator"></div>
          <Link to="/ai" className="text-lg">AI</Link>
          <div className="banner-separator"></div>
          <a href="https://www.wabradshaw.com/privacypolicy.html">Privacy</a>
        </div>
		  </div>
      <div className="central-wrapper">
        <div className="name">
          <div className="name-large-wrapper">
            <img className="name-large" src="/angry-yellow-fruit/name.png" alt="Angry Yellow Fruit"/>
            {isAiPage && <span className="experimental-stamp">Experimental</span>}
          </div>
          <div className="name-small-wrapper">
            <img className="name-small" src="/angry-yellow-fruit/name-long.png" alt="Angry Yellow Fruit"/>
            {isAiPage && <span className="experimental-stamp">Experimental</span>}
          </div>
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
