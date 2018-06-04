export const loadInspection = id => {
  return { type: "FETCH_INSPECTION", promise: fetch_inspection(id) };
};

export const selectChart = attrId => {
  return { type: "SELECT_CHART", attrId };
};

export const selectChartType = chartType => {
  return { type: "SELECT_CHART_TYPE", chartType };
};

const fetch_inspection = id => {
  return fetch(`https://api.dev.datasvc.mediamath.com/dmp/v2.0/event_inspector/inspections/${id}`).then(
    response => response.json()
  );
};
