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
        let response = await axios.post('/api/students/authenticate', credentials);
        console.log('got response')
        let token = response.data.token;
        console.log('got token')
        console.log(token)
        // if didn't get token (bc not student)
        if(!token)
        {
            console.log('inside not token function')
            response = await axios.post('/api/professors/authenticate', credentials);
            console.log(response);
            token = response.data.token;
            console.log(token);
        }
        console.log(token);
        // if got token (bc ur student or professor)
        if(token)
        {
            console.log('if token')
            this.defaults.headers.common.token = this.setToken(token);
            console.log('got token about to decode')
            return jwtDecode(token);

        }
        // not student or professor (bc both db searched now)
        else
        {
            console.log('else false wrong password')
            return false;
        }
    }
    catch(err)
    {
        console.log('error rip')
        console.log(err);
        return false;
    }
};

studenthttpUser.signUp = async function (userInfo)
{
    console.log(userInfo);
    let response;
    if(userInfo.userType == 'student')
    {
        response = await axios.post('/api/students', userInfo);
    }
    else if(userInfo.userType == 'professor')
    {
        response = await axios.post('/api/professors', userInfo);

    }

    console.log(response);

    const token = response.data.token;
    console.log('get token')
    console.log(token);
    if(token)
    {
        console.log('true if')
        console.log('able to sign up')
        this.defaults.headers.common.token = this.setToken(token);
        return jwtDecode(token);
    } else
    {
        console.log('else')
        console.log('unable to sign up');
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