import type { Benefit } from '../types';

/**
 * Fetches the list of all benefits from the local mock data file.
 * In a real application, this would be an API call to your backend.
 * @returns A promise that resolves to an array of Benefit objects.
 */
export const getBenefits = async (): Promise<Benefit[]> => {
  try {
    // The benefits.json file should be placed in your `public` directory
    // so it can be fetched like an API endpoint.
    const response = await fetch('/benefits.json');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: Benefit[] = await response.json();
    return data;
    
  } catch (error) {
    console.error("Error fetching benefits data:", error);
    // In a real app, you might want to handle this error more gracefully
    throw new Error("Could not fetch the benefits data.");
  }
};

// You can create a single object to export all service functions
export const benefitsService = {
  getBenefits,
};