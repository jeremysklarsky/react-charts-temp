import $ from "jquery";
import _ from "lodash";

export const setPixelID = pixelID => {
  return { type: "SET_PIXEL_ID", pixelID }; 
}

export const setInspectionID = inspectionID => {
  return { type: "SET_INSPECTION_ID", inspectionID };
}

export const setSessionID = session_id => {
  return { type: "SET_SESSION_ID", session_id };
}

export const fetchSessionID = () => {
  return { type: "FETCH_SESSION_ID", promise: fetch_session_id()}
};

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

export const selectModule = module => {
  return { type: "SELECT_MODULE", module };
};

export const createNewInspection = (pixelID, sessionID, filters) => {
  return { type: "CREATE_INSPECTION", promise: create_inspection(pixelID, sessionID, filters)};
}

export const setFilter = (name, value, id) => {
  return { type: "SET_FILTER", name, value, id};
}

export const addFilter = () => {
  return { type: "ADD_FILTER"};
}

export const removeFilter = (id) => {
  return { type: "REMOVE_FILTER", id};
}

export const setFetchStatus = (shouldFetch) => {
  return { type: "SET_FETCH_STATUS", shouldFetch};
}

export const resetUI = (pixelID) => {
  return { type: "RESET_UI", pixelID };
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

const create_inspection = (pixelID, sessionID, filters) => {
  const requestBody = {
    "pixel_id" : parseInt(pixelID,10),
    "session_id": sessionID,
    "bucket_size_in_seconds" : 30,
    "filters": filters
  };

  return fetch("https://api.dev.datasvc.mediamath.com/dmp/v2.0/event_inspector/inspections", {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  }).then(
    response => response.json()
  );
}

const fetch_session_id = () => {
  $.ajax({
    url: "https://t1.mediamath.com/api/v2.0/session",
    data: {},
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    success: function (response) {
      debugger;
    },
    error: function () {
    }
  });

}