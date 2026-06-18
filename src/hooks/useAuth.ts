import { useState, useEffect } from 'react';

export type PlanType = 'Mensal' | 'Trimestral' | 'Semestral' | null;

export interface User {
  name: string;
  email: string;
  password: string;
  plan: PlanType;
  registeredAt: string;
}

const STORAGE_KEY = 'irongym_users';
const SESSION_KEY = 'irongym_session';

function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionEmail = localStorage.getItem(SESSION_KEY);
    if (sessionEmail) {
      const users = getUsers();
      const user = users.find((u) => u.email.toLowerCase() === sessionEmail.toLowerCase());
      if (user) setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const register = (name: string, email: string, password: string, plan: PlanType): { success: boolean; message: string } => {
    const users = getUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: 'Este email já está cadastrado.' };
    }

    const newUser: User = {
      name: name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase(),
      email: email.trim(),
      password,
      plan,
      registeredAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    localStorage.setItem(SESSION_KEY, email);
    return { success: true, message: 'Conta criada com sucesso!' };
  };

  const login = (email: string, password: string): { success: boolean; message: string } => {
    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, message: 'Email ou senha incorretos.' };
    }
    setCurrentUser(user);
    localStorage.setItem(SESSION_KEY, email);
    return { success: true, message: 'Login realizado com sucesso!' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updatePlan = (newPlan: PlanType) => {
    if (!currentUser) return;
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === currentUser.email);
    if (idx === -1) return;
    users[idx].plan = newPlan;
    saveUsers(users);
    setCurrentUser({ ...currentUser, plan: newPlan });
  };

  return { currentUser, loading, register, login, logout, updatePlan };
}
