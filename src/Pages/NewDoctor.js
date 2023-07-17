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
  const [zipcode, setZipcode] = useState('');
  const [amount, setAmount] = useState('');

  const implementDoctor = (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('name'),
      image: document.getElementById('image_url'),
      address: document.getElementById('address'),
      facebook: document.getElementById('facebook'),
      bio: document.getElementById('bio'),
      city: document.getElementById('city'),
      state: document.getElementById('state'),
      zipcode: document.getElementById('zipcode'),
      amount:  document.getElementById('amount'),
      instagram:  document.getElementById('instagram'),
      twitter :  document.getElementById('twitter'),
      address : document.getElementById('address'),
    };

    dispatch(createDoctor(data))
  };

  return (
    <div>
      <h1>Add Doctor</h1>
      <form className="add-form w-60" onSubmit={implementDoctor}>
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
          id="facebook"
          name="facebook"
          value={facebook}
          className="form-control"
          placeholder="Add facebook link.."
          type="text"
          onChange={(e) => {
            setFacebook(e.target.value);
          }}
        />

        <input
          id="bio"
          name="bio"
          value={bio}
          className="form-control"
          placeholder="Add bio"
          type="text"
          onChange={(e) => {
            setBio(e.target.value);
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

        <input
          id="state"
          name="state"
          value={state}
          className="form-control"
          placeholder="Add state"
          type="text"
          onChange={(e) => {
            setState(e.target.value);
          }}
        />

        <input
          id="zipcode"
          name="zipcode"
          value={zipcode}
          className="form-control"
          placeholder="Add zipcode"
          type="text"
          onChange={(e) => {
            setZipcode(e.target.value);
          }}
        />

        <input
          id="amount"
          name="amount"
          value={amount}
          className="form-control"
          placeholder="amount $$"
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />

        <input
          id="instagram"
          name="instagram"
          value={instagram}
          className="form-control"
          placeholder="Add instagram"
          type="text"
          onChange={(e) => {
            setInstagram(e.target.value);
          }}
        />

        <input
          id="twitter"
          name="twitter"
          value={twitter}
          className="form-control"
          placeholder="Add twitter link.."
          type="text"
          onChange={(e) => {
            setTwitter(e.target.value);
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
