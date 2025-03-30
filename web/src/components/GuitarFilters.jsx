import { useState, useEffect } from 'react';

import tf from './GuitarFilters.module.css';
import g from '../global.module.css';



function GuitarFilters ( { updateTapes } ) {

    const [ brands, setBrands ] = useState([]);

    useEffect( () => {

        fetch("http://localhost:3000/brands")
            .then( (response) => response.json() )
            .then( data => {
                setBrands(data);
            });

    }, []);

    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const fitlerFormData = new FormData(event.target);
        const selectedBrands = fitlerFormData.getAll("brands");

        const queryStringArray = selectedBrands.map( (id) => `brands=${id}`);
        const queryString = queryStringArray.join("&")

        fetch(`http://localhost:3000/guitars?${queryString}`)
            .then( (response) => response.json() )
            .then( (data) => {
                updateTapes(data);
            });

    }

    return (
        <div className={tf['filters-container']}>
            <form onSubmit={handleFilterSubmit}>
                <div className={g['form-group']}>
                    <h4>Brands</h4>
                    { brands.map(brand => {
                        return (
                            <label key={brand.id}>
                                <input type="checkbox" name="brands" value={brand.id} />
                                { brand.name }
                            </label>
                        )
                    })}
                    <input type="submit" value="Apply" className={g['button']} />
                </div>
            </form>
        </div>
    );
};

export default GuitarFilters;