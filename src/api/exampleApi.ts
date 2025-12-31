// Example usage of the global API client
import apiClient from '../utils/apiClient';

export async function fetchExampleData() {
  try {
    const response = await apiClient.get('/example');
    return response.data;
  } catch (error) {
    // Error is already handled globally, but you can add local handling if needed
    throw error;
  }
}
