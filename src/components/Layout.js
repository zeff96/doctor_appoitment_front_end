import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="container-fluid">
    <div className="row main-page">
      <div className="col-3">
        <Navbar />
      </div>
      <div className="col-9 d-flex align-items-center">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
