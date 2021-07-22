import { createStore, combineReducers, applyMiddleware,  } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { chatReducer, systemReducer } from "./reducers";
import { customerReducer } from "../reducers/customer";
import { authReducer } from "../reducers/auth";
import { orderReducer } from "../reducers/order";
import { productReducer } from "../reducers/product";
import { emailcrmReducer } from "../reducers/emailcrm";

const rootReducer = combineReducers({
  customer: customerReducer,
  auth: authReducer,
  order: orderReducer,
  product: productReducer,
  emailCrm: emailcrmReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [ thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
