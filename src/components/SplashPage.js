import LoginPage from '../authentication/LoginPage';

const SplashPage = () => (
  <div className="container-fluid bg-light pt-5" style={{ height: '100vh' }}>
    <div className="row align-items-center justify-content-center p-5">
      <div className="col-sm-12 col-md-6 col-lg-4">
        <h2 className="fs-1 fw-bold text-primary">Doctor Appointment</h2>
        <p className="fs-4 fw-semi-bold">Medical Application that lets you connect with doctors</p>
      </div>
      <div className="col-md-6 col-lg-4">
        <LoginPage />
      </div>
    </div>
  </div>
);
export default SplashPage;
