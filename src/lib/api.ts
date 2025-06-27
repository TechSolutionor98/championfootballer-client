import { ApiResponse, LoginCredentials, RegisterCredentials, League as LeagueType, Match as MatchType, CreateLeagueDTO, CreateMatchDTO, UpdateMatchDTO } from '@/types/api';
import { User } from '@/types/user';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Auth API Functions
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: credentials }),
        credentials: 'include'
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.user,
        token: data.token,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  },

  register: async (credentials: RegisterCredentials): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.user,
        token: data.token,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  },

  resetPassword: async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ user: { email } }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Password reset failed');
      }

      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'An error occurred during password reset' };
    }    
  },

  getUserData: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/data`, {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user data');
      }

      return { success: true, user: data.user };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'An error occurred while fetching user data' };
    }    
  },

  logout: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      // Return success response
      return { 
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Logout failed' };
    }    
  },

  checkAuth: async (): Promise<ApiResponse<User>> => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        return {
          success: false,
          error: 'No token found'
        };
      }

      const response = await fetch(`${API_BASE_URL}/auth/data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.user,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication check failed'
      };
    }
  },
};

// Leagues API Functions
export const leagueAPI = {
  getLeagues: async (): Promise<ApiResponse<LeagueType[]>> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/leagues`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.leagues,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch leagues'
      };
    }
  },

  createLeague: async (token: string, leagueData: CreateLeagueDTO) => {
    const response = await fetch(`${API_BASE_URL}/leagues`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(leagueData),
    });
    return response.json();
  },

  joinLeague: async (token: string, inviteCode: string) => {
    const response = await fetch(`${API_BASE_URL}/leagues/join`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ inviteCode }),
    });
    return response.json();
  },
};

// Matches API Functions
export const matchAPI = {
  getMatches: async (): Promise<ApiResponse<MatchType[]>> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/matches`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Server returned ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data.matches,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch matches'
      };
    }
  },

  createMatch: async (token: string, matchData: CreateMatchDTO) => {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(matchData),
    });
    return response.json();
  },

  updateMatch: async (token: string, matchId: string, matchData: UpdateMatchDTO) => {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(matchData),
    });
    return response.json();
  },
};

// Users API Functions
export const usersAPI = {
  getUserProfile: async (token: string, userId: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.json();
  },

  updateUserProfile: async (token: string, userId: string, userData: Partial<User>) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
};

type Statistics = {
  matchesPlayed: number;
  goalsScored: number;
  assists: number;
  wins: number;
  losses: number;
  draws: number;
};

// Profile API Functions
export const profileAPI = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.user,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile'
      };
    }
  },

  updateProfile: async (userData: {
    name?: string;
    position?: string;
    style?: string;
    preferredFoot?: string;
    shirtNumber?: string;
    skills?: {
      dribbling: number;
      shooting: number;
      passing: number;
      pace: number;
      defending: number;
      physical: number;
    };
  }): Promise<ApiResponse<User>> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.user,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      };
    }
  },

  updateSkills: async (skills: {
    dribbling: number;
    shooting: number;
    passing: number;
    pace: number;
    defending: number;
    physical: number;
  }): Promise<ApiResponse<User>> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/profile/skills`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ skills })
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.user,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update skills'
      };
    }
  },

  getStatistics: async (): Promise<ApiResponse<Statistics>> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/profile/statistics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.statistics,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch statistics'
      };
    }
  },

  getLeagues: async (): Promise<ApiResponse<LeagueType[]>> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/profile/leagues`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.leagues,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch leagues'
      };
    }
  },

  getMatches: async (): Promise<ApiResponse<MatchType[]>> => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/profile/matches`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.matches,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch matches'
      };
    }
  },

  updateProfilePicture: async (imageFile: File): Promise<ApiResponse<User>> => {
    try {
      const token = Cookies.get('token');
      const formData = new FormData();
      formData.append('profilePicture', imageFile);

      const response = await fetch(`${API_BASE_URL}/profile/picture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data.user,
        error: data.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile picture'
      };
    }
  }
};

interface SkillSet {
  dribbling: number;
  shooting: number;
  passing: number;
  pace: number;
  defending: number;
  physical: number;
}

interface UpdateProfileData {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  gender: string;
  position: string;
  style: string;
  preferredFoot: string;
  password?: string;
  shirtNumber: string;
  skills: SkillSet;
}

export const updateProfile = async ( token: string , updateData: UpdateProfileData) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(`${apiUrl}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  let data;
  try {
    data = await response.json();
    console.log('first',data)
  } catch {
    data = { message: 'Invalid server response' };
  }
  return { ok: response.ok, data };
};

export async function deleteProfile(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.ok;
} 