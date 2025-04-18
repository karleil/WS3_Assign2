import React, { useState, useEffect } from "react";
import m from "./AddGuitarContent.module.css";
import g from "../global.module.css";

function ModalContent({ onClose, onGuitarAdded }) {

  
  const [dbBrands, setDbBrands] = useState("");


  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

 
  const [isNewBrand, setIsNewBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/brands", {
      headers: {
        Authorization: `Bearer ${token}`, //auth token of the user, used to authenticate the user and give them access to the database
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDbBrands(data);
        if (data.length > 0) {
          setBrand(data[0].id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  
  const handleBrandSelectChange = (eventTrigger) => {
    if (eventTrigger.target.value === "-1") {
      setIsNewBrand(true);
      setBrand("");
    } else {
      setIsNewBrand(false);
      setBrand(eventTrigger.target.value);
    }
  };

  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    let brandId = brand;

    
    if (isNewBrand) {
      const newBrandFetchMeta = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrand }),
      };

      return fetch("http://localhost:3000/brands", newBrandFetchMeta)
        .then((response) => response.json())
        .then((data) => {
          brandId = data.brandId;

          return submitGuitar(brandId);
        });
    } else {
      submitGuitar(brandId);
    }
  };

  
  const submitGuitar = (brandId) => {
    const formData = new FormData();
    formData.append("brand_id", brandId);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    fetch("http://localhost:3000/guitars", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, //auth token of the user, used to authenticate the user and give them access to the database
      },
    })
      .then((response) => response.json())
      .then(() => {
        onGuitarAdded();
        onClose();
      });
  };

  return (
    <div className={m['modal-container']}>
      <div className={`${m['modal']} ${g['card']}`}>
        <h3>Add a new guitar</h3>
        <form
          className={`${g['form-group']} ${g['grid-container']}`}
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
        >
          <div className={g['col-6']}>
            <label htmlFor="brand">Brand</label>
            {!isNewBrand ? (
              <select
                name="brand"
                id="brand"
                value={brand}
                onChange={handleBrandSelectChange}
              >
                {dbBrands && dbBrands.map((b, index) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
                <option value="-1">+ New Brand +</option>
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
                <button
                  className={`${g['button']} ${m['modal__show-list']}`}
                  type="button"
                  onClick={() => setIsNewBrand(false)}
                >
                  Show List
                </button>
              </>
            )}
          </div>
          <div className={g['col-6']}>
            <label htmlFor="title">Name</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <textarea
              name="description"
              id="description"
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
            <button className={g['button']} type="submit">Add guitar</button>
          </div>
        </form>
        <button onClick={onClose} className={m["modal__close-button"]}>x</button>
      </div>
    </div>
  );
}

export default ModalContent;
