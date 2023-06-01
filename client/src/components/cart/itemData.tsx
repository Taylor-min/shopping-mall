import { Product } from "../../graphql/products"

const ItemData = ({imageUrl, price, title}:Pick<Product,'imageUrl' | 'price' | 'title'>) => (
    <>
            <img src={imageUrl}  className="cart-item_checkbox" />
            <p className="cart-item_price">{price}</p>
            <p className="cart-item_title">{title}</p>

            </>
)

export default ItemData