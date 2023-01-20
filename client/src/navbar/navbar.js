import { Fragment, useContext, useEffect, useState } from 'react'
import { Menu, Popover, Transition, Disclosure } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  // console.log('Navbar Com sadad p');
  const navigate = useNavigate();

  const [user, setUser] = useState(null)
  const [loginStatus, setLoginStatus] = useState(false)
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    const isLoggedIn = state?.user?._id ? true : false;
    setLoginStatus(isLoggedIn)
    setUser(JSON.parse(loggedUser))
    
  },[loginStatus, state])

  useEffect(()=>{console.log(state)},[state])

  const handleClick = (evt, linkto) => {
    evt.preventDefault();
    navigate(`/${linkto}`);
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('isLogin')
    localStorage.clear()
    dispatch({type:'CLEAR'})
    
    setLoginStatus(false)
    navigate('/home')
  }

  const navigation = [
    {'name':'Home','href':loginStatus ? 'blog' : 'home', 'show':loginStatus ? false : true},
    {'name':'Create','href':'create', 'show':loginStatus ? true : false},
    {'name':'Blogs','href':'blog', 'show':true},
    {'name':'My Library','href':'myblogs', 'show':loginStatus ? true : false}
    // {'name':'Login','href':'login', 'show':!loginStatus ? true : false},
    // {'name':'Signup','href':'signup','show':user?.name ? false : true}
  ]

  const BUTTON = (item) => {
   
    return (
      <button
        type='button'
        onClick={(e)=>handleClick(e,item.href)}
        className={classNames(
        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'px-3 py-2 rounded-md text-sm font-medium'
      )}
      aria-current={item.current ? 'page' : undefined}
    >
      {item.name}
    </button>
    )
  } 

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
        {/* <p className='text-white'>{JSON.stringify(state,null,4)}</p> */}
        {/* <p className='text-white'>login status: {!loginStatus ? 'no login status' : 'user is logged in'}</p> */}
          <div className="mx-auto w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => item.show ? (BUTTON(item)) : null)}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 flex flex-row gap-[12px]">
                  <div>
                    {!state && 
                      <Menu.Button className="p-[12px] m-[12px] flex rounded-full bg-gray-800 text-sm ">
                        <span className="text-white">Get Started</span>
                        
                        
                      </Menu.Button>
                    }
                    {state && 
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        
                        <img
                          className="h-8 w-8 rounded-full"
                          src={state.user.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
                    }
                    
                  </div>
                  {state && state.user && state.user.name && <div className='text-white'>Hello, {state?.user.name}</div>}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                     {
                      loginStatus && <>
                         <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/profile`}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={null}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={(evt)=>logout(evt)}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                      </>
                     }
                     
                     {
                      !loginStatus && <>
                         <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={'/login'}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign in
                          </Link>
                        )}
                      </Menu.Item>
                      </>
                     }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <button
                  type='button'
                  onClick={(e)=>handleClick(e,item.href)}
                  key={item.name}
                  
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )


}