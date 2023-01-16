import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { filteredHeroes } from '../../redux/actions';
import { useHttp } from '../../hooks/http.hook';

const getClassButton = (filter) => {
  switch (filter) {
    case 'fire':
      return 'btn-danger';
    case 'water':
      return 'btn-primary';
    case 'wind':
      return 'btn-success';
    case 'earth':
      return 'btn-secondary';
    case 'all':
      return 'btn-outline-dark';
    default:
      return '';
  }
};

function HeroesFilters() {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('all');
  const { request } = useHttp();
  const getFilterHeroesRequest = async () => {
    try {
      if (activeFilter === 'all') {
        const res = await request(`http://localhost:3001/heroes`);
        dispatch(filteredHeroes(res));
        return;
      }
      const res = await request(
        `http://localhost:3001/heroes?element=${activeFilter}`
      );
      dispatch(filteredHeroes(res));
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getFilterHeroesRequest();
  }, [activeFilter]);
  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>
          {filters.map(([filter, text]) => (
            <button
              onClick={() => {
                setActiveFilter(filter);
                getFilterHeroesRequest();
              }}
              key={uuidv4()}
              type='button'
              className={`btn ${getClassButton(filter)} ${
                activeFilter === filter ? 'active' : ''
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroesFilters;
