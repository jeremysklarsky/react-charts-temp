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

// Selectors
export const activeInspections = ({ inspectionsList }) => {
  return inspectionsList.map((inpsection, i) => {
    return { key: i, text: inpsection.uuid, value: inpsection.uuid };
  });
}

export default inspectionsList;