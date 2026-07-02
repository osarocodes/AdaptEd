import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useSubjectStore = create((set) => ({
    allSubject: [],

    getAllSubject: async () => {
        try {
            const res = await axiosInstance.get('/')
        }  catch (error) {
            console.error(error.message)
        }
    }
}))