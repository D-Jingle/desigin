import axios from '@/libs/api.request'

export const getFinanceApi = (systemId) => {
  return axios.request({
    url: '/finance/' + systemId,
    method: 'get'
  })
}

export const changeFinanceApi = (data) => {
  return axios.request({
    url: '/finance',
    method: 'put',
    data
  })
}

export const getStats = () => {
  return axios.request({
    url: '/stats',
    method: 'get'
  })
}
