'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import type { Program } from '@/store/useAppStore';
import { api } from '@/services/api';

export function usePrograms() {
    const { programs, setPrograms, setLoading, setError } = useAppStore();

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await api.getPrograms();
                setPrograms(data as Program[]);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : 'Erro ao carregar programas');
                console.error('Error fetching programs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (programs.length === 0) {
            fetchPrograms();
        }
    }, [programs.length, setPrograms, setLoading, setError]);

    const { isLoading } = useAppStore();
    return { programs, isLoading };
}

export function useInstitutions() {
    const { institutions, setInstitutions, setLoading, setError } = useAppStore();

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await api.getInstitutions();
                setInstitutions(data);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : 'Erro ao carregar instituições');
                console.error('Error fetching institutions:', error);
            } finally {
                setLoading(false);
            }
        };

        if (institutions.length === 0) {
            fetchInstitutions();
        }
    }, [institutions.length, setInstitutions, setLoading, setError]);

    const { isLoading } = useAppStore();
    return { institutions, isLoading };
}

export function useFavorites(userId?: string) {
    const { favorites, addToFavorites: addToStore, removeFromFavorites: removeFromStore } = useAppStore();

    const addFavorite = async (programId: string) => {
        if (!userId) {
            console.error('User ID is required to add favorite');
            return;
        }

        try {
            await api.addFavorite(userId, programId);
            addToStore(programId);
        } catch (error: unknown) {
            console.error('Error adding favorite:', error);
            throw error;
        }
    };

    const removeFavorite = async (programId: string) => {
        if (!userId) {
            console.error('User ID is required to remove favorite');
            return;
        }

        try {
            await api.removeFavorite(userId, programId);
            removeFromStore(programId);
        } catch (error: unknown) {
            console.error('Error removing favorite:', error);
            throw error;
        }
    };

    const isFavorite = (programId: string) => {
        return favorites.includes(programId);
    };

    const { isLoading } = useAppStore();
    return {
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite,
    };
}
