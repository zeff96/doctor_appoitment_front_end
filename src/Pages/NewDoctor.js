import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDoctor } from '../redux/doctors/doctorSlice';

function NewDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const implementDoctor = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('doctor[name]', e.target.name.value);
    formData.append('doctor[bio]', e.target.bio.value);
    formData.append('doctor[image]', e.target.image.value);

    formData.append('doctor[location_attributes][address]', e.target.address.value);
    formData.append('doctor[location_attributes][city]', e.target.city.value);
    formData.append('doctor[location_attributes][state]', e.target.state.value);
    formData.append('doctor[location_attributes][zip_code]', e.target.zip_code.value);

    formData.append('doctor[social_medium_attributes][facebook]', e.target.facebook.value);
    formData.append('doctor[social_medium_attributes][twitter]', e.target.twitter.value);
    formData.append('doctor[social_medium_attributes][instagram]', e.target.instagram.value);

    formData.append('doctor[payment_attributes][consultation_fee]', e.target.consultation_fee.value);

    dispatch(createDoctor(formData)).then((result) => {
      if (result && result.error) return;
      navigate('/doctors');
    });
    e.target.reset();
  };

  return (
    <div>
      <h1>Add Doctor</h1>
      <form onSubmit={implementDoctor}>
        <input
          id="name"
          placeholder="name"
          type="text"
          name="name"
          className="form-control mb-3"
          required
          autoComplete="name"
          autoCapitalize="true"
        />

        <input
          id="bio"
          name="bio"
          className="form-control mb-3"
          placeholder="Add bio"
          type="text"
          required
          autoComplete="bio"
          autoCapitalize="true"
        />

        <input
          id="image"
          name="image"
          className="form-control mb-3"
          placeholder="Add photo.."
          type="text"
          required
          autoComplete="off"
        />

        <h5>Social media</h5>

        <input
          id="facebook"
          name="facebook"
          className="form-control mb-3"
          placeholder="Add facebook link.."
          type="text"
          required
          autoComplete="facebook"
        />

        <input
          id="twitter"
          name="twitter"
          className="form-control mb-3"
          placeholder="Add twitter link.."
          type="text"
          required
          autoComplete="twitter"
        />

        <input
          id="instagram"
          name="instagram"
          className="form-control mb-3"
          placeholder="Add instagram"
          type="text"
          required
          autoComplete="instagram"
        />

        <h5>Location</h5>

        <input
          id="address"
          name="address"
          className="form-control mb-3"
          placeholder="Address"
          type="text"
          required
          autoComplete="address"
          autoCapitalize="true"
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

        <input
          id="state"
          name="state"
          className="form-control mb-3"
          placeholder="Add state"
          type="text"
          required
          autoComplete="state"
          autoCapitalize="true"
        />

        <input
          id="zip_code"
          name="zip_code"
          className="form-control mb-3"
          placeholder="Add zipcode"
          type="number"
          required
        />

        <h5>Payment</h5>

        <input
          id="consultation_fee"
          name="consultation_fee"
          className="form-control mb-3"
          placeholder="amount $$"
          type="number"
          required
        />

        <button type="submit" className="btn btn-primary">Create doctor</button>

      </form>
    </div>
  );
}

export default NewDoctor;
