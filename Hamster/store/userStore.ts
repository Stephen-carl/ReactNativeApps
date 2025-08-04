import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

// things to be in the user
interface User{
    [key : string] : any
}

// the store shap and actions
interface UserStore{
    user : User | null,
    token : string | null,
    isLoggedIn : boolean | null,
    setIsLoggedIn : (isLoggedIn : boolean) => void,
    setUser : (user : User) => void,
    clearUser : () => void,
    setToken : (token : string) => void,
    clearToken : () => void,
}

// then the actions
export const useUserStore = create<UserStore>()(
    persist((set) => ({
        user : null,
        token: null,
        isLoggedIn : false,
        setIsLoggedIn : (isLoggedIn) => set({isLoggedIn}),


        setUser : (user) => set({user}),
        // set the user data to null
        clearUser : () => set({user : null}),

        setToken : (token) => set({token}),
        // set the user data to null
        clearToken: () => set({token:null}) ,
    }),
    {
        // the name of the storage
        name : 'user-data',
        storage : createJSONStorage(() => AsyncStorage)
    }
)
)