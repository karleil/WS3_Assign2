import { useEffect, useState } from "react";
import { Link } from "react-router";    
import { useParams } from "react-router";
import parse from 'html-react-parser';

import g from '../global.module.css';

function Detail() {

    const { id } = useParams(); //extracts the id from the URL
    const [guitarData, setGuitarData] = useState({}); // state to hold the guitar data
    const [description, setDescription] = useState(""); // holds the description of the guitar

    useEffect(() => { // fetches the guitar data from the server when the component mounts

        fetch(`http://localhost:3000/guitars/${id}`) // fetches the guitar data from the server using the id from the URL
            .then(response => response.json()) // parses the response as JSON
            .then(data => {
                setGuitarData(data);
                setDescription(data.description); 
            });

    }, []);

    return (
        // displays the guitar data
        <main className={g['container']}>
            <div className={g['grid-container']}>
                <div className={g['col-4']}>
                    <img src={`http://localhost:3000/images/${guitarData.image_name}`} alt="Placeholder" />
                </div>
                <div className={g['col-8']}>
                <Link to="/" className={`${g['button']} ${g['small']}`}>&lt; back to list</Link>
                <h1 className={`${g["h2"]} ${g["inline-flex"]} ${g["items-center"]}`}> {guitarData.name}</h1>
                    <p>{parse(description ?? "")}</p>
                </div>
            </div>
        </main>
    );

}

export default Detail;