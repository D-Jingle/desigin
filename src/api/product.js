import axios from '@/libs/api.request'

export const getProductApi = (systemId) => {
  return axios.request({
    url: '/product/' + systemId,
    method: 'get'
  })
}

export const deleteProductApi = (systemId) => {
  return axios.request({
    url: '/product/' + systemId,
    method: 'delete'
  })
}

export const addProductApi = ({ name, count }) => {
  let data = {
    name,
    count
  }
  return axios.request({
    url: '/product',
    method: 'post',
    data
  })
}

export const changeProjectApi = ({ systemId, name, count }) => {
  let data = {
    systemId,
    name,
    count
  }
  return axios.request({
    url: '/product',
    method: 'put',
    data
  })
}
