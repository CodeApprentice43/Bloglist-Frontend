import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const setToken = newToken =>{
  token = `Bearer ${newToken}`
}
const post = async blog =>{
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl,blog,config)
  return response.data
}

const update = async (blogObject)=>
{
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogObject.id}`,blogObject,config)
  return response.data
}

const remove = async (blogObject) =>{
  const config = {
    headers: { Authorization: token },
  }
    await axios.delete(`${baseUrl}/${blogObject.id}`,config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,post,setToken,update,remove}