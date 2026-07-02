import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,

    checkAuth: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                set({ authUser: null });
                return null;
            }

            const res = await axiosInstance.get("/auth/check", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const user = res.data?.user || null;
            set({ authUser: user });
            if (user) localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error) {
            set({ authUser: null });
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            console.error(error.message)
            return null;
        }
    },
    
    login: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
            const info = res.data;
            localStorage.setItem("token", info.token);
            const user = info.user || null;
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                set({ authUser: user });
            }
            return user;
        } catch {
            toast.error("Login failed");
            return null;
        }
    },

    register: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/register", data);
            if (res.data?.token) {
                localStorage.setItem("token", res.data.token);
                const user = res.data.user || null;
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    set({ authUser: user });
                }

                return true;
            }
        } catch {
            toast.error("Error signing you up");
        }

        return false;
    }
}))
