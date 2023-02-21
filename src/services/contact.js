import api from './api';

export const createContact = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateContact = async (contactData) => {
  try {
    const response = await api.patch(`/contact/${contactData.id}`, contactData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteContact = async (contactId) => {
  try {
    await api.delete(`/contact/${contactId}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
