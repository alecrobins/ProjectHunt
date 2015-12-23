import request from 'axios'
import * as types from '../constants/postConstants'
import { backend_url } from '../../../config'

export function getPosts() {
  return {
    type: types.GET_POSTS,
    promise: request.get(`${backend_url}/api/posts`)
  }
}

export function createPost(postData) {
  return {
    type: types.CREATE_POST,
    promise: request.post(`${backend_url}/api/posts`, postData)
  }
}