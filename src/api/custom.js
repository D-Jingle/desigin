import axios from '@/libs/api.request'

export const getClientApi = (systemId) => {
  return axios.request({
    url: '/client/' + systemId,
    method: 'get'
  })
}

export const addClientApi = (data) => {
  return axios.request({
    url: '/client/',
    method: 'post',
    data
  })
}

export const deleteClientApi = (systemId) => {
  return axios.request({
    url: '/client/' + systemId,
    method: 'delete'
  })
}

export const changeClientApi = ({ systemId, name }) => {
  let data = {
    systemId,
    name
  }
  return axios.request({
    url: '/client',
    method: 'put',
    data
  })
}
