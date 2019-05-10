import axios from '@/libs/api.request'

export const getDeliveryApi = (systemId) => {
  return axios.request({
    url: '/delivery/' + systemId,
    method: 'get'
  })
}

export const addDeliveryApi = (data) => {
  return axios.request({
    url: '/delivery',
    method: 'post',
    data
  })
}

export const changeDeliveryApi = (data) => {
  return axios.request({
    url: '/delivery',
    method: 'put',
    data
  })
}

export const deleteDeliveryApi = (systemId) => {
  return axios.request({
    url: '/delivery/' + systemId,
    method: 'delete'
  })
}

export const getDeliveryByEmployeeIdApi = (systemId) => {
  return axios.request({
    url: '/delivery/' + systemId,
    method: 'get'
  })
}
