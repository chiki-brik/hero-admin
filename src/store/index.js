import {configureStore} from '@reduxjs/toolkit';
// import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtresSlice';

import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => (next) => (action) => { 
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

const store = configureStore({ 
    reducer: {
                //heroes, 
                filters, 
                [apiSlice.reducerPath]: apiSlice.reducer}, // добавляем новый reducer - программно его генерируем. Это динамическое свойство в объекте. Значение свойства указываем reducer apiSlice.reducer
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware), // подключаем еще один middleware
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;