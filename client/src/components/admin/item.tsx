import { Link } from "react-router-dom";
import { Product } from "../../graphql/products";
import { useMutation } from "react-query";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";


const AdminItem = ({id,imageUrl, price, title,}: Product) => {
    const { mutate:addCart} = useMutation((id: string) => graphqlFetcher(ADD_CART,{id}))
    return(
    <li className="product-item">
        <Link to={`/products/${id}`}>
        <p className="product-item_title">{title}</p>
        <img className="product-item_image"src={imageUrl} />
        <span className="product-item_price">\{price}</span>
        </Link>
        <button className="product-item_to-cart" onClick={()=>addCart(id)}>
            어드민</button>
    </li>
    )}


export default AdminItem