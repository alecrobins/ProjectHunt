import request from 'axios'
import { backend_url } from '../../../config'

export function setTempPostData(formData) {
  return {
    type: 'SET_TEMP_POST_DATA',
    formData
  }
}

export function setUserTyping(isTyping){
	return {
		type: 'SET_USER_TYPING',
		isTyping
	}
}
