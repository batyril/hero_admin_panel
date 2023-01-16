import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
} from '../../redux/actions';
import { useHttp } from '../../hooks/http.hook';

const defaultSelectValue = 'default';
const defaultValue = '';
function HeroesAddForm() {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [textareaValue, setTextareaValue] = useState(defaultValue);
  const options = useSelector((state) => state.filters);
  const [textSelectValue, setTextSelectValue] = useState(defaultSelectValue);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const clearForm = () => {
    setInputValue(defaultValue);
    setTextareaValue(defaultValue);
    setTextSelectValue(defaultSelectValue);
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
  const postHeroesRequest = async (heroes) => {
    try {
      await request(
        `http://localhost:3001/heroes`,
        'POST',
        JSON.stringify(heroes)
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const heroes = {
      id: uuidv4(),
      name: inputValue,
      description: textareaValue,
      element: textSelectValue,
    };
    await postHeroesRequest(heroes);
    await getHeroes();
    clearForm();
  };

  return (
    <form onSubmit={onSubmit} className='border p-4 shadow-lg rounded'>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label fs-4'>
          Имя нового героя
        </label>
        <input
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
          required
          type='text'
          name='name'
          className='form-control'
          id='name'
          placeholder='Как меня зовут?'
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='text' className='form-label fs-4'>
          Описание
        </label>
        <textarea
          value={textareaValue}
          onChange={(event) => setTextareaValue(event.target.value)}
          required
          name='text'
          className='form-control'
          id='text'
          placeholder='Что я умею?'
          style={{ height: '130px' }}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='element' className='form-label'>
          Выбрать элемент героя
        </label>
        <select
          value={textSelectValue}
          onChange={(event) => setTextSelectValue(event.target.value)}
          required
          className='form-select'
          id='element'
          name='element'
        >
          <option value='default'>Я владею элементом...</option>
          {options
            .filter(({ filter }) => filter !== 'all')
            .map(({ filter, text }) => (
              <option key={uuidv4()} value={filter}>
                {text}
              </option>
            ))}
        </select>
      </div>

      <button type='submit' className='btn btn-primary'>
        Создать
      </button>
    </form>
  );
}

export default HeroesAddForm;
