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
  id: '',
  filters: [{
    "id": '',
    "op": '',
    "value": ''
  }]
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INSPECTION":
      return handle(state, action, {
        success: () => {
          const {data} = payload;
          const pixelLoads = data["event-count-buckets"].slice(0,500);
          const lastUpdated = pixelLoads.length ? pixelLoads[pixelLoads.length - 1][0] : null;

          return {
            ...payload.data,
            "event-count-buckets": pixelLoads,
            lastUpdated: lastUpdated ? moment.unix(new Date(lastUpdated)).format("lll"): "N/A",
            id: action.meta.id
          }
        }
      });
    default:
      return state;
  }
};

export default inspection;
