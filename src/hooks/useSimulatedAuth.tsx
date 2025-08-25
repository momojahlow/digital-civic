
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Types pour l'authentification simulée
export interface SimulatedUser {
  id: string;
  email: string;
  role: 'citizen' | 'agent' | 'admin';
  first_name: string;
  last_name: string;
  phone?: string;
}

interface AuthContextType {
  user: SimulatedUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

// Utilisateurs prédéfinis
const PREDEFINED_USERS: Record<string, { password: string; user: Omit<SimulatedUser, 'id'> }> = {
  'test.citizen@example.com': {
    password: 'password',
    user: {
      email: 'test.citizen@example.com',
      role: 'citizen',
      first_name: 'Marie',
      last_name: 'Diop',
      phone: '+221 77 123 45 67'
    }
  },
  'test.agent@example.com': {
    password: 'password',
    user: {
      email: 'test.agent@example.com',
      role: 'agent',
      first_name: 'Amadou',
      last_name: 'Fall',
      phone: '+221 77 234 56 78'
    }
  },
  'test.admin@example.com': {
    password: 'password',
    user: {
      email: 'test.admin@example.com',
      role: 'admin',
      first_name: 'Fatou',
      last_name: 'Sall',
      phone: '+221 77 345 67 89'
    }
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SimulatedAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SimulatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('simulatedUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        localStorage.removeItem('simulatedUser');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    // Simuler un délai d'authentification
    await new Promise(resolve => setTimeout(resolve, 500));

    const predefinedUser = PREDEFINED_USERS[email.toLowerCase()];
    
    if (predefinedUser && predefinedUser.password === password) {
      const authenticatedUser: SimulatedUser = {
        id: `user_${Date.now()}`,
        ...predefinedUser.user
      };
      
      setUser(authenticatedUser);
      localStorage.setItem('simulatedUser', JSON.stringify(authenticatedUser));
      setLoading(false);
      return { success: true };
    }

    // Vérifier dans les utilisateurs créés dynamiquement
    const storedUserData = localStorage.getItem(`user_${email.toLowerCase()}`);
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        if (userData.password === password) {
          setUser(userData.user);
          localStorage.setItem('simulatedUser', JSON.stringify(userData.user));
          setLoading(false);
          return { success: true };
        }
      } catch (error) {
        console.error('Erreur lors de la lecture des données utilisateur:', error);
      }
    }

    setLoading(false);
    return { success: false, error: 'Email ou mot de passe incorrect' };
  };

  const signUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    phone?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    // Simuler un délai d'inscription
    await new Promise(resolve => setTimeout(resolve, 500));

    // Vérifier si l'email existe déjà
    const existingUser = localStorage.getItem(`user_${email.toLowerCase()}`);
    if (existingUser || PREDEFINED_USERS[email.toLowerCase()]) {
      setLoading(false);
      return { success: false, error: 'Un compte existe déjà avec cet email' };
    }

    // Créer un nouvel utilisateur (rôle citizen par défaut)
    const newUser: SimulatedUser = {
      id: `user_${Date.now()}`,
      email: email.toLowerCase(),
      role: 'citizen',
      first_name: firstName,
      last_name: lastName,
      phone
    };

    // Sauvegarder l'utilisateur
    localStorage.setItem(`user_${email.toLowerCase()}`, JSON.stringify({
      password,
      user: newUser
    }));

    setUser(newUser);
    localStorage.setItem('simulatedUser', JSON.stringify(newUser));
    setLoading(false);
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('simulatedUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSimulatedAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSimulatedAuth must be used within a SimulatedAuthProvider');
  }
  return context;
};
