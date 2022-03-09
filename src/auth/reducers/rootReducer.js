//the reducer interact with the store and change values whenever it's needed
import {combineReducers} from 'redux';

//session
import {sessionReducer } from "redux-react-session";

const rootReducer = combineReducers({
    session: sessionReducer
});

export default rootReducer;