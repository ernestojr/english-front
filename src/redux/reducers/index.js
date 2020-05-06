import { combineReducers } from "redux";
import ModuleRedux from './ModuleReducer';
import PhaseReducer from './PhaseReducer';

export default combineReducers({
    modules: ModuleRedux,
    phases: PhaseReducer,
});
