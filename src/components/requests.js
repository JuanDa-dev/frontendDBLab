import axios from 'axios'

const url = 'https://backenddblab.onrender.com/'

export const getRequest = async (name) => {
    return await axios.get(url + name, { withCredentials: true })
        .then(resp => resp.data)
        .catch(err => console.log(err));
}