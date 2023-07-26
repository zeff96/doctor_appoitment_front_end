import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAppointment } from '../redux/doctors/doctorSlice';

function NewAppointment() {
  const dispatch = useDispatch();

  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');

  const addAppointment = (e) => {
    e.preventDefault();

    const data = {

      doctor: document.getElementById('doctor'),
      date: document.getElementById('date'),
      city: document.getElementById('city'),
    };

    dispatch(createAppointment(data));
  };

  return (
    <div>
      <h1>Add Doctor</h1>
      <form className="add-form w-60" onSubmit={addAppointment}>
        <input
          id="doctor"
          name="doctor"
          value={doctor}
          className="form-control"
          placeholder="Add doctor"
          type="text"
          onChange={(e) => {
            setDoctor(e.target.value);
          }}
        />

        <input
          id="date"
          name="date"
          value={date}
          className="form-control"
          placeholder="Add date"
          type="text"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <input
          id="city"
          name="city"
          value={city}
          className="form-control"
          placeholder="Add city"
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <input placeholder="subimit" type="submit" />

      </form>
    </div>
  );
}

export default NewAppointment;
