import React, { useState } from 'react';
import { UseSelector, useDispatch } from 'react-redux';
import { createDoctor } from '../redux/doctors/doctorSlice';

function NewDoctor() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [imageurl, setImageurl] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div>
      <h1>Add Doctor</h1>
      <form className="add-form w-60">
        <input
          placeholder="name"
          value={name}
          type="text"
          className="form-control"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          className="form-control"
          placeholder="Add photo.."
          type="text"
          value={imageurl}
          onChange={(e) => setImageurl(e.target.value)}
        />

        <input
          className="form-control"
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input placeholder="subimit" type="submit" />

      </form>
    </div>
  );
}

export default NewDoctor;
