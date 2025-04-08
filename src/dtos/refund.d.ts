
enum CategoriesApiEnum {
    Food = 'food',
    Others = 'others',
    Services = 'services',
    Transport = 'transport',
    Accommodation = 'accommodation'
}

type RefundApiResponse = {
    id: string
    userId: string
    name: string
    category: CategoriesApiEnum
    amount: number
    filename: string
    user: {
        name: string
    }
}

type RefundsPaginationApiResponse = {
    refunds: RefundApiResponse[]
    pagination: {
        page: number
        perPage: number
        totalRecords: number
        totalPages: number
    }
}