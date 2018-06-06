import { combineReducers } from "redux";
import { handle } from "redux-pack";
import moment from "moment";

const inspection = (state = {
  pixel: {
    name: '',
    description: ''

  },
  advertiser: {
    name:''
  },
  attributes: [],
  "event-count-buckets": [],
  "distinct-user-count": 0,
  lastUpdated: '',
  id: ''
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INSPECTION":
      return handle(state, action, {
        success: () => {
          const {data} = payload;
          const pixelLoads = data["event-count-buckets"];
          const lastUpdated = pixelLoads[pixelLoads.length - 1][0];
          return {
            ...payload.data,
            lastUpdated: moment.unix(new Date(lastUpdated)).format("lll"),
            id: action.meta.id
          }
        }
      });
    default:
      return state;
  }
};

const inspectionsList = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INSPECTIONS_LIST":
      return handle(state, action, { success: () => {
          const { data } = payload;
          // TODO: update when inspections list is scoped
          return data.tracking[action.meta.pixelID];
        } });

    default:
      return state;
  }
};

const ui = (state = {
  isLoading: true,
  selectedChart: 0,
  pixelID: '',
  inspectionID: ''
}, action) => {
  const { type } = action;
  switch (type) {
    case "FETCH_INSPECTION":
      return handle(state, action, {
        success: () => {
          return {
            ...state,
            isLoading: false
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
      return { ...state, inspectionID: action.inspectionID };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading};
    default:
      return state;
  }
};



const rootReducer = combineReducers({
  inspection,
  inspectionsList,
  ui
});

export default rootReducer;
