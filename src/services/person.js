import api from './Api';
import { handleConnectionError } from './Connection';

export const getPeople = async () => {
  try {
    const response = await api.get('/person');
    return response.data;
  } catch (error) {
    handleConnectionError(error);
    return null;
  }
};

export const getPersonById = async (personId) => {
  try {
    const response = await api.get(`/person/${personId}`);
    return response.data;
  } catch (error) {
    handleConnectionError(error);
    return null;
  }
};

export const getPersonContacts = async (personId) => {
  try {
    const response = await api.get(`person/${personId}/contact/`);
    return response.data;
  } catch (error) {
    handleConnectionError(error);
    return null;
  }
};

export const createPerson = async (personData) => {
  try {
    const response = await api.post('/person', personData);
    return response.data;
  } catch (error) {
    handleConnectionError(error);
    return null;
  }
};

export const updatePerson = async (personData) => {
  try {
    const response = await api.patch(`/person/${personData.id}`, personData);
    return response.data;
  } catch (error) {
    handleConnectionError(error);
    return null;
  }
};

export const deletePerson = async (personId) => {
  try {
    await api.delete(`/person/${personId}`);
    return true;
  } catch (error) {
    handleConnectionError(error);
    return false;
  }
};
