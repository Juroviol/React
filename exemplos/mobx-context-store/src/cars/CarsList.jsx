import React from 'react';
import PropTypes from 'prop-types';

const CarsList = (props) =>
    <table style={{width: '100%'}}>
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {props.cars.map(car => (
            <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.price}</td>
            </tr>
        ))}
        </tbody>
    </table>;

CarsList.propTypes = {
    cars: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }))
}

CarsList.defaultProps = {
    cars: []
}

export default CarsList;