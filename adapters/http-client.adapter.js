import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://echo-serv.tbxnet.com/v1/secret',
  headers: {
    Authorization: 'Bearer aSuperSecretKey'
  }
})

const get = async (endpoint, params = {}) => {
  const response = await axiosClient.get(endpoint, params)

  return response
}

export const httpClient = {
  get
}
