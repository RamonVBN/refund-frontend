import {Navigate, NavLink, useLocation} from 'react-router'

import okSvg from '../assets/ok.svg'


export function Confirm(){
    const location = useLocation()

    if (!location.state?.fromSubmit) {
        
        return <Navigate to='/refund-frontend/'/>
    }
    return <div className='bg-gray-500 lg:w-[512px] rounded-xl flex flex-col items-center p-10 gap-6  '>

        <h1 className='text-2xl font-bold text-center text-green-100'>Solicitação enviada!</h1>

        <img className='w-28' src={okSvg} alt="Ícone de ok" />
        
        <p className='text-sm text-gray-200 text-center'>
            Aguarde. Sua solicitação será analisada e, em breve o setor financeiro entrará em contato com você.
        </p>

        <NavLink className='w-full p-3 text-center bg-green-100 rounded-lg text-white hover:bg-green-200 transition ease-linear' to="/refund-frontend/">Nova solicitação</NavLink>
    </div>
}