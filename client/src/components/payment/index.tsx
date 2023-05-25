import { useRecoilState } from "recoil"
import { checkedCartState } from "../../recoils/cart"
import WillPay from "../willPay"
import PaymentModal from "./modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { graphqlFetcher } from "../../queryClient"
import { EXCUTE_PAY } from "../../graphql/payment"


type PaymentInfos = string[]

const Payment = () => {
    const navigate = useNavigate()
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
    const[modalShown, toggleModal] = useState(false)
    const {mutate:excutePay} = useMutation(
        (payInfo:PaymentInfos) => graphqlFetcher(EXCUTE_PAY, payInfo)
    )

    const showModal = () =>{
        toggleModal(true)
    }

    const proceed = () => {
        const payInfos = checkedCartData.map(({id})=>(id))
        excutePay(payInfos)
        // 결제 진행
        setCheckedCartData([])
        alert('결제가 완료되었습니다.')
        navigate('/products',{replace:true})
    }

    const cancel = () => {
        toggleModal(false)
    }
    return(

        <div>
        <WillPay submitTitle="결제하기" handleSubmit={showModal}/>
        <PaymentModal show={modalShown} proceed={proceed} cancel={cancel}/>
        </div>
    )
}

export default Payment