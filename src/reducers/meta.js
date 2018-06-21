import { handle } from "redux-pack";

const meta = (state = {session_id: ''}, action) => {
  const {type} = action;
  switch (type) {
    case "SET_SESSION_ID":
      return {
        ...state,
        sessionID: action.session_id,
      };
    case "FETCH_SESSION_ID":
      return handle(state, action, {
        success: () => {
          debugger;
          // TODO: update when inspections list is scoped
          return state
        }
      });

    default:
      return state;
  }
}

export default meta;