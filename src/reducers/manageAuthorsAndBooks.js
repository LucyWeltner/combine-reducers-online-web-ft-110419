import {combineReducers} from 'redux'
import uuid from "uuid"

const rootReducer = combineReducers({books: booksReducer, authors: authorsReducer})

export default rootReducer 


function booksReducer (
  state = [],
  action
  ) {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book];

    case "REMOVE_BOOK":
      let idx = state.findIndex(book => book.id === action.id);
      return [...state.slice(0, idx), ...state.slice(idx + 1)];

    default:
      return state;
    }
  }

  function authorsReducer(state = [], action) {
    switch(action.type) {
      case "ADD_BOOK":
        let author = state.find(author => author.authorName === action.book.authorName)
        if (author) {
          return state
        }
        else {
          return [...state, {authorName: action.book.authorName, id: uuid()}];
        }
      case "ADD_AUTHOR":
        return [...state, action.author]
       ;

      case "REMOVE_AUTHOR":
        let idx = state.findIndex(author => author.id === action.id);
        return [...state.slice(0, idx), ...state.slice(idx + 1)];

      default:
        return state;
    }
  }