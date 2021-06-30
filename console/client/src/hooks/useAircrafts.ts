import { useAircraftApi } from "../api/useAircraftApi";

export const useAircrafts = () => {
  const {
    fetchActiveAircrafts
  } = useAircraftApi();

  const updateAircrafts = async () => {
    const aircrafts = await fetchActiveAircrafts();
  }

  return {
    updateAircrafts
  }
}