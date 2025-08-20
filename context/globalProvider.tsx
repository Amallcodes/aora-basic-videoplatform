import { getCurrentUser } from "@/lib/appwrite";
import { GlobalContextType } from "@/models/models";
import { createContext, ReactNode, useEffect, useState } from "react";

export const GlobalContext = createContext<GlobalContextType>({
    isLoggedIn: false,
    user: null,
    isLoading: false,
    setIsLoggedIn: () => { },
    setUser: () => { },
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCurrentUser() {
        try {
            const currentUser = await getCurrentUser();
            setIsLoggedIn(true);
            setUser(currentUser);
            // console.log(currentUser)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCurrentUser();
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