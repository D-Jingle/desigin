import axios from '@/libs/api.request'

export const getEmployeeApi = (systemId) => {
  return axios.request({
    url: '/employee/' + systemId,
    method: 'get'
  })
}

export const addEmployeeApi = (data) => {
  return axios.request({
    url: '/employee',
    method: 'post',
    data
  })
}

export const deleteEmployeeApi = (systemId) => {
  return axios.request({
    url: '/employee/' + systemId,
    method: 'delete'
  })
}

export const changeEmployeeApi = (data) => {
  return axios.request({
    url: '/employee',
    method: 'put',
    data
  })
}
