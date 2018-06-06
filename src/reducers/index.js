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
  lastUpdated: ''
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
            lastUpdated: moment.unix(new Date(lastUpdated)).format("lll")
          }
        }
      });
    default:
      return state;
  }
};

const ui = (state = {
  isLoading: true,
  selectedChart: 0
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  inspection,
  ui
});

export default rootReducer;
