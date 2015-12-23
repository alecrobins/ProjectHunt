import request from 'axios'
import { backend_url } from '../../../config'

export function getPosts() {
  return {
    type: 'GET_POSTS',
    promise: request.get(`${backend_url}/api/posts`)
  }
}