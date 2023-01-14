import React from 'react';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

function HeroesFilters() {
  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>
          <button type='button' className='btn btn-outline-dark active'>
            Все
          </button>
          <button type='button' className='btn btn-danger'>
            Огонь
          </button>
          <button type='button' className='btn btn-primary'>
            Вода
          </button>
          <button type='button' className='btn btn-success'>
            Ветер
          </button>
          <button type='button' className='btn btn-secondary'>
            Земля
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroesFilters;
