import React from 'react';

const Search = (props) => {
    const filterUpdate = (value) => {
        //update searchbar filter text
        props.setFilterText(value);
    };

    return (
        <div>
            <input className="input" type="text" placeholder="Search Professors by Subject Taught" 
                onChange = {
                    event => filterUpdate(event.target.value)
                }
            />
            <i></i>
        </div>
    );

};

export default Search;