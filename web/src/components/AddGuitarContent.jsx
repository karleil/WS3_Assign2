import React, { useState, useEffect } from "react";
import m from "./AddGuitarContent.module.css";
import g from "../global.module.css";

function ModalContent({ onClose, onTapeAdded }) {

  const [dbBrands, setDbBrands] = useState(""); //

  // State to hold the brand id, title, image, and description
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // State to hold the new brand info if that option is selected
  const [isNewBrand, setIsNewBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  // Load the brands from the API on initial render for the select dropdown
  useEffect(() => {
    fetch("http://localhost:3000/brands")
      .then((res) => res.json())
      .then((data) => {
        setDbBrands(data);
        if (data.length > 0) {
          setBrand(data[0].id);
        }
      });
  }, []);

  // Toggle the select and the input for brands
  const handleBrandSelectChange = (eventTrigger) => {
    if (eventTrigger.target.value === "-1") {
      setIsNewBrand(true);
      setBrand("");
    } else {
      setIsNewBrand(false);
      setBrand(eventTrigger.target.value);
    }
  };

  // Send the form data to the API
  const handleFormSubmit = async (event) => {

    // Stop the HTML form from submitting
    event.preventDefault();

    // Get the brand ID from the state
    let brandId = brand;

    // If the brand is new, create it before creating the tape
    if (isNewBrand) {

      const newBrandFetchMeta = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrand })
      };

      // First, create the new brand by sending a POST request to the API
      await fetch("http://localhost:3000/brands", newBrandFetchMeta)
        .then((response) => response.json())
        .then((data) => {
          brandId = data.brandId;
        });

    }

    // Create FormData object to send the tape data including the image file
    const formData = new FormData();
    formData.append("brand_id", brandId);
    formData.append("name", title);
    formData.append("description", description); // Add description to FormData
    formData.append("image", image);

    // Send the POST request to the API to create new tape
    fetch("http://localhost:3000/guitars", { method: "POST", body: formData })
      .then(response => response.json())
      .then(data => {

        // Call the onTapeAdded function that was passed as a prop
        //    @NOTE: This is passed down from AllTapes.jsx and just calls the fetchTapes function to repopulate the tapes
        onTapeAdded();

        // Close the modal.
        onClose();

      });

  };

  return (
    <div className={m['modal-container']}>
      <div className={`${m['modal']} ${g['card']}`}>
        <h3>Add new guitar</h3>
        <form action="" className={`${g['form-group']} ${g['grid-container']}`} onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className={g['col-6']}>
            <label htmlFor="brand">Brand</label>
            {!isNewBrand ? (
              <select
                name="brand"
                id="brand"
                value={brand}
                onChange={handleBrandSelectChange}>
                {dbBrands && dbBrands.map((brand, index) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
                <option value="-1">Other </option>
              </select>
            ) : (
              <>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                />
                <button className={`${g['button']} ${m['modal__show-list']}`} onClick={() => setIsNewBrand(false)}>Show List</button>
              </>
            )}
          </div>
          <div className={g['col-6']}>
            <label htmlFor="title">Name</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className={g['col-12']}>
            <button className={g['button']} type="submit">Add tape</button>
          </div>
        </form>
        <button onClick={onClose} className={m["modal__close-button"]}>x</button>
      </div>
    </div>
  );
}

export default ModalContent;