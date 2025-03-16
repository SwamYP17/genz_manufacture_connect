
// Types for saved data
export interface SavedEstimation {
  id: string;
  name: string;
  description: string;
  materials: Array<{
    name: string;
    quantity: number;
    costPerUnit: number;
  }>;
  laborCost: number;
  otherCosts: number;
  profitMargin: number;
  estimatedCost: {
    min: number;
    max: number;
  };
  suggestedPrice: number;
  createdAt: string;
}

export interface UserData {
  fullName: string;
  email: string;
  interests?: string;
  createdAt: string;
}

// Save product estimation
export const saveProductEstimation = (estimation: Omit<SavedEstimation, 'id' | 'createdAt'>) => {
  try {
    // Get existing estimations
    const existingEstimations = getSavedEstimations();
    
    // Create new estimation with ID and timestamp
    const newEstimation: SavedEstimation = {
      ...estimation,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    localStorage.setItem('savedEstimations', JSON.stringify([
      ...existingEstimations,
      newEstimation
    ]));
    
    return newEstimation;
  } catch (error) {
    console.error('Error saving estimation:', error);
    return null;
  }
};

// Get saved estimations
export const getSavedEstimations = (): SavedEstimation[] => {
  try {
    const savedData = localStorage.getItem('savedEstimations');
    return savedData ? JSON.parse(savedData) : [];
  } catch (error) {
    console.error('Error retrieving estimations:', error);
    return [];
  }
};

// Delete estimation
export const deleteEstimation = (id: string): boolean => {
  try {
    const estimations = getSavedEstimations();
    const updatedEstimations = estimations.filter(est => est.id !== id);
    localStorage.setItem('savedEstimations', JSON.stringify(updatedEstimations));
    return true;
  } catch (error) {
    console.error('Error deleting estimation:', error);
    return false;
  }
};

// Get registered users
export const getRegisteredUsers = (): UserData[] => {
  try {
    const userData = localStorage.getItem('registeredUsers');
    return userData ? JSON.parse(userData) : [];
  } catch (error) {
    console.error('Error retrieving users:', error);
    return [];
  }
};

// Helper function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
