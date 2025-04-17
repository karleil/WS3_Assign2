import g from "../global.module.css";
import m from "./AddGuitarContent.module.css";

function DeleteGuitarContent({ guitar, onClose, onGuitarDeleted }) {
  const handleDeleteGuitar = (event) => {
    event.preventDefault();

    // Make sure the endpoint for guitars is correct
    fetch(`http://localhost:3000/guitars/${guitar.id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`, // auth token of the user, used to authenticate the user and give them access to the database
      },

      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onGuitarDeleted(); // Calls the onGuitarDeleted function to refresh the list
        onClose(); // Closes the modal
      });
  };

  return (
    <div className={`${m["modal-container"]}`}>
      <div className={`${m["modal"]} ${g["card"]}`}>
        <h3>Are you sure you want to delete {guitar.name}?</h3>
        <form onSubmit={handleDeleteGuitar}>
          <button className={`${g["button"]} ${g["delete"]}`} type="submit">
            Yes, we need money to survive
          </button>
        </form>

        <button className={m["modal__close-button"]} onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
}

export default DeleteGuitarContent;
