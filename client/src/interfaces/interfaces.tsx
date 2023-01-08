import { ReactNode } from "react"

export interface Props {
  children?: ReactNode,
  tooltipMsg?:ReactNode,
  // any props that come into the component
}

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

export interface IAction {
  type:string;
  payload:IUserContext
}