import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="container-fluid">
    <div className="d-flex main-page">
      <div className="d-flex" style={{ maxWidth: '20vw' }}>
        <Navbar />
        <button className="btn card d-flex align-item-end justify-content-end mb-5 mt-auto border rounded-end-5 bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseElement" aria-expanded="false" aria-controls="collapseElement">
          <i className="bi bi-caret-right-fill text-light" />
        </button>
      </div>
      <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-3 mx-auto py-5" style={{ height: '100vh' }}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
