import request from 'axios'
import { backend_url } from '../../../config'

export function getTalentHints(query) {
  return {
    type: 'GET_TALENT_HINT',
    promise: request.get(`${backend_url}/api/talent/${query}`)
  }
}