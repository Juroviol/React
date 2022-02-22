import React from 'react';
import CarsStore from "./store/CarsStore";
import CarsListContainer from "./CarsListContainer";
import CarsListFilterContainer from "./CarsListFilterContainer";

const CarsScene = () => (
    <CarsStore>
        <div style={{margin: 'auto', width: '20%'}}>
            <CarsListFilterContainer/>
            <CarsListContainer/>
        </div>
    </CarsStore>
)

export default CarsScene;