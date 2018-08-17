import { combineReducers } from "redux";

import inspection from "./inspection";
import inspectionsList from "./inspectionsList";
import meta from "./meta";
import ui from "./ui";

const appReducer = combineReducers({
  inspection,
  inspectionsList,
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
