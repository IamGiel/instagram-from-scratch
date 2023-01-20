export const ribbon = (message:string) => {
  return (
    
      <div  className="bg-yellow-500 origin-top float-right mt-9 mr-9 w-72 text-center" style={{ transform: 'translateX(50%) rotate(45deg)' }}>
        <div className="">{message}</div>
      </div>
    
  )
}