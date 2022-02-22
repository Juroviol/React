import React, {useCallback, useContext} from 'react';
import CarsListFilter from "./CarsListFilter";
import CarsContext from "./context/CarsContext";
import {observer} from 'mobx-react';

const CarsListFilterContainer = () => {

    const store = useContext(CarsContext);

    const handleSearch = useCallback((value) => {
        store.setFilter(value);
    }, []);

    return <CarsListFilter onSearch={handleSearch}/>

};

export default observer(CarsListFilterContainer);