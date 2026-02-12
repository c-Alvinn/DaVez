import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            login: (user) => set({ user }),
            logout: () => set({ user: null }),
            isAuthenticated: () => !!get().user,
        }),
        {
            name: 'davez-auth',
        }
    )
);
