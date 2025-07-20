import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

const request = (method, endpoint, data = {}) => {
  const token = localStorage.getItem('token');
  return axios({
    method,
    url: `${BASE_URL}${endpoint}`,
    data,
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

export const createBooking = (data) => request('post', 'booking/create-booking', data);
export const getBookings = () => request('get', 'booking/get-all-bookings');
export const getBookingById = (id) => request('get', `booking/get-booking/${id}`);
export const updateBookingStatus = (id, status) => request('put', `booking/update-booking-status/${id}`, { status });
export const updateBookingById = (id, updatedData) => request('put', `booking/update-booking/${id}`, updatedData);
export const deleteBookingById = (id) => request('delete', `booking/delete-bookings/${id}`);
export const deleteAllBookings = () => request('delete', 'booking/delete-all-bookings');

export const createService = (data) => request('post', 'service/create-service', data);
export const getServices = () => request('get', 'service/get-all-services');
export const getServiceById = (id) => request('get', `service/get-service/${id}`);
export const updateService = (id, data) => request('put', `service/update-service/${id}`, data);
export const deleteServiceById = (id) => request('delete', `service/delete-service/${id}`);
export const deleteAllServices = () => request('delete', 'service/delete-all-service');

export const registerUser = (data) => request('post', 'auth/register', data);
export const loginUser = (data) => request('post', 'auth/login', data);
export const getAllUsers = () => request('get', 'auth/get-all-users');
export const getUserById = (id) => request('get', `auth/get-user/${id}`);
export const updateUser = (id, data) => request('put', `auth/update-user/${id}`, data);
export const deleteUser = (id) => request('delete', `auth/delete-user/${id}`);

export const googleLogin = () => {
  window.location.href = `${BASE_URL}auth/google`;
};

export const logoutUser = () => request('get', 'auth/logout');
export const getCurrentUser = () => request('get', 'auth/user');
