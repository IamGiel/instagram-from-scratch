export const initialState = null;


export interface IUser {
  _id:string;
  name:string;
  email:string;
  password:null;
  _v:string;
}
export interface IUserContext {
  user: IUser;
  isLogin:boolean
}

interface IAction {
  type:string;
  payload:IUserContext
}

export const reducer = (state:any,action:IAction) => {
  console.log(action)
  console.log(state)
  if(action.type === 'USER'){
    return action.payload;
  } else {
    return state
  }
}