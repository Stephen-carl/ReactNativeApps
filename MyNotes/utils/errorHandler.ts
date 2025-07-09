import axios from 'axios';

// helps me handle errors gracefully
export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const status = error.response.status;
      if (status >= 400 && status < 500) {
        return `${error.response.data?.message || 'Invalid request.'}`;
      } else if (status >= 500) {
        return `${error.response.data?.message}`//'Server error. Please try again later.';
      }
    }
    return error.message;
  }
  return 'An unexpected error occurred.';
}