import gql from "graphql-tag";

export type CartType = {
    id: string
    imageUrl: string
    price: number
    title: string
    amount: number
}

export const GET_CART = gql`
query GET_CART{
        cartItem{
            id
            amount
            product{
                id
                imageUrl
                price
                title
                description
                createdAt
            }
        }   
    }
`


export const ADD_CART = gql`
    mutation ADD_CART($id:string){
        cart(id:$id){
            id
            amount
            product{
                id
                imageUrl
                price
                title
                description
                createdAt
            }
    }
    `

export const UPDATE_CART = gql`
    mutation UPDATE_CART($id:string, $amount:number){
        cart(id:$id, amount:$amount){
            id
            amount
            product{
                id
                imageUrl
                price
                title
                description
                createdAt
            }
    }
    `

export const DELETE_CART = gql`
    mutation DELETE_CART($id:stirng){
        id
    }
`

