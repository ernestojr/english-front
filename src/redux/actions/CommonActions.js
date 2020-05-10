import { COMMON } from './types';

export const showDialog = (title = '', content = '', opts = {}) => (dispatch) => {
  dispatch({
    type: COMMON.SHOW_DIALOG,
    payload: {
      id: Date.now(),
      title,
      content,
      show: true,
      opts,
    },
  });
}

export const hideDialog = () => (dispatch) => {
  dispatch({ type: COMMON.HIDE_DIALOG });
}

export const onUnmount = () => (dispatch) => {
  dispatch({ type: COMMON.UNMOUNT_DIALOG });
}
