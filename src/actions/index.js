export const setPixelID = pixelID => {
  return { type: "SET_PIXEL_ID", pixelID }; 
}

export const setInspectionID = inspectionID => {
  return { type: "SET_INSPECTION_ID", inspectionID };
}

export const loadInspection = id => {
  return { type: "FETCH_INSPECTION", promise: fetch_inspection(id), meta: {id} };
};

export const loadInspectionsList = (pixelID) => {
  return { type: "FETCH_INSPECTIONS_LIST", promise: fetch_inspections_list(), meta: {pixelID} };
}

export const selectChart = attrId => {
  return { type: "SELECT_CHART", attrId };
};

export const selectChartType = chartType => {
  return { type: "SELECT_CHART_TYPE", chartType };
};

export const setLoading = isLoading => {
  return { type: "SET_LOADING", isLoading};
}

const fetch_inspection = id => {
  return fetch(`https://api.dev.datasvc.mediamath.com/dmp/v2.0/event_inspector/inspections/${id}`).then(
    response => response.json()
  );
};

const fetch_inspections_list = () => {
  return fetch(`https://api.dev.datasvc.mediamath.com/dmp/v2.0/event_inspector/inspections`).then(
    response => response.json()
  );
};
