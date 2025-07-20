// // api.js or endpoints.js
// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/'; // Replace with your actual base URL

// const request = (method, endpoint, data = {}) => {
//   return axios({
//     method,
//     url: `${BASE_URL}${endpoint}`,
//     data,
//   });
// };

// // Bookings API
// export const createBooking = (data) => request('post', 'booking/create-booking', data);
// export const updateBooking = (data) => request('put', '/booking/update-booking', data);
// export const getBookings = () => request('get', 'booking/get-all-bookings');
// export const deleteBookingById = (id) => request('delete', `booking/delete-bookings/${id}`);
// export const deleteAllBookings = () => request('delete', '/booking/delete-all-bookings');

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

// Bookings API
export const createBooking = (data) => request('post', 'booking/create-booking', data);
export const getBookings = () => request('get', 'booking/get-all-bookings');
export const getBookingById = (id) => request('get', `booking/get-booking/${id}`);
export const updateBookingStatus = (id, status) => request('put', `booking/update-booking-status/${id}`, { status });
export const deleteBookingById = (id) => request('delete', `booking/delete-bookings/${id}`);
export const deleteAllBookings = () => request('delete', 'booking/delete-all-bookings');

// Services API
export const createService = (data) => request('post', 'service/create-service', data);
export const getServices = () => request('get', 'service/get-all-services');
export const getServiceById = (id) => request('get', `service/get-service/${id}`);
export const updateService = (id, data) => request('put', `service/update-service/${id}`, data);
export const deleteServiceById = (id) => request('delete', `service/delete-service/${id}`);
export const deleteAllServices = () => request('delete', 'service/delete-all-service');

// Auth API (Google Auth)
export const loginWithGoogle = () => {
  window.location.href = `${BASE_URL}auth/google`;
};

export const logout = async () => {
  try {
    const response = await request('get', 'auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout error', error);
    throw error;
  }
};

// User API (if needed, based on your commented-out routes)
export const registerUser = (data) => request('post', 'auth/register', data);
export const loginUser = (data) => request('post', 'auth/login', data);
export const getAllUsers = () => request('get', 'auth/get-all-users');
export const getUserById = (id) => request('get', `auth/get-user/${id}`);
export const updateUser = (id, data) => request('put', `auth/update-user/${id}`, data);
export const deleteUser = (id) => request('delete', `auth/delete-user/${id}`);
