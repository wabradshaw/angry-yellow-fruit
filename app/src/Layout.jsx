import './Layout.css';
import { Outlet, Link } from "react-router-dom";

function Layout() {  
  return (
    <div className="site-wrapper">
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
