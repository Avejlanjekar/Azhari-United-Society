import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //   const login = async (email, password) => {
    //     const res = await axiosClient.post("/auth/login", { email, password });
    //     localStorage.setItem("token", res.data.token);
    //     setUser(res.data.user);
    //   };

    const login = async (email, password) => {
        const res = await axiosClient.post("/auth/login", { email, password });
        const { token, user } = res.data;

        sessionStorage.setItem("token", token);
        setUser(user);

        return user; //  so Login.jsx can redirect based on role
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }
        axiosClient
            .get("/auth/profile")
            .then((res) => setUser(res.data.user))
            .catch(() => {
                sessionStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
