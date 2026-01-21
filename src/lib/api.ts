const API_BASE_URL = "backen-production-be04.up.railway.app";

export interface PersonData {
  name: string;
  fatherName: string;
  phone: string;
  birthMarks?: string;
  description: string;
}

export interface CaseData {
  id: number;
  name: string;
  fatherName: string;
  phone: string;
  birthMarks?: string;
  personalInfo: string;
  image?: string;
}

export interface MatchResult {
  matchFound: boolean;
  name?: string;
  fatherName?: string;
  phone?: string;
  birthMarks?: string;
  personalInfo?: string;
  description?: string;
  cosineSimilarity?: number;
  euclideanDistance?: number;
  distance?: number;
}

export const registerPerson = async (data: PersonData, photos: File[]): Promise<{ success: boolean; person_id?: number; error?: string }> => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value || '');
  });
  
  photos.forEach(photo => {
    formData.append('photos', photo);
  });

  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Network error occurred' };
  }
};

export const getAllCases = async (): Promise<CaseData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cases`);
    if (!response.ok) throw new Error('Failed to fetch cases');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cases:', error);
    return [];
  }
};

export const matchPerson = async (photo: File): Promise<MatchResult> => {
  const formData = new FormData();
  formData.append('photo', photo);

  try {
    const response = await fetch(`${API_BASE_URL}/api/match`, {
      method: 'POST',
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    return { matchFound: false };
  }
};

export default API_BASE_URL;
