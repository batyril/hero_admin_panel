const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  filtersLoadingStatus: 'idle',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: payload,
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };

    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: payload,
        filtersLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case 'HEROES_ADD':
      return {
        ...state,
        heroes: [...state.heroes, payload],
      };
    case 'HEROES_DELETE':
      return {
        ...state,
        heroes: state.heroes.filter((heroes) => heroes.id !== payload),
      };
    case 'HEROES_FILTERED':
      return {
        ...state,
        heroes: [...payload],
      };
    default:
      return state;
  }
};

export default reducer;
