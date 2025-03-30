import { useEffect, useState } from "react";
import { Link } from "react-router";    
import { useParams } from "react-router";
import parse from 'html-react-parser';

import g from '../global.module.css';

function Detail() {

    const { id } = useParams();

    const [tapeData, setTapeData] = useState({});
    const [description, setDescription] = useState("");

    useEffect(() => {   

        // Fetch the tape with the id
        fetch(`http://localhost:3000/guitars/${id}`)
            .then(response => response.json())
            .then(data => {
                setTapeData(data);
                setDescription(data.description);
            });

    }, []);

    return (
        <main className={g['container']}>
            <div className={g['grid-container']}>
                <div className={g['col-12']}>

                </div>
                <div className={g['col-4']}>
                    <img src={`http://localhost:3000/images/${tapeData.image_name}`} alt="Placeholder" />
                </div>
                <div className={g['col-8']}>
                <Link to="/" className={`${g['button']} ${g['small']}`}>&lt; back to list</Link>
                <h1 className={`${g["h2"]} ${g["inline-flex"]} ${g["items-center"]}`}> {tapeData.name}</h1>
                    <p>{parse(description ?? "")}</p>
                </div>
            </div>
        </main>
    );

}

export default Detail;