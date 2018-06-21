import { handle } from "redux-pack";

const blankFilter = {
  id: '',
  op: '',
  value: ''
};

const filters = (state = [
  blankFilter
], action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_FILTER":
      return state.map((filter, index)=>{
        if (index === action.id) {
          return {
            ...filter,  
            [action.name]: action.value
          }
        } else {
          return filter;
        }
      })
    case "ADD_FILTER": 
      let newArray = state.slice();
      newArray.push(blankFilter);
      return newArray;
    case "REMOVE_FILTER":
      return state.filter((filter, i) => i !== action.id);
    case "FETCH_INSPECTION":
      return handle(state, action, {
        success: () => {
          const {data} = payload;
          return data.filters;
        }
      });
    default:
      return state;
  }
}

export default filters;
