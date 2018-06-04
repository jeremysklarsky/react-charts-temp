import { combineReducers } from "redux";
import { handle } from "redux-pack";

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
  "distinct-user-count": 0
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INSPECTION":
      return handle(state, action, {
        success: () => {
          return payload.data;
        }
      });
    default:
      return state;
  }
};

const selectedChart = (state = 0, action) => {
  const { type } = action;
  switch (type) {
    case "SELECT_CHART":
      return action.attrId;
    default:
      return state
  }
};

const rootReducer = combineReducers({
  inspection,
  selectedChart
});

export default rootReducer;
