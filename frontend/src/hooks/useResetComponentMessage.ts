import { resetMessage } from "../slices/photoSlice";
import { AppDispatch } from "../store";

// Redux
resetMessage;

export const useResetComponentMessage = (dispatch: AppDispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
