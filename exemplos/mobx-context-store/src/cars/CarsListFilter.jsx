import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

const CarsListFilter = (props) => {

    const [value, setValue] = useState();

    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, [])

    const handleSearch = useCallback(() => {
        props.onSearch(value);
    }, [value]);

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <input onChange={handleChange} value={value}/>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

CarsListFilter.propTypes = {
    onSearch: PropTypes.func.isRequired,
}

export default CarsListFilter;