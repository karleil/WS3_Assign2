import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteGuitarContent from "./DeleteGuitarContent";
import g from "../global.module.css";

function DeleteGuitar( { tape, onTapeDeleted }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button 
                className={`${g["button"]} ${g["small"]} ${g["delete"]}`} 
                onClick={ () => { setShowModal(true) } }
            >Delete</button>

            {showModal && createPortal(
            <DeleteGuitarContent 
                tape={tape}
                onTapeDeleted={onTapeDeleted}
                onClose={ () => { setShowModal( false ) }} 
            />, 
            document.body)}

        </>
    )

}

export default DeleteGuitar;