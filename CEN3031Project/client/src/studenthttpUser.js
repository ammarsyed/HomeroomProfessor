// only works for students
import axios from 'axios';
import jwtDecode from 'jwt-decode'

const studenthttpUser = axios.create();

studenthttpUser.getToken = function ()
{
    return localStorage.getItem('token');
};

studenthttpUser.setToken = function (token)
{
    localStorage.setItem('token', token);
    return token;
};

studenthttpUser.getCurrentUser = function ()
{
    const token = this.getToken();
    return (token ? jwtDecode(token) : null)
};

studenthttpUser.logIn = async function (credentials)
{
    try
    {
        console.log('entered login http function')
        const response = await axios.post('http://localhost:5000/api/students/authenticate', credentials);
        console.log('got response')
        const token = response.data.token;
        console.log('got token')
        if(token)
        {
            console.log('if token')
            this.defaults.headers.common.token = this.setToken(token);
            console.log('got token about to decode')
            return jwtDecode(token);
        } else
        {
            console.log('else false wrong password')
            return false;
        }
    } catch(err)
    {
        console.log('error rip')
        console.log(err);
        return false;
    }
};

studenthttpUser.signUp = async function (userInfo)
{
    console.log(userInfo);

    const response = await axios.post('http://localhost:5000/api/students', userInfo);

    console.log(response);

    const token = response.data.token;
    console.log('get token')
    console.log(token);
    if(token)
    {
        console.log('true if')
        this.defaults.headers.common.token = this.setToken(token);
        return jwtDecode(token);
    } else
    {
        console.log('else')
        return false;
    }
};

studenthttpUser.logOut = function ()
{
    localStorage.removeItem('token');
    delete this.defaults.headers.common.token;
    return true;
};

studenthttpUser.defaults.headers.common.token = studenthttpUser.getToken();
export default studenthttpUser;