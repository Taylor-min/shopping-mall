import { CartType } from "../../graphql/cart"

const ItemData = ({imageUrl, price, title}:Pick<CartType,'imageUrl' | 'price' | 'title'>) => (
    <>
    <img src={imageUrl}  className="cart-item_checkbox" />
            <p className="cart-item_price">{price}</p>
            <p className="cart-item_title">{title}</p>

            </>
)

export default ItemData