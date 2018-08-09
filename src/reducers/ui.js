import { handle } from "redux-pack";

const initialState = {
  isLoading: true,
  selectedChart: 0,
  pixelID: "",
  inspectionID: "",
  shouldFetch: true,
  fetchedFilters: [],
  selectedModule: "Event Loads"
};

const ui = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "RESET_UI": {
      return {...state, pixelID: action.pixelID, isLoading: false}
    }
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
    case "SELECT_MODULE":
      return {
        ...state,
        selectedModule: action.module,
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
          const inspections = data.tracking[action.meta.pixelID];

          return { ...state, inspectionID: inspections ? inspections[0].uuid : '', shouldFetch: true, isLoading: true };          
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
