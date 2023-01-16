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

function HeroesList() {
  const { heroes, heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const deleteHeroesRequest = async (id) => {
    try {
      await request(`http://localhost:3001/heroes/${id}`, 'DELETE');
      dispatch(deleteHeroes(id));
    } catch (e) {
      console.log(e.message);
    }
  };

  const getHeroes = async () => {
    try {
      dispatch(heroesFetching());
      const res = await request('http://localhost:3001/heroes');
      dispatch(heroesFetched(res));
    } catch (e) {
      dispatch(heroesFetchingError());
    }
  };

  const onDeleteHeroes = async (id) => {
    await deleteHeroesRequest(id);
  };

  useEffect(() => {
    getHeroes();
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
