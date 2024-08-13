import { createReducer } from "@reduxjs/toolkit";
// нам понадобятся импортированные actionCreator - чтобы мы автоматически могли подвязывать эти фукнции к reducer, а не компировать эти названия(actions)
import {
    heroesFetched,
    heroesFetching,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// 1й вариант использования команды createReducer
// если используем createReducer, то требуется создавать все action с помощью createAction
const heroes = createReducer(initialState, builder => { // builder - встроенный объект, который позволяет конструировать reducer при помощи встроенных в него методов(3). Третий метод addMatcher - позволяет фильтровать входящий action
    builder
        .addCase(heroesFetching, state => { // эта функция ничего не возвращает. Она запускается и внутри производит какую-то мутацию. Но если прописать впереди return или прописать функцию в одну строчку(что одно и то же) => immerjs уже работать не будет
            state.heroesLoadingStatus = 'loading';
        }) // описываем какой-то случай/action(аналог кейса в старом варианте объявления actons)
        // два аргумента: actionCreator + функция по изменению state(принимает state и action)
        // в toolkit и в createReducer встроена библиотека immerjs, которая при изменении state отвечает за иммутабельность. Т.е. даже если изменить в явном виде state она внутри сделает это иммутабельно
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {}); // пустая функция - state остается прежним, если такой action не найден
})

// 2й вариант использования команды createReducer - короче, но работать будет только в нативном js. В TypeScript уже работать не будет. Тут вторым аргументов будет не функция, а объект, ключами кторого будут actionCreator, а свойствами - выполняемые действия => НЕ РАБОТАЕТ
// const heroes = createReducer(initialState, {
//     // динамически создает ключи объекта(esm6)
//     [heroesFetching]: state => { state.heroesLoadingStatus = 'loading' },
//     [heroesFetched]: (state, action) => {
//                     state.heroesLoadingStatus = 'idle';
//                     state.heroes = action.payload;
//                 },
//     [heroesFetchingError]: state => { state.heroesLoadingStatus = 'error' },
//     [heroCreated]: (state, action) => { state.heroes.push(action.payload) },
//     [heroDeleted]: (state, action) => { state.heroes = state.heroes.filter(item => item.id !== action.payload) }
// }, [], state => state) // 3й аргуемнт - массив функции сравнения. 4й -  функция для действий по-умолчанию(defaultCase)


// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_CREATED':   
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }
//         case 'HERO_DELETED': 
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//             }
//         default: return state
//     }
// }

export default heroes;