import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // ✅ Corrected import
import GuitarFilters from '../components/GuitarFilters';
import AddGuitar from '../components/AddGuitar';
import UpdateGuitar from '../components/UpdateGuitar';
import DeleteGuitar from '../components/DeleteGuitar';
import g from '../global.module.css';
import at from './AllGuitars.module.css';

function AllGuitars() {
    const [guitars, setGuitars] = useState([]); // Stores the list of guitars fetched from the server

    const fetchGuitars = async () => {
        try {
            const response = await fetch('http://localhost:3000/guitars', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt-token")}` // Sends the JWT token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch guitars');
            }

            const data = await response.json();
            setGuitars(data);
        } catch (err) {
            console.error('Error fetching guitars:', err.message);
        }
    };

    const handleUpdatedGuitars = (guitarsArray) => {
        setGuitars(guitarsArray);
    };

    useEffect(() => {
        fetchGuitars();
    }, []);

    return (
        <main className={g['container']}>
            <div className={g['grid-container']}>
                <div className={g['col-3']}>
                    <h3>Filters</h3>
                    <GuitarFilters updateGuitars={handleUpdatedGuitars} />
                </div>
                <div className={g['col-9']}>
                    <div className={`${g['flex']} ${g['space-between']} ${g['items-center']}`}>
                        <h3>Guitars</h3>
                        <AddGuitar onGuitarAdded={fetchGuitars} /> 
                    </div>
                    <div className={g['grid-container']}>
                        {guitars.map(guitar => {
                            return (
                                <div key={guitar.id} className={`${g['col-4']} ${g['flex']} ${g['flex-grow']}`}>
                                    <div className={`${g['card']}`}>
                                        <img
                                            src={`http://localhost:3000/images/${guitar.image_name}`}
                                            alt={guitar.name || 'Guitar'}
                                        />
                                        <div className={g['card-content']}>
                                            <h4 className={at['guitar-title']}>{guitar.name}</h4>
                                            <p>{guitar.description || 'No description available'}</p> {/* ✅ Fallback if no description */}
                                            <div className={at['guitar-actions']}>
                                                <Link to={`/guitars/${guitar.id}`} className={`${g['button']} ${g['small']}`}>
                                                    View
                                                </Link>
                                                <UpdateGuitar onGuitarUpdated={fetchGuitars} guitar={guitar} /> {/* ✅ Renamed prop */}
                                                <DeleteGuitar onGuitarDeleted={fetchGuitars} guitar={guitar} /> {/* ✅ Renamed prop */}
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
    );
}

export default AllGuitars;
