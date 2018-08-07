import { handle } from "redux-pack";

const inspectionsList = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_INSPECTIONS_LIST":
      return handle(state, action, { success: () => {
          const { data } = payload;
          // TODO: update when inspections list is scoped
          return data.tracking[action.meta.pixelID] || [];
        } });
    default:
      return state;
  }
};

export default inspectionsList;