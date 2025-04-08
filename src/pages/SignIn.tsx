import { useActionState } from "react"

import {z, ZodError} from 'zod'

import { api } from "../sevices/api"

import { useAuth } from "../hooks/useAuth"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { AxiosError } from "axios"

const signInSchema = z.object({
    email: z.string().email({message: 'Email inválido'}),
    password: z.string().trim().min(6, {message: 'Informe a senha.'})
})


export function SignIn(){

    const auth = useAuth()

    const [state, formAction, isLoading ] = useActionState(onAction, null)

    async function onAction(_: any,formData: FormData){

        try {
        
        const data = signInSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
            })

            const response = await api.post('/sessions', data)

            // console.log(response.data)
            auth.save(response.data)

        } catch (error) {

            if (error instanceof ZodError) {
                
                return {message: error.issues[0].message}
            }

            if (error instanceof AxiosError) {
                
                return {message: error.response?.data.message}
            }

            return {message: 'Não foi possível entrar'}
            
        }
      
        
    }

    return (
        <form action={formAction} className="w-full flex flex-col gap-4">

            <Input name="email" required legend="E-mail" type="email" placeholder="Seu@email.com" />

            <Input name="password" required legend="Senha" type="password" placeholder="Senha"/>

            <p className="text-sm text-red-600  text-center my-2 font-medium">
                {state?.message}
            </p>

            <Button isLoading={isLoading} type="submit">
                Entrar
            </Button>

            <span className="text-center">
                Ainda não tem uma conta? <a href="/signup" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Cadastre-se</a></span>
            
        </form>
    )
}