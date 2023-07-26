import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from '../redux/doctors/doctorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

function NewAppointment() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const userData = useAppSelector((state) => state.user.userData);
  // const user = JSON.parse(userData.user);
  const doctors = useAppSelector((state) => state.doctors.doctors);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const formRef = useRef();

  const handleDoctorChange = (event) => {
    setSelectedDoctorId(event.target.value);
  };

  const implementAppointment = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = {
      id: selectedDoctorId,
      appointment: {
        date: formData.get('date'),
        city: formData.get('city'),
        doctor_id: selectedDoctorId,
      },
    };

    dispatch(createAppointment(data)).then((result) => {
      if (result && result.error) return;
      navigate('/doctors');
    });
    e.target.reset();
  };

  return (
    <div className="pt-5">
      <h1 className="text-center mb-3">Add Appointment</h1>
      <form onSubmit={implementAppointment} ref={formRef}>
        <select value={selectedDoctorId} onChange={handleDoctorChange} required className="form-select mb-3">
          <option defaultValue="Select a Doctor">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        <input
          id="date"
          name="date"
          className="form-control mb-3"
          placeholder="Add date"
          type="date"
          required
          autoComplete="off"
        />

        <input
          id="city"
          name="city"
          className="form-control mb-3"
          placeholder="Add city"
          type="text"
          required
          autoComplete="city"
          autoCapitalize="true"
        />
        <button type="submit" className="btn btn-primary">Create Appointment</button>

      </form>
    </div>
  );
}

export default NewAppointment;
