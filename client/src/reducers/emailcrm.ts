import {
  EmailCRMActionTypes,
  GET_EMAILCRM,
  LIST_EMAILCRM,
  EmailCRMState,
} from "../store/types";
import {EmailCRM, EmailCRMModel} from "../types";

export function emailcrmReducer(
  state: EmailCRMState = {
    isFetching: true,
    emailCrm: new EmailCRMModel(null,"","","","") as EmailCRM, 
    emailCrmList: [],
    deleted: false,
    updated: false,
  },
  action: EmailCRMActionTypes
) {
  // 
  switch (action.type) {
    case LIST_EMAILCRM:
      return Object.assign({}, state, {
        isFetching: false,
        emailCrmList: action.payload,
        errorMessage: "",
        deleted: false,
        updated: false,
      });
    case GET_EMAILCRM:
      console.log('================== reducer emailcrm ==============')
      console.log(action.payload)
      return Object.assign({}, state, {
        isFetching: false,
        emailCrm: action.payload,
        errorMessage: action.error,
        deleted: false,
        updated: false,
      });
    default:
      return state;
  }
}
