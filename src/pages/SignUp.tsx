import { useState } from "react"
import {z, ZodError} from 'zod'

import { api } from "../sevices/api"

import { useNavigate } from "react-router"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import React from "react"
import { AxiosError } from "axios"

const signUpSchema = z.object({
    name: z.string().trim().min(1, {message: 'Informe o nome'}),
    email: z.string().email({message: 'Email inválido.'}),
    password: z.string().min(6, {message: 'Senha deve ter pelo menos 6 digitos.'}),
    passwordConfirm: z.string({message: 'Confirme a senha'})
}).refine((data) => data.password === data.passwordConfirm, {message: 'As senhas não são iguais.', path: ['passwordConfirm']} )

export function SignUp(){
    const navigate = useNavigate()

    const[name,  setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

   async function onSubmit(e: React.FormEvent){
        e.preventDefault()
        
        
        try {
            setIsLoading(true)
            
            const data = signUpSchema.parse({name, email, password, passwordConfirm})

            await api.post('/users', data)

            if (confirm('Cadastrado com sucesso. Ir para tela de login?')) {
                navigate('https://ramonvbn.github.io/refund-frontend/')
            }

        } catch (error) {
            console.log(error)

            if (error instanceof AxiosError) {
                
                return alert(error.response?.data.message)
            }
            
            if (error instanceof ZodError) {
                

                return alert(error.issues[0].message)
            }

            alert('Não foi posssível cadastrar')

        }finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} action="" className="w-full flex flex-col gap-4">

            <Input required legend="Nome"  placeholder="Seu nome" onChange={(e) => setName(e.target.value)}/>


            <Input required legend="E-mail" type="email" placeholder="Seu@email.com" onChange={(e) => setEmail(e.target.value)}/>

            <Input required legend="Senha" type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>

            <Input required legend="Confirmação da senha" type="password" placeholder="Senha novamente" onChange={(e) => setPasswordConfirm(e.target.value)}/>

            <Button isLoading={isLoading} type="submit">
                Cadastrar-se
            </Button>

    
            <span className="text-center">
            Já tem uma conta? <a href="https://ramonvbn.github.io/refund-frontend/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Login</a></span>
            
        </form>
    )
}