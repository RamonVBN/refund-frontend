import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { RefundItem, RefundItemProps } from "../components/RefundItem"
import { Pagination } from "../components/Pagination"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"

import searchSvg from '../assets/search.svg'
import { CATEGORIES } from "../utils/categories"

import { formatCurrency } from "../utils/formatCurrency"

import { api } from "../sevices/api"

import { AxiosError } from "axios"


const PER_PAGE = 5

export function DashBoard(){
    const navigate = useNavigate()

    const [name, setName] = useState('')

    const [page, setPage] = useState(1)
    const [totalOfPage, setTotalOfPage] = useState(10)

    const [refunds, setRefunds] = useState<RefundItemProps[]>([])

    function onSubmit(e: React.FormEvent){
        e.preventDefault()
        fetchRefunds()
    }



    async function fetchRefunds(){

        try {
            
        const response = await api.get<RefundsPaginationApiResponse>(`/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`)

        setRefunds(
            response.data.refunds.map((refund) => ({
                id: refund.id,
                name: refund.user.name,
                description: refund.name,
                amount: formatCurrency(refund.amount),
                categoryImg: CATEGORIES[refund.category].icon
            }))
        )

        setTotalOfPage(response.data.pagination.totalPages)

        } catch (error) {
            
            console.log(error)

            if (error instanceof AxiosError) {
                
                return alert(error.response?.data.message)
            }

            return alert('Não foi possível carregar')

        }
        
        
    }

    function handlePagination(action: 'next' | 'previous'){

        setPage((prevPage) => {
            if (action === 'next'  && prevPage < totalOfPage) {
                return prevPage + 1
            }
            
            if (action === 'previous' && prevPage > 1) {
                
                return prevPage - 1
            }

            return prevPage

        } )
    }

    useEffect(() => {
        fetchRefunds()
    }, [page])

    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
            <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

            <form onSubmit={onSubmit} className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6" action="">
                <Input onChange={(e) => setName(e.target.value)} placeholder="Pesquisar pelo nome"/>

                <Button type="submit" variant="icon">
                    <img className="w-5" src={searchSvg} alt="Ícone de pesquisar" />
                </Button>
            </form>

            <div className="my-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">

            {
                    refunds.map((item) => (
                    <RefundItem onClick={() => navigate(`/refund-frontend/refund/${item.id}`)} key={item.id} data={item}
                      ></RefundItem>))
                }

            </div>

            <Pagination onPrevious={() => handlePagination('previous')} onNext={() => handlePagination('next')} current={page} total={totalOfPage}></Pagination>
        </div>
    )
}