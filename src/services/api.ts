const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Program {
    id: string;
    title: string;
    description: string;
    institution: string;
    institutionId: string;
    category: string;
    level: string;
    duration: string;
    format: string;
    startDate: string;
    endDate: string;
    applicationDeadline: string;
    requirements: string[];
    benefits: string[];
    imageUrl: string;
    isActive: boolean;
}

export interface Institution {
    id: string;
    name: string;
    description: string;
    website: string;
    logoUrl: string;
    programsCount: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    interests: string[];
    level: string;
}

export interface Favorite {
    id: string;
    userId: string;
    programId: string;
    program: {
        id: string;
        title: string;
        description: string;
        institution: string;
        category: string;
        level: string;
        imageUrl: string;
    };
}

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ error: 'Request failed' }));
                throw new Error(error.error || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // Programs
    async getPrograms(): Promise<Program[]> {
        return this.request<Program[]>('/programs');
    }

    async getProgramById(id: string): Promise<Program> {
        return this.request<Program>(`/programs/${id}`);
    }

    async createProgram(data: Partial<Program>): Promise<Program> {
        return this.request<Program>('/programs', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateProgram(id: string, data: Partial<Program>): Promise<Program> {
        return this.request<Program>(`/programs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteProgram(id: string): Promise<{ message: string }> {
        return this.request<{ message: string }>(`/programs/${id}`, {
            method: 'DELETE',
        });
    }

    // Institutions
    async getInstitutions(): Promise<Institution[]> {
        return this.request<Institution[]>('/institutions');
    }

    async getInstitutionById(id: string): Promise<Institution> {
        return this.request<Institution>(`/institutions/${id}`);
    }

    async createInstitution(data: Partial<Institution>): Promise<Institution> {
        return this.request<Institution>('/institutions', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Users
    async getUsers(): Promise<User[]> {
        return this.request<User[]>('/users');
    }

    async getUserById(id: string): Promise<User> {
        return this.request<User>(`/users/${id}`);
    }

    async createUser(data: Partial<User>): Promise<User> {
        return this.request<User>('/users', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        return this.request<User>(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Favorites
    async getUserFavorites(userId: string): Promise<Favorite[]> {
        return this.request<Favorite[]>(`/favorites/user/${userId}`);
    }

    async addFavorite(userId: string, programId: string): Promise<{ message: string }> {
        return this.request<{ message: string }>('/favorites', {
            method: 'POST',
            body: JSON.stringify({ userId, programId }),
        });
    }

    async removeFavorite(userId: string, programId: string): Promise<{ message: string }> {
        return this.request<{ message: string }>('/favorites', {
            method: 'DELETE',
            body: JSON.stringify({ userId, programId }),
        });
    }
}

export const api = new ApiService();
