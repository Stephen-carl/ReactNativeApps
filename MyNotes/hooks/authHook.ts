import apiClient from "@/api/apiConnect";
import { LoginParam } from "@/interface/authInterface";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useLogin = () : UseMutationResult<any, Error, LoginParam> =>{
    return useMutation({
        mutationFn: async({email, password} : LoginParam) => {
            const response = await apiClient.post('/auth/login', {email, password});
            return response.data;
        }
    })
}