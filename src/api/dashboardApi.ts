import apiClient from '../utils/apiClient';

export async function fetchDashboardData() {
  try {
    const response = await apiClient.get('/dashboard');
    return response.data;
  } catch (error) {
    throw error;
  }
}
