import { useRef, SyntheticEvent, createRef, useEffect, useState } from "react";
import { CartType } from "../../graphql/cart";
import CartItem from "./item";
import { useRecoilState, useSetRecoilState } from "recoil";
import { checkedCartState } from "../../recoils/cart";
import WillPay from "../willPay";
import { useNavigate } from "react-router-dom";

const CartList = ({ items }: { items: CartType[] },) => {
    const navigate = useNavigate()
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
    const formRef = useRef<HTMLFormElement>(null)
    const checkboxRefs = items.map(() => createRef<HTMLInputElement>())
    const [formData, setFormData] = useState<FormData>()


    const setAllCheckedFromItems = () => {
        // 개별아이템 선택시
        if (!formRef.current) return
        const data = new FormData(formRef.current)
        const selectedCount = data.getAll('select-item').length
        const allChecked = selectedCount === items.length
        formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
      }
    
      const setItemsChckedFromAll = (targetInput: HTMLInputElement) => {
        const allChecked = targetInput.checked
        checkboxRefs
          .filter(inputElem => {
            return !inputElem.current!.disabled
          })
          .forEach(inputElem => {
            inputElem.current!.checked = allChecked
          })
      }

    const handleCheckBoxChanged = (e?: SyntheticEvent) => {
        if (!formRef.current) return
        const targetInput = e?.target as HTMLInputElement;
        if (targetInput && targetInput.classList.contains('select-all')) {
            setItemsChckedFromAll(targetInput)
        }
        else {
            setAllCheckedFromItems()
        }
        const data = new FormData(formRef.current)
        setFormData(data)
    }


    const handleSubmit = () =>{
        if(checkedCartData.length){
            navigate('/payment')
        } else{
            alert('결제할 제품이 없습니다.')
        }
    }
    

    useEffect(() => {
        checkedCartData.forEach((item=>{
            const itemRef = checkboxRefs.find(ref => ref.current!.dataset.id === item.id)
            if(itemRef) itemRef.current!.checked = true
        }))
        setAllCheckedFromItems()
    }, [])

    useEffect(() => {
        const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
            if (ref.current!.checked) res.push(items[i])
            return res
        }, [])
        setCheckedCartData(checkedItems)
    }, [items, formData])

    return (
        <div>
            <form ref={formRef} onChange={handleCheckBoxChanged}>
                <label>
                    <input className="select-all" name="select-all" type="checkbox" />전체선택</label>
                <ul className="cart">
                    {items.map((item, i) => (
                        <CartItem {...item}
                            key={item.id}
                            ref={checkboxRefs[i]} />
                    ))}
                </ul>
            </form>
            <WillPay submitTitle="결제창으로" handleSubmit={handleSubmit}/>
        </div>
    );
};

export default CartList