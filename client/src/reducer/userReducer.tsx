import { IAction } from "../interfaces/interfaces";

export const initialState = null;

export const reducer = (state:any,action:IAction) => {
  console.log(action)
  console.log(state)
  if(action?.type === 'USER'){
    return action.payload;
  } 
  if(action?.type === 'CLEAR'){
    return null;
  } 
  
  else {
    return state
  }
}