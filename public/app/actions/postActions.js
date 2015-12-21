import request from 'axios'

export function getPosts() {
  return {
    type: 'GET_POSTS',
    promise: request.get("http://localhost:3000/api/posts")
  }
}