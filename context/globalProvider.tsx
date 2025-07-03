import { getCurrentUser } from "@/lib/appwrite";
import { GlobalContextType } from "@/models/models";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext<GlobalContextType>({
    isLoggedIn: false,
    user: null,
    isLoading: false,
    setIsLoggedIn: () => {},
    setUser: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                setIsLoggedIn(true);
                setUser(res);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}