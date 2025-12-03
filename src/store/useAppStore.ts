import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Program {
  id: string
  title: string
  description: string
  institution: string
  institutionId: string
  category: string
  level: 'iniciante' | 'intermediario' | 'avancado'
  duration: string
  format: 'presencial' | 'online' | 'hibrido'
  startDate: string
  endDate: string
  applicationDeadline: string
  requirements: string[]
  benefits: string[]
  imageUrl?: string
  isActive: boolean
}

export interface Institution {
  id: string
  name: string
  description: string
  website: string
  logoUrl?: string
  programsCount: number
}

export interface User {
  id: string
  name: string
  email: string
  interests: string[]
  level: 'iniciante' | 'intermediario' | 'avancado'
}

interface AppState {
  // Programs
  programs: Program[]
  filteredPrograms: Program[]
  selectedProgram: Program | null
  
  // Institutions
  institutions: Institution[]
  
  // User
  user: User | null
  favorites: string[] // Program IDs
  
  // Filters
  filters: {
    category: string
    level: string
    format: string
    institution: string
  }
  
  // UI State
  isLoading: boolean
  error: string | null
}

interface AppActions {
  // Programs
  setPrograms: (programs: Program[]) => void
  setFilteredPrograms: (programs: Program[]) => void
  setSelectedProgram: (program: Program | null) => void
  
  // Institutions
  setInstitutions: (institutions: Institution[]) => void
  
  // User
  setUser: (user: User | null) => void
  addToFavorites: (programId: string) => void
  removeFromFavorites: (programId: string) => void
  updateUserInterests: (interests: string[]) => void
  
  // Filters
  setFilters: (filters: Partial<AppState['filters']>) => void
  clearFilters: () => void
  
  // UI State
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type AppStore = AppState & AppActions

const initialState: AppState = {
  programs: [],
  filteredPrograms: [],
  selectedProgram: null,
  institutions: [],
  user: null,
  favorites: [],
  filters: {
    category: '',
    level: '',
    format: '',
    institution: '',
  },
  isLoading: false,
  error: null,
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Programs
      setPrograms: (programs) => set({ programs }),
      setFilteredPrograms: (filteredPrograms) => set({ filteredPrograms }),
      setSelectedProgram: (selectedProgram) => set({ selectedProgram }),
      
      // Institutions
      setInstitutions: (institutions) => set({ institutions }),
      
      // User
      setUser: (user) => set({ user }),
      addToFavorites: (programId) => 
        set((state) => ({
          favorites: [...state.favorites, programId]
        })),
      removeFromFavorites: (programId) =>
        set((state) => ({
          favorites: state.favorites.filter(id => id !== programId)
        })),
      updateUserInterests: (interests) =>
        set((state) => ({
          user: state.user ? { ...state.user, interests } : null
        })),
      
      // Filters
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        })),
      clearFilters: () => set({ filters: initialState.filters }),
      
      // UI State
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'upnext-store',
      partialize: (state) => ({
        favorites: state.favorites,
        user: state.user,
        filters: state.filters,
      }),
    }
  )
)
