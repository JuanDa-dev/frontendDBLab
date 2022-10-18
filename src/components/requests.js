import axios from 'axios'

export const getRequest = async (url) => {
    return await axios.get(url, { withCredentials: true })
        .then(resp => resp.data)
        .catch(err => console.log(err));
}