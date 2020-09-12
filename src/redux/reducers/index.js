import { combineReducers } from "redux";

import CommonReducer from './CommonReducer';
import ModuleRedux from './ModuleReducer';
import PhaseReducer from './PhaseReducer';
import PracticeReducer from './PracticeReducer';
import WordReducer from './WordReducer';

export default combineReducers({
    common: CommonReducer,
    modules: ModuleRedux,
    phases: PhaseReducer,
    practices: PracticeReducer,
    words: WordReducer,
});
