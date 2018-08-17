import { handle } from "redux-pack";
import React from "react";
import moment from "moment";

const initialState = {
  pixel: {
    name: '',
    description: ''
  },
  advertiser: {
    name: ''
  },
  attributes: [],
  "event-count-buckets": [],
  tempAttributes: [],
  "distinct-user-count": 0,
  lastUpdated: '',
  id: ''
};

const inspection = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INSPECTION":
      return handle(state, action, {
        success: () => {
          const {data} = payload;
          const pixelLoads = data["event-count-buckets"].slice(0,500); //TODO: show all buckets
          const lastUpdated = pixelLoads.length ? pixelLoads[pixelLoads.length - 1][0] : null;

          return {
            ...payload.data,
            tempAttributes: [
              {
                key: 'client_status',
                loads: 7850,
                percent: .79,
                dataType: 'String',
                topValue: 'logged%2Cin'
              },
              {
                key: 'current_rando_id',
                loads: 10000,
                percent: 1.00,
                dataType: undefined,
                topValue: '112839785'
              }              

            ],
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

//Selectors
export const attributeFormatter = (attributes) => {
  const formatters = {
    percent: (n) => n.toLocaleString("en", { style: "percent" }),
    loads: (n) => n.toLocaleString(),
    dataType: (type) => type ? 
      <span><b>Yes ({type})</b></span> : 
      <span>No (n/a)</span>
  }
  return attributes.map(attribute => {
    const formattedAttribute = {}

    Object.keys(attribute).forEach(key => {
      if (formatters[key]) {
        formattedAttribute[key] = formatters[key].call(null, attribute[key]);
      } else {
        formattedAttribute[key] = attribute[key];
      }
    })

    return formattedAttribute;
  });
}

export default inspection;
