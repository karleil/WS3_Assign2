import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import GuitarFilters from '../components/GuitarFilters';
import AddGuitar from '../components/AddGuitar';
import UpdateGuitar from '../components/UpdateGuitar';
import DeleteGuitar from '../components/DeleteGuitar';
import g from '../global.module.css';
import at from './AllGuitars.module.css';


function AllGuitars() {

    const [guitars, setGuitars] = useState([]); // stores the list of guitars fetched from the server

    
    const fetchGuitars = async () => {  // fetches the list of guitars from the server
        fetch('http://localhost:3000/guitars/')
            .then(response => response.json()) // parses the response as JSON
            .then(data => setGuitars(data)); // updates the state with the fetched guitars
    }

    const handleUpdatedGuitars = (guitarsArray) => { // updates the list of guitars when filters are applied
        setGuitars(guitarsArray);
    }

    
    useEffect(() => { // fetches the list of guitars from the server when the component mounts

        fetchGuitars();

    }, []);

    return (
        
        <main className={g['container']}>
            <div className={g['grid-container']}>
                <div className={g['col-3']}>
                        {/* pass the function to the GuitarFilters component */}
                        <h3>Filters</h3>
                        <GuitarFilters updateGuitars={handleUpdatedGuitars} /> 
                </div>
                <div className={g['col-9']}>
                    <div className={`${g['flex']} ${g['space-between']} ${g['items-center']}`}>
                        <h3>Guitars</h3>
                        {/* passes the funciton to the AddGuitar component */}
                        <AddGuitar onTapeAdded={fetchGuitars} />
                    </div>
                    <div className={g['grid-container']}>

                        {guitars.map( guitar => { // maps through the list of guitars and renders each one
                            return (
                                <div key={guitar.id}  className={`${g['col-4']} ${g['flex']} ${g['flex-grow']}`}>
                                    <div className={`${g['card']}`}>
                                        <img src={`http://localhost:3000/images/${guitar.image_name}`} alt="Placeholder" />
                                        <div className={g['card-content']}>
                                            <h4 className={`${at['guitar-title']}`}>{guitar.name}</h4>
                                            <p>{guitar.artist}</p>
                                            <div className={`${at['guitar-actions']}`}>
                                                <Link to={`/guitars/${guitar.id}`} className={`${g['button']} ${g['small']}`}>View</Link>
                                                <UpdateGuitar onTapeUpdated={fetchGuitars} guitar={guitar} />
                                                <DeleteGuitar onTapeDeleted={fetchGuitars} guitar={guitar} />
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

export default AllGuitars;
