'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';


export function useAuth() {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    return { isAuthenticated, user }
}