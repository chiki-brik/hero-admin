// import {useHttp} from '../../hooks/http.hook';
import { useCallback, useMemo } from 'react'; // useEffect
import { useSelector } from 'react-redux'; // useDispatch
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';

// import { heroDeleted, fetchHeroes } from './heroesSlice'; // filteredHeroesSelector
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice'; // хук, который будет работать с нашими героями
// этот хук служит для генерации большого количества различных свойств, которые мы можем использовать

const HeroesList = () => {

    // это на самом деле асинхронный код
    const { // объект, который мы получаем из нашего хука
        data: heroes = [], // данные, которые были получены(data) мы запишем в переменную heroes. Поставили сюда знаечние по-умолчанию, чтобы пока данные не получены не было ошибки
        // состояния
        // isFetching, // когда просто обращаемся к серверу(не первое обращение, последующие)
        isLoading, // в первый раз обращаемся к серверу для получения данных
        // isSuccess, // когда данные с успехом загрузились
        isError,
        // error
        // еще параметры isUninitialized + refetch
    } = useGetHeroesQuery(); // просто вызвали хук в теле функционального компонента. без использования useEffect. Весь жизненный цикл уже зашит внутрь этого функционала. Запрос будет выполняться после mount компонента

    const [deleteHero] = useDeleteHeroMutation();

    // добавляем - этого не было
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const filteredHeroes = useMemo(() => { // когда компонент будет перерендериваться наши данные будут каждый раз фильтроваться при помощи этой функции -> поэтмоу используем useMemo
        const filteredHeroes = heroes.slice(); // создаем копию массива с сервера, чтобы не мутировать данные 
        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter]);

    // const filteredHeroes = useSelector(filteredHeroesSelector);
    // const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    // const dispatch = useDispatch();
    // const {request} = useHttp();

    // useEffect(() => {
    //     dispatch(fetchHeroes()); 

    //     // eslint-disable-next-line
    // }, []);

    const onDelete = useCallback((id) => { 
        // request(`http://localhost:3001/heroes/${id}`, "DELETE")
        //     .then(data => console.log(data, 'Deleted')) 
        //     .then(dispatch(heroDeleted(id)))
        //     .catch(err => console.log(err));
        deleteHero(id);
        // eslint-disable-next-line  
    }, []);  // [request]

    if (isLoading) { //(heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (isError) { //(heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;