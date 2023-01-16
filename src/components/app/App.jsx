import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
} from '../../redux/actions';
import { useHttp } from '../../hooks/http.hook';
import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import './app.scss';

function App() {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const getFilters = async () => {
    try {
      dispatch(filtersFetching());
      const res = await request('http://localhost:3001/filters');
      dispatch(filtersFetched(res));
    } catch (e) {
      dispatch(filtersFetchingError());
    }
  };

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <main className='app'>
      <div className='content'>
        <HeroesList />
        <div className='content__interactive'>
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
}

export default App;
