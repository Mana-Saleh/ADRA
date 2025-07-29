import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of the user object
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define the shape of the store's state and actions
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

// Create the store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,

      // Action to perform on login
      login: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
      },

      // Action to perform on logout
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      
      // Action to check authentication status when the app loads
      checkAuth: () => {
        // This function is called to sync the isAuthenticated flag
        // with the presence of a token and user from localStorage.
        const { token, user } = get();
        if (token && user) {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
      }
    }),
    {
      name: 'auth-storage', // The key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

// This line is crucial. It ensures that on every app load, the store
// checks localStorage and updates the `isAuthenticated` flag accordingly.
useAuthStore.getState().checkAuth();
