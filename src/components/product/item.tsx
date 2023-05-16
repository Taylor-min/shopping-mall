import { Product } from "../../types";

const ProductItem = ({category, image, price, rating, title
}: Product) => (
    <li className="product-item">
        <p className="product-item_category">{category}</p>
        <p className="product-item_title">{title}</p>
        <img className="product-item_image"src={image} />
        <span className="product-item_price">${price}</span>
        <span className="product-item_rating">{rating.rate}</span>
    </li>
    )


export default ProductItem