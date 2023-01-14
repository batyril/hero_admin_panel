import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addHeroes } from '../../redux/actions';

const defaultSelectValue = 'default';
const defaultValue = '';
function HeroesAddForm() {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [textareaValue, setTextareaValue] = useState(defaultValue);
  const options = useSelector((state) => state.filters);
  const [textSelectValue, setTextSelectValue] = useState(defaultSelectValue);
  const dispatch = useDispatch();
  const clearForm = () => {
    setInputValue(defaultValue);
    setTextareaValue(defaultValue);
    setTextSelectValue(defaultSelectValue);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const heroes = {
      id: uuidv4(),
      name: inputValue,
      description: textareaValue,
      element: textSelectValue,
    };
    dispatch(addHeroes(heroes));
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
          {options.map(([value, text]) => (
            <option key={uuidv4()} value={value}>
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

// + фильтроваться
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST

export default HeroesAddForm;
