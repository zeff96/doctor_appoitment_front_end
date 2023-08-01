import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.post('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => res(ctx.status(201), ctx.json({ appointmentId: 1, ...req.body }))),
  rest.get('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => res(ctx.status(200), ctx.json([{ id: 1, time: '2023-07-26T12:00:00' }]))),
];
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
      rest.post('https://doctor-api-3dvk.onrender.com/:id/appointments', (req, res, ctx) => res(ctx.status(500), ctx.json({ error: 'Failed to create appointment' }))),
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
  it('should fetch all appointments', async () => {
    const mockAppointments = [
      { id: 1, time: '2023-07-26T12:00:00' },
      { id: 2, time: '2023-07-27T10:30:00' },
    ];
    server.use(
      rest.get('https://doctor-api-3dvk.onrender.com/appointments', (req, res, ctx) => res(ctx.status(200), ctx.json(mockAppointments))),
    );
    const response = await fetch('https://doctor-api-3dvk.onrender.com/appointments', {
      method: 'GET',
    });
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual(mockAppointments);
  });
  it('should handle error when fetching appointments', async () => {
    server.use(
      rest.get('https://doctor-api-3dvk.onrender.com/appointments', (req, res, ctx) => res(ctx.status(500), ctx.json({ error: 'Failed to fetch appointments' }))),
    );
    const response = await fetch('https://doctor-api-3dvk.onrender.com/appointments', {
      method: 'GET',
    });
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData.error).toBe('Failed to fetch appointments');
  });
});
