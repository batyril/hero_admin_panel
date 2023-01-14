import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteHeroes,
} from '../../redux/actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

function HeroesList() {
  const { heroes, heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onDeleteHeroes = (id) => {
    const filteredHeroes = heroes.filter((item) => item.id !== id);
    dispatch(deleteHeroes(filteredHeroes));
  };

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  }
  if (heroesLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Героев пока нет</h5>;
    }
    return arr.map(({ id, ...props }) => (
      <HeroesListItem onDelete={() => onDeleteHeroes(id)} key={id} {...props} />
    ));
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
}

export default HeroesList;
