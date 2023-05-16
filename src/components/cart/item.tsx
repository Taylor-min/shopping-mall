import {  useMutation } from "react-query";
import { CartType, UPDATE_CART} from "../../graphql/cart";
import { QueryKeys, getClient, graphqlFetcher } from "../../queryClient";
import { SyntheticEvent } from "react";




const CartItem = ({id, imageUrl, price, title, amount}: CartType) => {
    const queryClient=getClient()
    const {mutate:updateCart} = useMutation(
        ({id, amount}:{id:string, amount:number}) => graphqlFetcher(UPDATE_CART, {id,amount}),
        {
            onMutate: async ({id, amount}) =>{
            await queryClient.cancelQueries(QueryKeys.CART)
            const prevCart = queryClient.getQueryData<{[key:string]:CartType}>(QueryKeys.CART)

            if(!prevCart?.[id]) return prevCart

            const newCart = {
                ...(prevCart || {}),
                [id] : {...prevCart[id],amount}
            }
            queryClient.setQueryData(QueryKeys.CART, newCart)
            return prevCart
        },
        onSuccess: newValue => {
            const prevCart = queryClient.getQueryData<{[key:string]:CartType}>(QueryKeys.CART)
            const newCart = {
                ...(prevCart ||{}),
                ...newValue ,
            }
            queryClient.setQueryData(QueryKeys.CART,newCart)
        },
        },
    )
    
    const handleUpdateAmount = (e:SyntheticEvent) =>{
        const amount = Number((e.target as HTMLInputElement).value)
        updateCart({id, amount})
    }

    return(
        <li className="cart-item">
            <img src={imageUrl} />
            <p className="cart-item_price">{price}</p>
            <p className="cart-item_title">{title}</p>
            <input type="number" className="cart-item_amount" value={amount} onChange={handleUpdateAmount}/>
        </li>
    )
}



export default CartItem