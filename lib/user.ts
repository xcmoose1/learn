export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

const USER_KEY = 'learning_app_user';

export function saveUser(user: UserProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getUser(): UserProfile | null {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_KEY);
    if (userData) {
      return JSON.parse(userData);
    }
  }
  return null;
}

export function generateUserId(): string {
  return Math.random().toString(36).substr(2, 9);
}
