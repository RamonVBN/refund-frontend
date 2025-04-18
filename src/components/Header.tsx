
import { useNavigate } from 'react-router'
import logoSvg from '../assets/logo.svg'

import logoutSvg from '../assets/logout.svg'

import { useAuth } from '../hooks/useAuth'


export function Header(){
const auth = useAuth()
const navigate = useNavigate()

    function navigation(){

    auth.remove
    navigate('/refund-frontend/') 

     
}
    return (
        <header className='w-full flex justify-between'>
            <img className='my-8' src={logoSvg} alt="Logo" />

            <div className='flex items-center gap-3'>
                <span className='text-sm font-semibold text-gray-200'>Olá, {auth.session?.userWithoutPassword.name}</span>

                <img onClick={navigation} className='my-8 cursor-pointer hover:opacity-75 transition ease-linear ' src={logoutSvg} alt="Ícone de sair" />
            </div>
        </header>
    )
}