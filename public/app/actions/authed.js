import request from 'axios'
import { backend_url } from '../../../config'
import * as types from '../constants/authedConstants'

export function initAuthed() {
  return {
    type: types.GET_USER,
    promise: request.get(`${backend_url}/api/user`)
  }
}