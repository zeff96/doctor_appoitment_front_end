import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="">
    <div className="">
      <h1 className="">Doctor appointment</h1>
      <Navbar />
    </div>
    <Outlet />
  </div>
);

export default Layout;
