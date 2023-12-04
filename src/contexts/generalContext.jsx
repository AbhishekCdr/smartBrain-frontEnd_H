import { createContext, useReducer } from "react";

const createAction = (type, payload) => ({ type, payload });

export const GeneralContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const ACTION_TYPES = {
  SET_IMAGE: "SET_IMG",
  GET_IMAGE_RESULT: "GET_IMAGE_RESULT",
  SIGN_SESSION: "SIGN_SESSION",
  LOAD_USER: "LOAD_USER",
};

const INITIAL_STATE = {
  imageUrl: "",
  imageResult: "",
  isSigned: false,
  loadUser: {
    id: "",
    name: "Guest",
    email: "",
    entries: 0,
    joined: "",
  },
};

const imageReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_IMAGE:
      return {
        ...state,
        imageUrl: payload,
      };
    case ACTION_TYPES.GET_IMAGE_RESULT:
      return {
        ...state,
        imageResult: payload,
      };
    case ACTION_TYPES.SIGN_SESSION:
      return {
        ...state,
        isSigned: payload,
      };
    case ACTION_TYPES.LOAD_USER:
      return {
        ...state,
        loadUser: payload,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const GeneralProvider = ({ children }) => {
  const [{ imageUrl, imageResult, isSigned, loadUser }, dispatch] = useReducer(
    imageReducer,
    INITIAL_STATE
  );

  const setImageUrl = (img) =>
    dispatch(createAction(ACTION_TYPES.SET_IMAGE, img));

  const setImageResult = (result) =>
    dispatch(createAction(ACTION_TYPES.GET_IMAGE_RESULT, result));

  const setIsSigned = (bool) =>
    dispatch(createAction(ACTION_TYPES.SIGN_SESSION, bool));

  const setLoadUser = (user) =>
    dispatch(createAction(ACTION_TYPES.LOAD_USER, user));

  const value = {
    imageUrl,
    setImageUrl,
    imageResult,
    setImageResult,
    isSigned,
    setIsSigned,
    loadUser,
    setLoadUser,
  };

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  );
};
