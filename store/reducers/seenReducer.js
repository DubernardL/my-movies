const initialState = { seenMovies: [] }

function toggleSeen(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'TOGGLE_SEEN':
      const seenFilmIndex = state.seenMovies.findIndex(item => item.id === action.value.id)
      if(seenFilmIndex !== -1) {
        // suppression du film des favoris
        nextState = {
          ...state,
          seenMovies: state.seenMovies.filter( (item, index) => index !== seenFilmIndex)
        }
      }
      else {
        // Ajoute le film dans les favoris
        nextState = {
          ...state,
          seenMovies: [...state.seenMovies, action.value]
        }
      }
      return nextState || state

    default:
    return state
  }
}

export default toggleSeen
