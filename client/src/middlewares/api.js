// api.js or endpoints.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/'; // Replace with your actual base URL

const request = (method, endpoint, data = {}) => {
  return axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
  });
};

export const createBooking = (data) => request('post', 'booking/create-booking', data);
export const updateBooking = (data) => request('put', '/booking/update-booking', data);
export const getBookings = () => request('get', 'booking/get-all-bookings');
export const deleteBookingById = (id) => request('delete', `booking/delete-bookings/${id}`);
export const deleteAllBookings = () => request('delete', '/booking/delete-all-bookings');
