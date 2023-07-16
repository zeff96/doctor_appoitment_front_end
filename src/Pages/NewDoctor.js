import React from 'react';
import { UseSelector, useDispatch } from 'react-redux';
import  { createDoctor} from '../redux/doctors/doctorSlice'

function NewDoctor() {
  return (
    <div>
      <h1>Add Doctor</h1>
      <form className='add-form w-60'>
        <input placeholder="City" type="text" />
        <input placeholder="date" type="date" />
        <input placeholder="subimit" type="submit" />
      </form>
    </div>
  );
}

export default NewDoctor;
