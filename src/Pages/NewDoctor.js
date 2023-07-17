import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDoctor } from '../redux/doctors/doctorSlice';

function NewDoctor() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [amount, setAmount] = useState('');

  const implementDoctor = (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('name'),
      image: document.getElementById('image_url'),
      address: document.getElementById('address'),
    };
  };


  return (
    <div>
      <h1>Add Doctor</h1>
      <form className="add-form w-60">
        <input
          id="name"
          placeholder="name"
          value={name}
          type="text"
          className="form-control"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        
        <input
          id="image_url"
          name="image_url"
          className="form-control"
          placeholder="Add photo.."
          type="file"
        />


        <input
          id="bio"
          name="bio"
          value={bio}
          className="form-control"
          placeholder="Add photo.."
          type="text"
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />

        <input
          id="address"
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
