import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="container-fluid">
    <div className="row main-page">
      <div className="col-4 col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xm-6" style={{ height: '100vh' }}>
        <Navbar />
        <button className="d-flex btn card align-item-end justify-content-end mb-5 mt-auto border rounded-end-5 bg-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseElement" aria-expanded="false" aria-controls="collapseElement">
          <i className="bi bi-caret-right-fill text-light" />
        </button>
      </div>
      <div className="col-6 col-xxl-9 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-xm-6 mx-auto py-6" style={{ height: '100vh' }}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
