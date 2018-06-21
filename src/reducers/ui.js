import { handle } from "redux-pack";

const ui = (state = {
  isLoading: true,
  selectedChart: 0,
  pixelID: '',
  inspectionID: '',
  shouldFetch: true,
  fetchedFilters: []
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INSPECTION":
      return handle(state, action, {
        success: () => {
          const {data} = payload;
          return {
            ...state,
            isLoading: false,
            fetchedFilters: data.filters
          };
        }
      });
    case "SELECT_CHART":
      return { 
        ...state,
        selectedChart: action.attrId,
      };
    case "SET_PIXEL_ID":
      return {...state, pixelID: action.pixelID};
    case "SET_INSPECTION_ID":
      return { ...state, isLoading: true, inspectionID: action.inspectionID };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading};
    case "SET_FETCH_STATUS":
      return { ...state, shouldFetch: action.shouldFetch};
    case "FETCH_INSPECTIONS_LIST":
      return handle(state, action, {
        success: () => {
          const { data } = payload;
          return { ...state, inspectionID: data.tracking[action.meta.pixelID][0].uuid };          
        }
      });
    case "CREATE_INSPECTION":
      return handle(state, action, {
        start: () => {
          return {
            ...state,
            isLoading: true
          }
        },
        success: () => {
          return {
            ...state,
            inspectionID: action.payload.data.request_id
          }
        }
      });
      
    default:
      return state;
  }
};

export default ui;