import request from 'axios'
import { backend_url } from '../../../config'

export function setTempPostData(formData) {
  return {
    type: 'SET_TEMP_POST_DATA',
    formData
  }
}

export function addTempTag(tag){
	return {
		type: 'ADD_TEMP_TAG',
		tag
	}
}

export function removeTempTag(index){
	return {
		type: 'REMOVE_TEMP_TAG',
		index
	}	
}

export function addTempTalent(talent){
	return {
		type: 'ADD_TEMP_TALENT',
		talent
	}
}

export function removeTempTalent(index){
	return {
		type: 'REMOVE_TEMP_TALENT',
		index
	}	
}

export function resetFormState(){
	return {type: 'REST_FORM_STATE'}
}