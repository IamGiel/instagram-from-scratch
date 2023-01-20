import { useContext, useEffect, useState } from 'react'
import { IBlogCard } from '../create/create'
import moment from 'moment'
import { heartIcon } from '../../assets/heartIcon'
import { viewIcon } from '../../assets/viewIcon'
import { threedotHorizontalIcon } from '../../assets/threedotHorizontalIcon'
import { Dropdown } from '../../components/dropdown'
import { deleteAPost, getAllPost, getMyPosts } from '../../fetch/apiCalls'
import { UserContext } from '../../App'
import { sleep } from '../../Utils/sleep'
import { spinnerIcon } from '../../assets/spinnerIcon'
import { ribbon } from '../../assets/ribbon'

export const MyBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const {state, dispatch} = useContext(UserContext)
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    const tok = localStorage.getItem('token')
    // console.log(state)
    getMyblogs()
  }, [])


  const onDeleteBlog = (postToDelete:any) => {    
    let tok = localStorage.getItem("token");
    const headers = { 
      'Authorization': `Bearer ${tok}`, 
      'Content-Type': 'application/json'
    }
    const payload = {
      postToDelete,
      headers
    }

   
    deleteAPost(payload, headers)
    .then(res => {
      console.log(res)
      getMyblogs()
    })
    .catch(error => console.log('error', error));
    
  }

  const getMyblogs = () => {
    let tok = localStorage.getItem("token");
    const headers = { 
      'Authorization': `Bearer ${tok}`, 
      'Content-Type': 'application/json'
    }
    // loading true
    setisLoading(true)
    sleep(1500).then(res=> {
      console.log(res)
      getMyPosts(headers)
      .then((res)=> {
        // loading false
        setisLoading(false)
        console.log('getting all blogs using apiCAll ', res)
        setBlogs(res)
      }).catch((err)=> {
        // loading false
        setisLoading(false)
        console.log(err)
      })
    })
   
  }

  return (
   <>
    {blogs && !isLoading && <div className="blog-container">
      <div className='ribbon'>{ribbon('hey there Ribbon here!')}</div>
    <div className="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Library</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {blogs.map((post:IBlogCard, idx:any) => (
            <div key={idx} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              {/* <div>{JSON.stringify(post)}</div> */}
              <div className='threedot flex flex-row justify-between p-[12px] m-[12px]'>
                <div>{state && state.user && (state.user._id === post.postedBy._id) && <p>My Post</p>}</div>
                <div><Dropdown action={onDeleteBlog} data={post} /></div>
              </div>
              <div className="flex-shrink-0">
                {/* <span>{post.imageURL}</span> */}
                <img className="max-h-[300px] w-full object-contain" src={post.imageURL} alt="media" />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href='#' className="hover:underline">
                      {post.labelled.name}
                    </a>
                  </p>
                  <a href='#' className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">{post.imageTitle}</p>
                    <p className="mt-3 text-base text-gray-500">{post.description}</p>
                  </a>
                </div>
                <div className="mt-6 flex flex-row justify-between">
                  <div className="profileInfo flex flex-row">
                    <div className="flex-shrink-0">
                      <a href='#'>
                        <span className="sr-only">{post.profilePic}</span>
                        <img className="h-10 w-10 rounded-full" src={post.profilePic} alt="" />
                      </a>
                    </div>
                    <div className="ml-3">
                      <p className="flex text-sm font-medium text-gray-900">
                        <a href='#' className="hover:underline">
                          {post.postedBy.name}
                        </a>
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.date}>{moment(`${post.date}`).format("MMM Do YY")}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.assigned.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="likesInfo flex flex-row">
                    <div className="flex-shrink-0">
                      <a href='#'>
                        <span className="sr-only">Loves</span>
                        {heartIcon()}
                      </a>
                    </div>
                    <div className="flex-shrink-0">
                      <a href='#'>
                        <span className="sr-only">Loves</span>
                        {viewIcon()}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>}
    {isLoading && <div className='loaderContainer flex flex-row justify-center p-[12px]'>
      {spinnerIcon()}
    </div>
  }
   </>
  )
}