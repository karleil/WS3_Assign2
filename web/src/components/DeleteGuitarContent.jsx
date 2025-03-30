import g from "../global.module.css";
import m from "./AddGuitarContent.module.css";

function DeleteGuitarContent( { tape, onClose, onTapeDeleted } ) {

    const handleDeleteTape = (event) => {
        event.preventDefault();

        fetch(`http://localhost:3000/guitars/${tape.id}`, {
                method: "DELETE"
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                onTapeDeleted();
                onClose();
            })
    }

    return(
        <div className={`${m["modal-container"]}`}>
            <div className={`${m["modal"]} ${g["card"]}`}>
                <h3>Are you sure you want to delete {tape.name}?</h3>
                <form onSubmit={handleDeleteTape}>
                    <button 
                        className={`${g["button"]} ${g["delete"]}`}
                        type="submit"
                    >Yes, we need money to survive</button>
                </form>
                <button 
                    className={m["modal__close-button"]}
                    onClick={onClose}
                >x</button>
            </div>
        </div>
    );

}

export default DeleteGuitarContent;