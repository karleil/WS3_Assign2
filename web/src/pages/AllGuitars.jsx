import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import GuitarFilters from '../components/GuitarFilters';
import AddGuitar from '../components/AddGuitar';
import UpdateGuitar from '../components/UpdateGuitar';
import DeleteGuitar from '../components/DeleteGuitar';
import g from '../global.module.css';
import at from './AllGuitars.module.css';


function AllTapes() {

    const [tapes, setTapes] = useState([]);

    // We have moved the fetchTapes to a funciton, because we want to call it both when the component mounts and when a new tape is added
    const fetchTapes = async () => {
        fetch('http://localhost:3000/guitars/')
            .then(response => response.json())
            .then(data => setTapes(data));
    }

    const handleUpdatedTapes = (tapesArray) => {
        setTapes(tapesArray);
    }

    // When the component is displayed, fetch the tapes
    useEffect(() => {

        fetchTapes();

    }, []);

    return (
        
        <main className={g['container']}>
            <div className={g['grid-container']}>
                <div className={g['col-3']}>
                        <h3>Filters</h3>
                        <GuitarFilters updateTapes={handleUpdatedTapes} />
                </div>
                <div className={g['col-9']}>
                    <div className={`${g['flex']} ${g['space-between']} ${g['items-center']}`}>
                        <h3>Guitars</h3>
                        {/* Pass the funciton to the AddGuitar component down to the child */}
                        <AddGuitar onTapeAdded={fetchTapes} />
                    </div>
                    <div className={g['grid-container']}>

                        {tapes.map( tape => {
                            return (
                                <div key={tape.id}  className={`${g['col-4']} ${g['flex']} ${g['flex-grow']}`}>
                                    <div className={`${g['card']}`}>
                                        <img src={`http://localhost:3000/images/${tape.image_name}`} alt="Placeholder" />
                                        <div className={g['card-content']}>
                                            <h4 className={`${at['tape-title']}`}>{tape.name}</h4>
                                            <p>{tape.artist}</p>
                                            <div className={`${at['tape-actions']}`}>
                                                <Link to={`/guitars/${tape.id}`} className={`${g['button']} ${g['small']}`}>View</Link>
                                                <UpdateGuitar onTapeUpdated={fetchTapes} tape={tape} />
                                                <DeleteGuitar onTapeDeleted={fetchTapes} tape={tape} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </main>
    )
}

export default AllTapes;
