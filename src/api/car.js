import axios from '@/libs/api.request'

export const getCarApi = (systemId) => {
  return axios.request({
    url: '/car/' + systemId,
    method: 'get'
  })
}

export const addCarApi = ({ name, number }) => {
  let data = {
    name,
    number
  }
  return axios.request({
    url: '/car',
    method: 'post',
    data
  })
}

export const deleteCarApi = (systemId) => {
  return axios.request({
    url: '/car/' + systemId,
    method: 'delete'
  })
}

export const changeCarApi = ({ systemId, name, number, status }) => {
  let data = {
    systemId,
    name,
    number,
    status
  }
  return axios.request({
    url: '/car',
    method: 'put',
    data
  })
}
