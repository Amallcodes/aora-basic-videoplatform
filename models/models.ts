export interface GlobalContextType {
    isLoggedIn: boolean;
    user: any;
    isLoading: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (user: any) => void;
}