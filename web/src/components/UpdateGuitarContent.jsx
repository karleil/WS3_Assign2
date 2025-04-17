import React, { useState, useEffect } from "react";
import m from "./AddGuitarContent.module.css";
import g from "../global.module.css";

function UpdateGuitarContent({ onClose, onGuitarUpdated, guitar }) {

  
  const [dbBrands, setDbBrands] = useState([]);  // stores the brands from the database

  
  const [brand, setBrand] = useState(guitar.brand_id || ""); // stores the selected brand defaulting to the brand of the guitar being edited

  
  const [name, setTitle] = useState(guitar.name || "");
  const [image, setImage] = useState("");
  const [isNewBrand, setIsNewBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  
  useEffect(() => {
    fetch("http://localhost:3000/brands") // fetches the list of brands from the server when the component mounts
      .then((res) => res.json()) // parses the response as JSON
      .then((data) => {
        setDbBrands(data);
        
        if (data.length > 0 && !brand) {  
          setBrand(data[0].id); 
        }
      });
  }, [brand]);

   
  const handleBrandSelectChange = (eventTrigger) => { // handles changes in the brand selection dropdown
    if (eventTrigger.target.value === "-1") { // if 'other' is selected, enable the new brand input
      setIsNewBrand(true);
      setBrand("");
    } else {
      setIsNewBrand(false);
      setBrand(eventTrigger.target.value);
    }
  };

 
  const handleFormSubmit = async (event) => { 
    event.preventDefault();

    
    if (!brand && !isNewBrand) { // if no brand is selected and not adding a new one
      alert("Please select a brand or add a new one.");
      return;
    }

    
    if (!name) { // if name is empty
      alert("Title cannot be empty.");
      return;
    }

   
    let brandId = brand; // if a new brand is added, this will be updated with the new brand id
    if (isNewBrand) {
      
      if (!newBrand) {  // if new brand name is empty 
        alert("Please provide a name for the new brand.");
        return;
      }

      // creates a new brand in the database
      const brandResponse = await fetch("http://localhost:3000/brands", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_brand: newBrand }), 
      });

      
      if (!brandResponse.ok) { // returns a respons if the brand creation fails 
        alert("Failed to create a new brand.");
        return;
      }

     
      const brandData = await brandResponse.json(); // parses the response as JSON
      brandId = brandData.brandId; // updates the brand ID with the newly added ID
    }

   
    if (!image) {
      alert("Please upload an image.");
      return;
    }

  
    const formData = new FormData(); //creates a FormData object to send the guitar details
    formData.append("brand_id", brandId);
    formData.append("name", name);
    formData.append("image", image);

    
    const guitarResponse = await fetch(`http://localhost:3000/guitars/${guitar.id}`, { // sends the form data to the server
      method: "PUT",
      body: formData,
    });

 
    if (!guitarResponse.ok) {
      alert("Failed to update the item.");
      return;
    }

 
    const guitarResult = await guitarResponse.json();
    console.log("Success:", guitarResult);

    onGuitarUpdated(); // calls the onGuitarUpdated function to refresh the list of guitars
    onClose(); // closes the modal
  };

  return (
    <div className={m['modal-container']}>
      <div className={`${m['modal']} ${g['card']}`}>
        {/* the foorm to edit the guitar */}
        <h3>Edit Guitar</h3>
        <form action="" className={`${g['form-group']} ${g['grid-container']}`} onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className={g['col-4']}>
            <label htmlFor="brand">Brand</label>
            {!isNewBrand ? (
              <select
                name="brand"
                id="brand"
                value={brand} 
                onChange={handleBrandSelectChange}> {/* renders the brands */}
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
          <div className={g['col-8']}>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name} 
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Current Image</label>
            <img src={`http://localhost:3000/images/${guitar.image_name}`} alt="Placeholder" />
            <label htmlFor="image">Upload New Image</label>
            <input type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className={g['col-12']}>
            <button className={`${g['button']} ${g['success']}`} type="submit">Save</button>
          </div>
        </form>
        <button onClick={onClose} className={m["modal__close-button"]}>x</button>
      </div>
    </div>
  );
}

export default UpdateGuitarContent;
