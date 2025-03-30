import React, { useState, useEffect } from "react";
import m from "./AddGuitarContent.module.css";
import g from "../global.module.css";

function UpdateModalContent({ onClose, onTapeUpdated, tape }) {

  // Used to store the artists from the API
  const [dbArtists, setDbArtists] = useState([]);

  // Used to store the artist id, initializing it with an empty string if it's not provided
  const [artist, setArtist] = useState(tape.artist_id || "");

  // Used to store the title, image and new artist name from the form
  const [title, setTitle] = useState(tape.title || "");
  const [image, setImage] = useState("");
  const [isNewArtist, setIsNewArtist] = useState(false);
  const [newArtist, setNewArtist] = useState("");

  // Load the artists from the API
  useEffect(() => {
    fetch("http://localhost:3000/brands")
      .then((res) => res.json())
      .then((data) => {
        setDbArtists(data);
        // If there are artists in the database and the tape has no artist, set the first artist as the default
        if (data.length > 0 && !artist) {
          setArtist(data[0].id); // Ensure artist state is populated
        }
      });
  }, [artist]);

  // This runs when the artist select changes, if the user selects the option to add a new artist, show the input field instead of the select
  const handleArtistSelectChange = (eventTrigger) => {
    if (eventTrigger.target.value === "-1") {
      setIsNewArtist(true);
      setArtist("");
    } else {
      setIsNewArtist(false);
      setArtist(eventTrigger.target.value);
    }
  };

  // Send the form data to the API when the form is submitted
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Ensure the artist is selected or a new artist is provided
    if (!artist && !isNewArtist) {
      alert("Please select an artist or add a new one.");
      return;
    }

    // Ensure the title is not empty
    if (!title) {
      alert("Title cannot be empty.");
      return;
    }

    // If the artist is new, create it before creating the tape
    let artistId = artist;
    if (isNewArtist) {
      // Check if new artist name is not empty
      if (!newArtist) {
        alert("Please provide a name for the new artist.");
        return;
      }

      // First, create the new artist by sending a POST request to the API
      const artistResponse = await fetch("http://localhost:3000/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_artist: newArtist }),
      });

      // Check if the artist creation was successful
      if (!artistResponse.ok) {
        alert("Failed to create a new artist.");
        return;
      }

      // Get the new artist ID from the response
      const artistData = await artistResponse.json();
      artistId = artistData.artistId;
    }

    // Ensure an image is provided if required by the backend
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    // Create FormData object to send the tape data including the image file.
    const formData = new FormData();
    formData.append("brand_id", artistId);
    formData.append("title", title);
    formData.append("image", image);

    // Send the PUT request to the API to update the tape
    const tapeResponse = await fetch(`http://localhost:3000/guitars/${tape.id}`, {
      method: "PUT",
      body: formData,
    });

    // Check if the response is successful
    if (!tapeResponse.ok) {
      alert("Failed to update the tape.");
      return;
    }

    // Get the response from the API
    const tapeResult = await tapeResponse.json();
    console.log("Success:", tapeResult);

    // Call the onTapeUpdated function that was passed as a prop to refresh the list of tapes
    onTapeUpdated();

    // Close the modal
    onClose();
  };

  return (
    <div className={m['modal-container']}>
      <div className={`${m['modal']} ${g['card']}`}>
        <h3>Edit Tape</h3>
        <form action="" className={`${g['form-group']} ${g['grid-container']}`} onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className={g['col-4']}>
            <label htmlFor="artist">Artist</label>
            {!isNewArtist ? (
              <select
                name="artist"
                id="artist"
                value={artist} // ensure value is always controlled
                onChange={handleArtistSelectChange}>
                {dbArtists && dbArtists.map((artist, index) => (
                  <option key={artist.id} value={artist.id}>{artist.name}</option>
                ))}
                <option value="-1">+ New Artist + </option>
              </select>
            ) : (
              <>
                <input
                  type="text"
                  name="artist"
                  id="artist"
                  value={newArtist} // always controlled
                  onChange={(e) => setNewArtist(e.target.value)}
                />
                <button className={`${g['button']} ${m['modal__show-list']}`} onClick={() => setIsNewArtist(false)}>Show List</button>
              </>
            )}
          </div>
          <div className={g['col-8']}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title} // ensure value is always controlled
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Current Image</label>
            <img src={`http://localhost:3000/images/${tape.image_name}`} alt="Placeholder" />
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

export default UpdateModalContent;
