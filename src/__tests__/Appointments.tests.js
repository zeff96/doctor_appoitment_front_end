import React from 'react';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Appointments from '../components/Appointments';
import renderWithProviders from '../utils/utils';

const BASE_URL = 'https://doctor-api-3dvk.onrender.com';

const handlers = [
  rest.get(`${BASE_URL}/appointments`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      { id: 1, doctor: 'Dr. Smith', date: '2023-07-26' },
      { id: 2, doctor: 'Dr. Johnson', date: '2023-07-27' },
    ]),
  )),
  rest.get(`${BASE_URL}/appointments/:id`, (req, res, ctx) => res(ctx.status(200), ctx.json({ id: 1, doctor: 'Dr. Smith', date: '2023-07-26' }))),
  rest.post(`${BASE_URL}/appointments`, (req, res, ctx) => {
    const { doctor, date } = req.body;
    return (
      res(ctx.status(201), ctx.json({
        id: 1, doctor, date,
      }))
    );
  }),
  rest.delete(`${BASE_URL}/appointments/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return (
      res(
        ctx.status(200),
        ctx.json({ message: `Appointment with ID ${id} deleted successfully` }),
      )
    );
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Appointments component', () => {
  it('renders appointments correctly', async () => {
    renderWithProviders(<Appointments />);
    expect(await screen.findByText(/Dr. Smith/i)).toBeInTheDocument();
    expect(await screen.findByText(/Dr. Johnson/i)).toBeInTheDocument();
  });
});
describe('Appointments POST endpoint', () => {
  it('should create a new appointment', async () => {
    const newAppointmentData = {
      doctor: 'Dr. Smith',
      date: '2023-07-26',
    };
    const response = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointmentData),
    });
    expect(response.status).toBe(201);
    const responseData = await response.json();
    expect(responseData).toEqual({
      id: 1,
      doctor: 'Dr. Smith',
      date: '2023-07-26',
    });
  });
  it('should handle error when creating a new appointment', async () => {
    const newAppointmentData = {
      doctor: 'Dr. Smith',
      date: '2023-07-26',
    };
    server.use(
      rest.post(`${BASE_URL}/appointments`, (req, res, ctx) => res(
        ctx.status(500),
        ctx.json({ error: 'Failed to create appointment' }),
      )),
    );
    const response = await fetch(`${BASE_URL}/appointments`, {
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
describe('Appointments DELETE endpoint', () => {
  it('should delete an appointment', async () => {
    const appointmentId = 1;
    const response = await fetch(`${BASE_URL}/appointments/${appointmentId}`, {
      method: 'DELETE',
    });
    expect(response.status).toBe(200);
    const responseData = await response.json();
    expect(responseData).toEqual({ message: `Appointment with ID ${appointmentId} deleted successfully` });
  });
  it('should handle error when deleting an appointment', async () => {
    const appointmentId = 1;
    server.use(
      rest.delete(`${BASE_URL}/appointments/:id`, (req, res, ctx) => res(
        ctx.status(500),
        ctx.json({ error: 'Failed to delete appointment' }),
      )),
    );
    const response = await fetch(`${BASE_URL}/appointments/${appointmentId}`, {
      method: 'DELETE',
    });
    expect(response.status).toBe(500);
    const responseData = await response.json();
    expect(responseData.error).toBe('Failed to delete appointment');
  });
});
