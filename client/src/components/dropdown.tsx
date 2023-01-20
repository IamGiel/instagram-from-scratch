import { Menu, Transition } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { threedotHorizontalIcon } from '../assets/threedotHorizontalIcon'


export const Dropdown =(props?:any)=> {
  const {state, dispatch} = useContext(UserContext)
  const [isUsersOwnPost, setisUsersOwnPost] = useState(false)

  useEffect(() => {
    setisUsersOwnPost(state?.user?._id === props?.data?.postedBy?._id)
    console.log(props, isUsersOwnPost)
  }, [])
  

  const onDelete = (evt:any, id:any) => {
    evt.preventDefault()
    props.action(id)
  }

  return (
    <Menu>
      <Menu.Button>{threedotHorizontalIcon()}</Menu.Button>
      <Transition 
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0">
        <Menu.Items className="flex flex-col top-[58px] transform -translate-y-full absolute right-[-10px] w-[max-content] p-[12px] origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${active && 'bg-blue-500'}`}
                href="/account-settings"
              >
                Hide Post from this user
              </a>
            )}
          </Menu.Item>
          {(isUsersOwnPost)  && 
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && 'bg-blue-500'}`}
                  href="#"
                  onClick={(e)=>onDelete(e, props.data._id)}
                >
                  Delete my blog 
                </a>
              )}
            </Menu.Item>
          }
          {/* <Menu.Item disabled>
            <span className="opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item> */}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}