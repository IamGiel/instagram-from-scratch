import { ReactNode, useContext } from "react"
import { UserContext } from "../App"
import { Props } from "../interfaces/interfaces"

export const ProtectedRoute = ({ tooltipMsg, children }:Props) => {
  const {state,dispatch} = useContext(UserContext)
  return (
    <div>
      <p>This is props: {}</p>
      <p>This is STATE: {JSON.stringify(state)}</p>
      {children}
    </div>
  )
}