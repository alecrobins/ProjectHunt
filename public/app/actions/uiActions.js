import request from 'axios'
import { backend_url } from '../../../config'
import * as types from '../constants/uiConstants'

export function loginClicked() {
  return {
    type: types.LOGIN_CLICKED,
  }
}