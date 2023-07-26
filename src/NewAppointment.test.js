import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import renderWithproviders from './utils/utils';
import Doctors from './components/Doctors';
import Details from './components/Details';
const handlers = [
  rest.get('https://doctor-api-3dvk.onrender.com/doctors', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      { id: 1, name: 'doc1', image: 'www.imageexample.com' },
      { id: 2, name: 'doc2', image: 'www.imageexample.com' },
      { id: 3, name: 'doc3', image: 'www.imageexample.com' },
    ]),
  )),
  rest.get('https://doctor-api-3dvk.onrender.com/doctors/:id', (req, res, ctx) => res(ctx.status(200), ctx.json({ id: 1, name: 'doc1', bio: 'doc from kenya' }))),
  rest.post('https://doctor-api-3dvk.onrender.com/doctors', (req, res, ctx) => {
    const { name, bio, image } = req.body;
    return (
      res(ctx.status(201), ctx.json({
        id: 1, name, bio, image,
      }))
    );
  }),
  rest.delete('https://doctor-api-3dvk.onrender.com/doctors/:id', (req, res, ctx) => {
    const { id } = req.params;
    return (
      res(
        ctx.status(200),
        ctx.json({ message: `Doctor with ID ${id} deleted successfully` }),
      )
    );
  }),
  rest.post('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ appointmentId: 1, ...req.body }));
  }),
  rest.get('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1, time: '2023-07-26T12:00:00' }]));
  }),
];
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('Doctors components', () => {
  it('should render the page header', () => {
    renderWithproviders(<Doctors />);
    expect(screen.getByText(/qualified doctor/i)).toBeInTheDocument();
  });
  it('should render all doctors after sometime', async () => {
    renderWithproviders(
      <Doctors />,
    );
    expect(await screen.findByText(/doc2/i)).toBeInTheDocument();
  });
});
describe('Doctors Details components', () => {
  it('should display doctor details after sometime', async () => {
    renderWithproviders(
      <Details />,
    );
    expect(await screen.findByText(/doc from kenya/i)).toBeInTheDocument();
  });
});
describe('Doctors POST endpoint', () => {
  it('should create a new doctor', async () => {
    const newDoctorData = {
      name: 'Dr. John Doe',
      bio: 'Experienced doctor with expertise in various fields.',
      image: 'www.example.com/doctor.jpg',
    };
    const response = await fetch('https://doctor-api-3dvk.onrender.com/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDoctorData),
    });
    expect(response.status).toBe(201);
    const responseData = await response.json();
    expect(responseData).toEqual({
      id: 1,
      name: 'Dr. John Doe',
      bio: 'Experienced doctor with expertise in various fields.',
      image: 'www.example.com/doctor.jpg',
    });
  });
  it('should handle error when creating a new doctor', async () => {
    const newDoctorData = {
      name: 'Dr. John Doe',
      bio: 'Experienced doctor with expertise in various fields.',
      image: 'www.example.com/doctor.jpg',
    };
    server.use(
      rest.post('https://doctor-api-3dvk.onrender.com/doctors', (req, res, ctx) => res(
        ctx.status(500),
        ctx.json({ error: 'Failed to create doctor' }),
      )),
    );
    const response = await fetch('https://doctor-api-3dvk.onrender.com/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDoctorData),
    });
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData.error).toBe('Failed to create doctor');
  });
});
describe('Doctors DELETE endpoint', () => {
  it('should delete a doctor by ID', async () => {
    const doctorIdToDelete = 1;
    const response = await fetch(`https://doctor-api-3dvk.onrender.com/doctors/${doctorIdToDelete}`, {
      method: 'DELETE',
    });
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData.message).toBe(`Doctor with ID ${doctorIdToDelete} deleted successfully`);
  });
  it('should handle error when deleting a doctor by ID', async () => {
    const doctorIdToDelete = 1;
    server.use(
      rest.delete('https://doctor-api-3dvk.onrender.com/doctors/:id', (req, res, ctx) => res(
        ctx.status(500),
        ctx.json({ error: `Failed to delete doctor with ID ${doctorIdToDelete}` }),
      )),
    );
    const response = await fetch(`https://doctor-api-3dvk.onrender.com/doctors/${doctorIdToDelete}`, {
      method: 'DELETE',
    });
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData.error).toBe(`Failed to delete doctor with ID ${doctorIdToDelete}`);
  });
});
describe('Appointment POST endpoint', () => {
  it('should create a new appointment', async () => {
    const newAppointmentData = {
      time: '2023-07-26T12:00:00',
      doctorId: 1,
    };
    server.use(
      rest.post('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => {
        const { time, doctorId } = req.body;
        const appointmentId = 1;
        return res(ctx.status(201), ctx.json({ appointmentId, time, doctorId }));
      }),
    );
    const response = await fetch('https://doctor-api-3dvk.onrender.com/1/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointmentData),
    });
    expect(response.status).toBe(201);
    const responseData = await response.json();
    expect(responseData).toEqual({
      appointmentId: 1,
      time: '2023-07-26T12:00:00',
      doctorId: 1,
    });
  });
  it('should handle error when creating a new appointment', async () => {
    const newAppointmentData = {
      time: '2023-07-26T12:00:00',
      doctorId: 1,
    };
    server.use(
      rest.post('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Failed to create appointment' }));
      }),
    );
    const response = await fetch('https://doctor-api-3dvk.onrender.com/1/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointmentData),
    });
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData.error).toBe('Failed to create appointment');
  });
});
describe('Appointments FETCH endpoint', () => {
  it('should fetch all appointments for a doctor', async () => {
    const doctorId = 1;
    const mockAppointments = [
      { id: 1, time: '2023-07-26T12:00:00' },
      { id: 2, time: '2023-07-27T10:30:00' },
    ];
    server.use(
      rest.get('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockAppointments));
      }),
    );
    const response = await fetch(`https://doctor-api-3dvk.onrender.com/${doctorId}/appointments`, {
      method: 'GET',
    });
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual(mockAppointments);
  });
  it('should handle error when fetching appointments', async () => {
    const doctorId = 1;
    server.use(
      rest.get('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Failed to fetch appointments' }));
      }),
    );
    const response = await fetch(`https://doctor-api-3dvk.onrender.com/${doctorId}/appointments`, {
      method: 'GET',
    });
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData.error).toBe('Failed to fetch appointments');
  });
});