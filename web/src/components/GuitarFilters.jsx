import { useState, useEffect } from 'react'; 
import tf from './GuitarFilters.module.css'; 
import g from '../global.module.css'; 


function GuitarFilters({ updateGuitars }) {
    const [brands, setBrands] = useState([]); // / stores the list of brands fetched from the server

   
    useEffect(() => { // fetches the list of brands from the server when the component mounts
        fetch("http://localhost:3000/brands")
            .then((response) => response.json()) // parses the response as JSON
            .then((data) => {
                setBrands(data); // updates the state with the fetched brands
            });
    }, []); 

    
    const handleFilterSubmit = (event) => { // handles the form submission for filtering guitars
        event.preventDefault(); 

       
        const filterFormData = new FormData(event.target); // creates a FormData object from the form submission
        const selectedBrands = filterFormData.getAll("brands"); // gets all selected brand IDs

        
        const queryStringArray = selectedBrands.map((id) => `brands=${id}`); // creates an array of query strings for each selected brand
        const queryString = queryStringArray.join("&"); // joins the array into a single query string

        
        fetch(`http://localhost:3000/guitars?${queryString}`) // this fetches the filtered guitars from the server
            .then((response) => response.json()) // parses the response as JSON
            .then((data) => {
                updateGuitars(data); // updates the parent component with the filtered guitars
            });
    };

    return (
        <div className={tf['filters-container']}>
            <form onSubmit={handleFilterSubmit}>
                <div className={g['form-group']}>
                    <h4>Brands</h4>
                    {brands.map((brand) => {
                        return (
                            <label key={brand.id}>
                                <input type="checkbox" name="brands" value={brand.id} />
                                {brand.name}
                            </label>
                        );
                    })}
                    <input type="submit" value="Apply" className={g['button']} />
                </div>
            </form>
        </div>
    );
}


export default GuitarFilters;