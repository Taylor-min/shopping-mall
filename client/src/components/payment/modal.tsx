import { ReactChild } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: ReactChild }) => {
    return createPortal(children, document.getElementById('modal')!)
}

const PaymentModal = ({
    show,
    proceed,
    cancel }: {
        show: boolean
        proceed: () => void
        cancel: () => void
    }) => {
    return (show ? (
        <ModalPortal>
            <div className={`modal ${show ? 'show' : ''}`}>
                <div className="modal_inner">
                    <p>결제 진행 하시겠습니까?</p>
                    <div>
                        <button onClick={proceed}>Yes</button>
                        <button onClick={cancel} >No</button>
                    </div>
                </div>
            </div>

        </ModalPortal>
    ) : null
    )
}

export default PaymentModal