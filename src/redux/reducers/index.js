import { combineReducers } from "redux";
import ModuleRedux from './ModuleReducer';
import PhaseReducer from './PhaseReducer';
import PracticeReducer from './PracticeReducer';

export default combineReducers({
    modules: ModuleRedux,
    phases: PhaseReducer,
    practices: PracticeReducer,
});
