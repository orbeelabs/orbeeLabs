import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  // Navigation state
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  
  // Theme state
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Loading state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Contact form state
  contactForm: {
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    revenue: string;
    objective: string;
    challenge: string;
  };
  setContactForm: (form: Partial<AppState['contactForm']>) => void;
  resetContactForm: () => void;
}

const initialContactForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  revenue: '',
  objective: '',
  challenge: '',
};

export const useStore = create<AppState>()(
  devtools(
    (set) => ({
      // Navigation
      isMenuOpen: false,
      setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
      
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      // Loading
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      
      // Contact form
      contactForm: initialContactForm,
      setContactForm: (form) => 
        set((state) => ({ 
          contactForm: { ...state.contactForm, ...form } 
        })),
      resetContactForm: () => set({ contactForm: initialContactForm }),
    }),
    {
      name: 'orbee-labs-store',
    }
  )
);

