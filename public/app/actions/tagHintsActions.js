import request from 'axios'
import { backend_url } from '../../../config'

export function getTagHints(query) {
  return {
    type: 'GET_TAG_HINT',
    promise: request.get(`${backend_url}/api/tag/${query}`)
  }
}