import React from "react";
import CarsContext from "../context/CarsContext";
import {useLocalObservable} from 'mobx-react';

const CarsStore = ({children}) => {

    const store = useLocalObservable(() => ({
        cars: [],
        filter: '',
        setCars: (data) => {
            store.cars = data;
        },
        setFilter: (value) => {
            store.filter = value;
        }
    }))

    return (<CarsContext.Provider value={store}>{children}</CarsContext.Provider>)
}

export default CarsStore;