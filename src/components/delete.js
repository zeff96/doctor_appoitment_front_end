import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { deleteDoctor } from '../redux/doctors/doctorSlice';

const DeleteDoctor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteDoctor(id)).then((result) => {
      if (result && result.error) return;
      navigate('/doctors');
    });
  };

  const doctors = useAppSelector((state) => state.doctors.doctors) || [];

  const listDoctors = doctors.map((doctor) => (
    <li key={doctor.id} className="list-group-item d-flex justify-content-between align-items-center col-12">
      <p>{doctor.name}</p>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={(e) => {
          e.preventDefault();
          handleDelete(doctor.id);
        }}
      >
        Delete
      </button>
    </li>
  ));

  return (
    <div className="pt-5">
      {doctors && <ul className="list-group">{listDoctors}</ul>}
    </div>
  );
};

export default DeleteDoctor;
