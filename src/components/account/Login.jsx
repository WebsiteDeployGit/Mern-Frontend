import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #CD5C5C;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #CD5C5C;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKEAoQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQYHAgQFA//EAEAQAAEDAwICBwUFBwIHAQAAAAEAAgMEBREGEiExE0FRYXGBkQcUIqGxIzJCwdEVJENSU2JyM/BjgoOSouHxFv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHhEBAQEBAAIDAQEAAAAAAAAAAAERAgMSITFRQRP/2gAMAwEAAhEDEQA/ANFCELs8oQhCAQhblstdbdZ+hoad8p63Dg1viepFjTTHA46yrBtPs/gj2vutQ6Z/XFAcNHief0Ust9oobe0CipIIO9rcu9eazeo3OLVR0tjutUA6nt1S4HkTGWg+q3maOv7hn3EjxkaPzVuBna4lPo28OCz71r/OKjOjL8Bn3EH/AKrf1WnU6evNOMy2ypwOtjN30VziNgP3U9g6iR5p7U/zig3tdG8skaWuHNrhgjySV6VlDT1jNlVBDO3skYDhRa66Ct04c6gkko5OppO+M+vEeq1OozfGrRC6l50/cbM/98hzFnhNHxYfPq88LlrWsWYEIQgEIQiGhCECQhCAR4oU+0VpMbY7ndItzj8UEDx6Od+QS3FktrQ0xouSuY2ruu+GlPFkQGHyfoPn4KxqOjhpIGwU0LYYW8o2D6r3a3GSTk9qzXK3XecyMQAOAGE00KNBCCkgE0k0AlhNCDykha9jmOaHMcMFjhkHyUF1Lodjg+qsrdjxxdSnkf8AE/l9FP1i4ZVlxLJVBvY5jix7XNe3g5rhgg94SVpav0qy7RmppGtZXtHgJh2Hv71V8jHRvcyRhY9pw5rhgg9i6S649c4xQhCrIQmhEJCFtWyhluNfBRwD45Xhuepo6z5BFxI9Cafbcaj9oVjM0kDhsaR/qv8A0Cs9jccTzPyWtbaKGhpIaWnZthgaGs7+0+K3Fyt135mQsIQmo0SaSaAXhV1MNHC6apkbHE3m5y9lyrgGvvlvbN/ptjlkaDy3jaAfIFyFM3ylA3PirI4v6r6SQN9ccPNdKGRssbZI3texwy1zTkELny3y2MJY2pErhzEDHSkf9oK5tFUNpqmJ9vnL6Coq3QmmfAWGB5aXHGcHGRyx+JVNSVCQTKihCEkCe0EKC+0DTwmjddqSMCaMfvDQPvN/m8R9PBTxecrQWnLdwxhw7QrLiWbFCIXZ1XZ3We7ywsH7s/7SA/2nq8jw9Fx8FdZdeezLhITQiADip77Nbdwqbk8cf9GEn/yP0HqoGTwVzaZohQWShpiMObEHv/ydxP1Wer8OnE2uq0YaAE00Lm7BJNJA0JIQBUW1FN+1Jxb4YSOiL5OncwOy9jcljGnmTuAOeGMqVFRm62uGrvUjYIYun90Mv2mS0vLgGnuPwkZHFWJWnBdbu+r/AGdTtoabosBzmQkgYAJ4bhgDdx/lyFlbHzzXeKtqRGaWere2JsT8jphHt6QEji0tYQOwk81sWi3QNaaGrtcr4nTOlDZ4YyyEnJOHZ+LPILctFHELpXvO9xpp9kAc8lsTXMa4hreQ5ny4Ksu2EIQsthNCEAkmkgintAtoq7G6oY37SjPSA/2fiH5+Sq8HKvaojZKx0cgyyRpY4HrBCo6sgNJVz0zucMjoz5HC3xXHyT+vHghY5TW3Ns2+nNXcKWn6pZmMPgXDKvJg4ux2qm9KNEmpbc0/1gfQEq5GcBw7Ssdu3jZpJoWHQJJpIBNJHUgMhR6+xx1F9ttJ0Td1RHNul3ODmNa3Ixgj8RHNedRezFeI5XQVHuLWyxOkBG0Oa5u5xbnkOIz4nksoatldqmmnhaXUzKWWOObGBI7LS7b2jGOKuM7rgU7TVvlw2TpCGUscfvDi3p+BflpyTj4jnOMDllSnT01MJrlR00EUAp6nAbG3G4bR8R7TkEeS5tuNvoL1dKt7ZHOdNsZJFC+RsbcAuyWjAO7dnjngE6SVsMZvNO5r4W1UzJ3NOQ6Fz/vD/E4PhuVSJWgpDGBjkmVlsIQhAJJpIMZPu57OKqTXFOKfVFYAMNk2yDzAz8wVbruLSFV3tJbtv0bus07fqVrn7Y8n0imAhY5TXRwdbSLtuprcT/Wx6gq5o/u8O0qi7XP7rc6OozgRTscfAOGfkrzbzcO9Y7dvGzQhCw6BCEkAgngq7uXtBrY6qeGko6drY5HMa97i4nBxnqWvSe0K4Mnaaymglhz8QYC1wHdzWvWse8TySz0UlX70Y39IXbnASODXHtLc4K9hQwCSnexu33ZhZE1vANaQBjHkFGtSa0Nrngjo6WOcTQNlD3vIwHcuGF2tM3CputoiratjI3yklrWA4Azgc1MqyzcblDRx0FJHTQF3RxjDdxyUqOgp6Oj90iZ9jlxLXcc7iSfqo9qnWUNokdSUTGz1g+8Sfhj8e09yjlB7QLiyraa6OGWnJ+NrGbS0doP5K+tPaS4s4ANaAAAAMABC1a24UtDROrKmZrIGt3b+3sx25UBuPtArppHi2U0cUTcndIC92O09Q+akml6kWQmoZo7V812rDQ17IxMWl0UjOAdjmCO3rUySzFl00JBNRSdwBKq32lvzfoh2UzfqVaEn3SO3gqk17UCfVFUBxEQZGPQE/Va5+2PJ9I8mhC6OBdRV16drRcLPRVQOTJEA7/IcD8wVSisD2aXIOp6i2PPxRnpoR2j8Q9ceqz1Ph04uVP0JA5AwmubsS86uZtPSzTu5Rsc8+QyvVcXWFR7tpqvkzgmLYP8Am4fmkS/SqrFNSw3amqLn8UDCXyAs37jg8MdfFbFy93vl8bHYrf7uyXDWRtAGT1uIHAD9FtaO0/DfpqplTJLHHCwEGLGdxJ7QeHBb+lan9g6snthdHPE9xiMoaM5AyDnywR2rrrjjh6nOL3NTRfE2maynZ37GgfXKsS51v/5jSUDY8e8MhZDFnrfjifLiVXdqYbpqenDuPvFXvd3jcXH5BSD2oVbn3GkpAfgiiMhHe44+QHzWfxZclrj6b09U6iqpHOlMcLD9rO4biXHjjvK89WWRliuQpo5XSxPiEjS8DPMjHDwVk6Mo20WnKNrW/FKzpnntLuP0wFBdTP8A2/rL3anO5oc2nDh1AHLj5Zcrvyt5kjW1RdpKz3ShDj0FJAwH+6TaMny5eqn2krDDbbMxk8TXVFSzdOXDic/h8AFWlmibcdQ0cbh8E1S1zh/bnJHop1qbVVztlwnpqGgY+GBrd88jHkAkd2B1jrUv5Dn9rrWnStptVU2pponmdmdr3yE4yMHhy613FDNE366XyvqTWPj6CKIHaxmBknh9Cpms37dOcz4NCElFec0jY27nnDWgucewBUbcKk1tfU1Tuc0rn+pVn68uQobDLG12Jas9CwDnt/EfTPqqoW+I5eS/wIQhbcgt2zXGS1XKCti/hOy4Z+83rHotIBBRV7UdRFVQRTQO3RStD2OHWCtlVp7P9QCnlFqq34ikdmnefwPPMeB/3zVktdnxHMLlZjvzdjJQz2nVXR2eCmB4zTAkdzRn6kKZLl3ewW+8OidcIXyGIEMxI5uM+BSVevmKfpbnWUUMsVLVSQRy8ZNh258+a7ljstTBbqy+VUbomQ08hg38HPeWkA+HHzVhUGm7Rb3tfTUEQe3k9wLiPMrfraSGupn09UzfE/G5ucZwc/ktXticKZ0/c2Wa6RVroel6Nrg1m7HEjHNb2rKs3Weku3RdHHUwYABzhzXEEZ9PVWdBYrTAMRW2lHjED9VlWWi31lJ7pPSRGAHcGNbt2ntGORT2PS5is2ayusdqjt0RiYGsEbZWtPSbeQHPGe/ClOhNMvt0Zr65hbVSN2xsP8Np7e8rt2vTdptkolpKNokHJ73F7h4Err47lLfxZz+qShdLYb81xZmSiqOLTw3AHHzC7up9YvvdK2goaaSKORw37uLnnPBox3/kpnfNK269TCedskU+MGWIgFw6s5BynZdK2uzydNTxOknHKWY7iPDqHorsT1rz0XZDZrQGzDFTOekmH8vY3y/VSFIJrFutyYFg89Q4H6BNx2jJUN17qD3KmdbqV/73OPtXD+HGerxP6qyaW5ES1leBdrw7oXZpqf7KHv7T5n5YXBRyQusmPPbt0IQhAwcJFCEQZ8lZOitVCtbHb7i8CsaNsUruUo7D/d9VWyBz5kdeQlmtS4v1js55gjnlZKutMa36NrKS9PJA4MqgOI7ndvj/APVP4Z2SxtkY9skbhlr2HLSFysx3nUr1KaXNNRSQmhAk0k0AkhCAQXAD6LEv7OP5KG6m1rDRB9Na3tnq+RlAzHH4dpVk1LZHQ1XqWGyQhrNslc8fZxZ4M/ud/viqpnnlnnfPO8ySyHL3u5uKJ55amZ808jpJXnL3uOSSvNdJMceutBOUIQqyE0k0CQhCIEIQgF07NfrjZn5o5z0ROXQv4sPl1eS5iYRZVmWjXVtqQGVzHUUnWfvRnz6vRSmlq4aqISU0sU7DydE8OCoolZwzywP308skT/5o3Fp+SzeW55LPtfG9vXw8U97cZyMeKp2l1bfaYANuD3gdUrQ/5kZ+a3m69vQHxCld4xf+1n0rfvFq7m9oS6RuMg58OKqw6+vPUykHf0Z/ValRrK/T8PfejHZExo+fNPWnvFtSzNiYXyFrGjm57sAKOXbWloomubFMayUcmQH4c97uX1VYVNZVVZ3VdTNMf+JIXfVeC1OWL5Hdveq7ldwYi/3emP8ABiOAfE8z9O5cJCFqTGLdCEIQCEIRAhCaBIQhAIQhAJjkhCBFCEIoQmhWJSQhCUhpFNCkCQhCAQhCAQhCBoQhB//Z';

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;