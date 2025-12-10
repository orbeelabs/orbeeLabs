// Mock do useToast hook
export const mockToast = {
  toast: jest.fn(),
};

// Mock do módulo use-toast
jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => mockToast,
}));

