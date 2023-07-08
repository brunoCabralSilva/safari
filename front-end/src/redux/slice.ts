import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user_login: false,
};

interface IPayloadLogin {
  user_login: boolean,
  user_register: boolean,
  user_reminder: boolean,
  user_DateOfBirth: string,
  user_email: string,
  user_firstName: string,
  user_lastName: string,
};

const slice: Slice = createSlice({
  name: 'safari',
  initialState: INITIAL_STATE,
  reducers: {
    statusLogin(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        user_login: payload,
      };
    },
    statusRegister(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        user_reminder: payload,
      };
    },
    addDataUser(state, { payload }: PayloadAction<IPayloadLogin>) {
      return {
        state,
        ...payload,
      };
    },
  },
});

export default slice.reducer;

export const { statusLogin, statusRegister, addDataUser } = slice.actions;

export const useSlice = (state: any) => {
  return state.slice;
};
