import { useState } from "react";
import { createPortal } from "react-dom";
import DeleteGuitarContent from "./DeleteGuitarContent";
import g from "../global.module.css";

function DeleteGuitar({ guitar, onGuitarDeleted }) { // same as AddGuitar
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button 
                className={`${g["button"]} ${g["small"]} ${g["delete"]}`} 
                onClick={() => { setShowModal(true); }}
            >
                Delete
            </button>

            {showModal && createPortal(
                <DeleteGuitarContent 
                    guitar={guitar} 
                    onGuitarDeleted={onGuitarDeleted}
                    onClose={() => { setShowModal(false) }} 
                />, 
                document.body
            )}
        </>
    );
}

export default DeleteGuitar;
