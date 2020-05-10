import { COMMON } from '../actions/types';

const initialState = {
  opts: {}
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case COMMON.SHOW_DIALOG:
      return payload;
    case COMMON.HIDE_DIALOG:
      return { ...state, show: false };
    case COMMON.UNMOUNT_DIALOG:
      return { opts: {} };
    default:
      return state;
  }
};
