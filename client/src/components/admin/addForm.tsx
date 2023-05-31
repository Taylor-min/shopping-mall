import { SyntheticEvent } from "react"
import { ADD_PRODUCT, Product } from "../../graphql/products"
import { graphqlFetcher } from "../../queryClient"
import { useMutation } from "react-query"
import arrToObj from "../../util/arrToObj"

// type PartialProduct = Partial<Product> // 부분집합으로 모든 필드 optional
type OmittedProduct = Omit<Product, 'id' | 'createdAt'> //지전한 타입 제외 나머지


const AddForm = () =>{
    const {mutate:addProduct} = useMutation(
        ({title,imageUrl,price,description}:Omit<Product, 'id' | 'createdAt'>) => 
        graphqlFetcher(ADD_PRODUCT, {title,imageUrl,price,description}),
        // {
        //     onMutate: async ({id, amount}) =>{
        //     await queryClient.cancelQueries(QueryKeys.CART)
        //     const {cart:prevCart} = queryClient.getQueryData<{cart:CartType[]}>(
        //         QueryKeys.CART,
        //         ) || {cart:[] }
        //     if(!prevCart) return null

        //     const targetIndex = prevCart.findIndex(cartItem => cartItem.id === id)
        //     if(targetIndex === undefined || targetIndex < 0 ) return prevCart

        //     const newCart = [...prevCart]
        //     newCart.splice(targetIndex,1,{ ...newCart[targetIndex],amount})
        //     queryClient.setQueryData(QueryKeys.CART, {cart:newCart})
        //     return prevCart
        // },
        // onSuccess: ({updateCart}) => {
        //     const {cart:prevCart} = queryClient.getQueryData<{cart:CartType[]}>(
        //         QueryKeys.CART,
        //         ) ||{cart:[]}
        //     const targetIndex = prevCart?.findIndex(cartItem => cartItem.id === updateCart.id)
        //     if(!prevCart || targetIndex === undefined || targetIndex < 0 ) return

        //     const newCart = [...prevCart]
        //     newCart.splice(targetIndex, 1, updateCart)
        //     queryClient.setQueryData(QueryKeys.CART ,{cart:newCart})
        // },
        // },
    )
    
    const handleSubmit = (e:SyntheticEvent)  => {
        e.preventDefault()
        const formData = arrToObj([...new FormData(e.target as HTMLFormElement)])
        formData.price = Number(formData.price)
        addProduct(formData as OmittedProduct)
    }
    return(
        <form onSubmit={handleSubmit}>
           <label>상품명 : <input name="title" type="text" required/></label> 
           <label>이미지URL : <input name="imageUrl" type="text" required/></label> 
           <label>상품가격 : <input name="price" type="number" required min="1000"/></label> 
           <label>상세 : <textarea name="description"/></label> 
           <button type="submit">등록하기</button>
        </form>
        
    )
}

export default AddForm