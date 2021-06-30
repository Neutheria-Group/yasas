export const useAircraftApi = () => {
  const fetchActiveAircrafts = async () => {
    const response = await axios.get('/api/tracked-aircrafts');

    return response.data;
  }

  return {
    fetchActiveAircrafts
  }
}