import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../redux/doctors/doctorSlice';

function NewAppointment() {
  const user = useSelector((state) => state.user.userData.user);
  const dispatch = useDispatch();
  // const [user, setUser] = useState('');
  // const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');

  const addAppointment = (e) => {
    e.preventDefault();

    const data = {
    //   user: document.getElementById('user'),
      // doctor: document.getElementById('doctor'),
      date: document.getElementById('date'),
      city: document.getElementById('city'),
    };

    dispatch(createAppointment(JSON.parse(user).id, data));
  };

  return (
    <div className="">
      <h1 className="my-5">Add Doctor</h1>
      <form className="add-form w-60" onSubmit={addAppointment}>
        {/* <input
          id="user"
          placeholder="user"
          value={user}
          type="text"
          className="form-control"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        /> */}

        {/* <input
          id="doctor"
          name="doctor"
          value={doctor}
          className="form-control"
          placeholder="Add doctor"
          type="text"
          onChange={(e) => {
            setDoctor(e.target.value);
          }}
        /> */}

        <input
          id="date"
          name="date"
          value={date}
          className="form-control my-2"
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
          className="form-control my-2"
          placeholder="Add city"
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <input className="my-2" placeholder="subimit" type="submit" />

      </form>
    </div>
  );
}

export default NewAppointment;
