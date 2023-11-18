import { UserSnails } from "../types/snail";

export const getUserSnailsFromLocalStorage = () => {
    const data = localStorage.getItem('userSnails');
    if (data) {
        try {
            return JSON.parse(data) as UserSnails;
        } catch (error) {
            console.error('Failed to parse userSnails from localStorage:', error);
        }
    }
    return null;
};    
