import {
  LIST_EMAILCRM,
  GET_EMAILCRM,
  QActions,
  EmailCRMActions,
  HttpMethod,
  ApiAction,
} from "../store/types";
import { Entity } from "../types";

export function listEmailCRM(result?: TODO) {
  return {
    type: LIST_EMAILCRM,
    payload: result
  }
}

export function getEmailCRM(result?: TODO) {
  return {
    type: GET_EMAILCRM,
    payload: result
  }
}

export function getAction(action: EmailCRMActions,
  id?: number, data?: Entity, query?: string): ApiAction {

  switch (action) {
    case GET_EMAILCRM:
      return {
        type: GET_EMAILCRM,
        endpoint: 'emailcrms/' + id + "?_expand=customer",
        method: HttpMethod.GET,
      }
    case LIST_EMAILCRM:
      return {
        type: LIST_EMAILCRM,
        endpoint: `emailcrms?_expand=customer&${query}`,
        method: HttpMethod.GET,
      }
  }
}
