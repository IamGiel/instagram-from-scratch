import { Props } from "../interfaces/interfaces"

export const Tooltip = ({ tooltipMsg, children }:Props) => {
    return (
        <div className="group flex relative">
         {children}
         <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-[40%] -translate-x-[40%] translate-y-[30px] opacity-0 m-0 mx-auto overflow-hidden whitespace-nowrap">{tooltipMsg}</span>
       </div>
    )
}