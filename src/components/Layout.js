import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="container">
    <div className="row">
      <div className="col-3">
        <h1 className="">Doctor appointment</h1>
        <Navbar />
      </div>
      <div className="col-9">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
