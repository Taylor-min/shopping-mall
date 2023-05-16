import { Link } from "react-router-dom";
import { Product } from "../../graphql/products";
import { useMutation } from "react-query";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";


const ProductItem = ({id,imageUrl, price, title,description, createdAt
}: Product) => {
    const { mutate:addCart} = useMutation((id: string) => graphqlFetcher(ADD_CART,{id}))
    return(
    <li className="product-item">
        <Link to={`/products/${id}`}>
        <p className="product-item_title">{title}</p>
        <img className="product-item_image"src={imageUrl} />
        <span className="product-item_price">${price}</span>
        </Link>
        <button className="product-item_to-cart" onClick={()=>addCart(id)}>장바구니 담기</button>
    </li>
    )}


export default ProductItem