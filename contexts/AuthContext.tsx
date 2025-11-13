import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  type: 'client' | 'driver';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const mockUsers: User[] = [
  {
    id: '1',
    email: 'client@example.com',
    type: 'client',
    name: 'Alex Johnson'
  },
  {
    id: '2',
    email: 'driver@example.com',
    type: 'driver',
    name: 'Maria Rodriguez'
  }
];

const MOCK_PASSWORD = 'admin1234567ate';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state (in a real app, this would check for stored tokens)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Simulate checking for stored authentication
        await new Promise(resolve => setTimeout(resolve, 100));
        // In a real app, you would check localStorage or secure storage for tokens
        setIsInitialized(true);
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Find user by email
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        return { success: false, error: 'User not found' };
      }
      
      if (password !== MOCK_PASSWORD) {
        return { success: false, error: 'Invalid password' };
      }
      
      // Allow both client and driver login
      setUser(foundUser);
      return { success: true };
      
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // In a real app, you would also clear stored tokens
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}