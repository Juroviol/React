import React, {useContext} from 'react';
import CarsList from "./CarsList";
import CarsContext from "./context/CarsContext";
import useService from "../core/useService";
import {getCars} from "./services/CarsService";
import {observer} from 'mobx-react';

const CarsListContainer = () => {

    const store = useContext(CarsContext);

    const [isFetching,] = useService(getCars, {
        autoStart: true,
        onData: (data) => {
            store.setCars(data);
        }
    })


    return <CarsList cars={store.cars.filter(car => car.name.indexOf(store.filter) > -1)}/>
};

export default observer(CarsListContainer);