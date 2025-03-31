import React, { useState, useEffect } from "react";
import m from "./AddGuitarContent.module.css";
import g from "../global.module.css";

function ModalContent({ onClose, onTapeAdded }) {

  const [dbBrands, setDbBrands] = useState(""); // stores the brands from the database

  // stores the selected brand, tite, image, description
  const [brand, setBrand] = useState(""); 
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // state to control if the user is adding a new brand
  const [isNewBrand, setIsNewBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  
  useEffect(() => { // fetches the list of brands from the server when the component mounts
    fetch("http://localhost:3000/brands")
      .then((res) => res.json())
      .then((data) => {
        setDbBrands(data);
        if (data.length > 0) {
          setBrand(data[0].id);
        }
      });
  }, []);

 
  const handleBrandSelectChange = (eventTrigger) => {  // handles changes in the brand selection dropdown
    if (eventTrigger.target.value === "-1") { //if 'other' is selected, enable the new brand input
      setIsNewBrand(true);
      setBrand("");
    } else {
      setIsNewBrand(false);
      setBrand(eventTrigger.target.value);
    }
  };

  
  const handleFormSubmit = async (event) => { // handles form submission

    
    event.preventDefault();

    
    let brandId = brand; // if a new brand is added, this will be updated with the new brand id
 
   
    if (isNewBrand) {  // if a new brand is added, create it in the database
      const newBrandFetchMeta = { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrand })
      };

      
      await fetch("http://localhost:3000/brands", newBrandFetchMeta) // this updates the brand ID with the newly added ID
        .then((response) => response.json())
        .then((data) => {
          brandId = data.brandId;
        });

    }

    // FormData object to send the guitar details
    const formData = new FormData(); 
    formData.append("brand_id", brandId);
    formData.append("name", title);
    formData.append("description", description); 
    formData.append("image", image);

    
    fetch("http://localhost:3000/guitars", { method: "POST", body: formData }) // sends the form data to the server
      .then(response => response.json())
      .then(data => {


        onTapeAdded();

        
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