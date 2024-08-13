import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter(); // функция при вызове вернет объект
// адаптер может в себя принять объект с callback-функциями. Если хотим немного другой алгоритм сортировки, или id хранятся в поле с другим названием (все есть в доке)

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({ // получаем начальное состояние но уже на основании той архитектуры, которая используется в адаптере
    // добавляем объект с теми свойстваим, которые мы хотим добавить к изначальному строенному state
    heroesLoadingStatus: 'idle'
}); 

export const fetchHeroes = createAsyncThunk( 
    'heroes/fetchHeroes', 
    () => {
        const {request} = useHttp(); 
        return request("http://localhost:3001/heroes"); 
    }
);
 
const heroesSlice = createSlice({ 
    name: 'heroes', 
    initialState,
    reducers: { 
        heroCreated: (state, action) => { 
            //state.heroes.push(action.payload) ;
            heroesAdapter.addOne(state, action.payload);
        },
        heroDeleted: (state, action) => { 
            //state.heroes = state.heroes.filter(item => item.id !== action.payload); 
            heroesAdapter.removeOne(state, action.payload); // адаптер сам понимает
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' }) 
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                //state.heroes = action.payload; 
                heroesAdapter.setAll(state, action.payload); // устанавливаем новые данные в множественном количестве(заменяем имеющиеся на эти новые данные)
                // 2 аргумента: 1 - state, куда будем помещать данные, 2 - то, что будет приходить в state 
            }) 
            .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;

// export тут убрали, теперь селектор будем сразу здесь прописывать
const {selectAll} = heroesAdapter.getSelectors(state => state.heroes); // тут есть два вида вызова селекторов(явный/локальный и неявный/глобальный) - есть в доке
// теперь все селекторы будут обращаться сразу к героям, чтобы там не возвращался объект, но массив
// selectAll - один из методов, который достает все сущности из нужного поля state. Всего их около 5 штук разных (выбрать по id и проч)

// создадим селектор тут, чтобы потом его импортировать там где нужно
export const filteredHeroesSelector = createSelector( // хорошим тоном будет создание селектора в одном месте и потом экспорт его в нужные места
    (state) => state.filters.activeFilter, 
    //(state) => state.heroes.heroes, // state.heroes.entities // тут будет объект возвращен, а не массив. Чтобы как раньше был объект, нам нужно воспользоваться встроенными селекторами 
    selectAll, // так же вернет массив с данными/ с героями, который нам нужен
    (filter, heroes) => {  //  heroes будет получаться из функции selectAll
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter)
        }
    }
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;