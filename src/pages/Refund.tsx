import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Upload } from "../components/Upload"
import { Button } from "../components/Button"

import { z, ZodError} from 'zod'

import { api } from "../sevices/api"

import fileSvg from '../assets/file.svg'

import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { AxiosError } from "axios"
import { formatCurrency } from "../utils/formatCurrency"


const refundSchema = z.object({
    name: z.string().min(3, {message: 'Inform um nome claro para sua solicitação'}),
    category: z.string().min(1, {message: 'Informe a categoria'}),
    amount: z.coerce.number({message: 'Informe um valor válido'}).positive({message: 'Informe um valor válido e superior a 0'})
})


export function Refund(){
    const navigate = useNavigate()
    const params = useParams<{id: string}>()
    

    const [category, setCategory] = useState('')

    const [name, setName] = useState('')

    const [amount, setAmount] = useState('')

    const [isLoading, setIsloading] = useState(false)

    const [file, setFile] = useState<File | null>(null)

    const [fileUrl, setFileUrl] = useState<string | null>(null)


    async function onSubmit(e: React.FormEvent){
        e.preventDefault()

        if (params.id) {
            return navigate(-1)
        }

        try {
            setIsloading(true)

            if (!file) {
                
                return alert('Selecione um arquivo de comprovante')
            }

            const fileUploadForm = new FormData()

            fileUploadForm.append("file", file)

            const response = await api.post('/uploads', fileUploadForm)

            const data = refundSchema.parse({
                name, category, amount: amount.replace(',', '.')
            })

            await api.post('/refunds', {...data, filename: response.data.filename}) 
            
            navigate('/confirm', {state: {fromSubmit: true}})
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                
                return alert (error.issues[0].message)
            }

            if (error instanceof AxiosError) {
                
                return alert(error.response?.data.message)
            }   

            alert('Não foi possível realizar a solicitação')
        }finally{

            setIsloading(false)
        }

        
    }

    async function fetchRefunds(id: string) {

        try {
            const response = await api.get<RefundApiResponse>(`/refunds/${id}`)

            setName(response.data.name)
            setAmount(formatCurrency(response.data.amount))
            setCategory(response.data.category)
            setFileUrl(response.data.filename)


            
        } catch (error) {
            console.log(error)

            if (error instanceof AxiosError) {
            
                return alert(error.response?.data.message)
                
            }

            return alert('Não foi possível carregar')
        }
    }

    useEffect(() => {

        if (params.id) {
            
            fetchRefunds(params.id)
        }

    }, [params.id])
    

    return <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px] " action="">
        <header>
            <h1 className="text-xl font-bold text-gray-100">Solicitação de Reembolso</h1>
            <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso.</p>
        </header>

        <Input required legend="Nome da solicitação" value={name} onChange={(e) => setName(e.target.value)}
        disabled={!!params.id}/>

        <div className="flex gap-4">
            <Select disabled={!!params.id} value={category} onChange={(e) => setCategory(e.target.value)} required legend="Categoria">
                {
                    CATEGORIES_KEYS.map((category) => (
                        <option key={category} value={category}>
                            {CATEGORIES[category].name}
                        </option>
                    ) )
                }
            </Select>
            <Input disabled={!!params.id} legend="Valor" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
        </div>

        {
            params.id && fileUrl ? <a className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear" href={`https://refund-api.onrender.com/uploads/${fileUrl}`} target="_blank">
                <img src={fileSvg} alt="Ícone de arquivo" />
                Abrir comprovante</a> : 

        <Upload filename={file && file.name} onChange={(e) => e.target.files && setFile(e.target.files[0])}  ></Upload>

        }


        <Button isLoading={isLoading} type="submit">
        {params.id? 'Voltar': 'Enviar' }</Button>
    </form>
}