import { API_PATH } from './apiConstants';
import callToBackend from './axiosHelper';

// Get all posts
export const getAllPost = async () => {
  return await callToBackend('GET', API_PATH.ALL_POSTS);
};

// Get delete a post
export const deleteAPost = async (id:any, headers:any) => {
  return await callToBackend('POST', API_PATH.DELETE_A_POST, null, id, headers);
};
// Get all posts
export const getMyPosts = async (headers:any) => {
  return await callToBackend('GET', API_PATH.MY_POSTS, null, null, headers);
};