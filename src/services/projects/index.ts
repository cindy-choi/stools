import client from '@/services/client';
import URL from '@/services/url';

export const API = {
  getAll: () => client.get(`${URL.BASE}/projects`),
};

export default API;
