
type UserApiRole = 'employee' | 'manager'

type UserApiResponse = {
    token: string
    userWithoutPassword:{
        id: string
        name: string
        email: string
        role: UserApiRole
    }
}