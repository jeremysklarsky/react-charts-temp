import { combineReducers } from "redux";
import { handle } from "redux-pack";

import filters from "./filters";
import inspection from "./inspection";
import inspectionsList from "./inspectionsList";
import meta from "./meta";
import ui from "./ui";

//selectors
export const canSave = ({filters, ui}) => {
  const allFiltersValid = filters.length && filters.every(filter => filter.value && filter.id && filter.op);
  const filtersChanged = JSON.stringify(ui.fetchedFilters) === JSON.stringify(filters);

  return allFiltersValid && filtersChanged;
}

export const menuItems = (attributes) => {
  const pixelEventLoads = {
    key: menuItems.length + 1,
    text: "Pixel Event Loads",
    value: 0
  };


  let items = attributes.map((attr, i) => {
    return { key: i, text: `${attr.name} - ${attr.key}`, value: attr.id };
  })  
  
  items.unshift(pixelEventLoads);

  return items;
}

export const activeInspections = ({inspectionsList}) => {
  return inspectionsList.map((inpsection, i) => {
    return { key: i, text: inpsection.uuid, value: inpsection.uuid };
  });
}

const appReducer = combineReducers({
  inspection,
  inspectionsList,
  filters,
  meta,
  ui
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_UI") {
    state = undefined;
  }

  return appReducer(state, action);
};


export default rootReducer;
