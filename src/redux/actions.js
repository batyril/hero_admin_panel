export const heroesFetching = () => ({
  type: 'HEROES_FETCHING',
});

export const filtersFetching = () => ({
  type: 'FILTERS_FETCHING',
});

export const heroesFetched = (heroes) => ({
  type: 'HEROES_FETCHED',
  payload: heroes,
});

export const filtersFetched = (filters) => ({
  type: 'FILTERS_FETCHED',
  payload: filters,
});

export const heroesFetchingError = () => ({
  type: 'HEROES_FETCHING_ERROR',
});

export const filtersFetchingError = () => ({
  type: 'FILTERS_FETCHING_ERROR',
});

export const addHeroes = (heroes) => ({
  type: 'HEROES_ADD',
  payload: heroes,
});

export const deleteHeroes = (id) => ({
  type: 'HEROES_DELETE',
  payload: id,
});

export const filteredHeroes = (heroes) => ({
  type: 'HEROES_FILTERED',
  payload: heroes,
});
