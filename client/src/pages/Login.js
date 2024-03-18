import { Form,Input,Button } from 'antd'
import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {message} from 'antd'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


export default function Login() {

const dispatch=useDispatch()
const navigate=useNavigate()


const handleSubmit=async(value)=>{
  try {
    dispatch({
      type:'SHOW_LOADING'
    })
    const res=await axios.post('/api/users/login',value)
message.success('User login successfully')
localStorage.setItem('auth',JSON.stringify(res.data))
navigate('/')
    dispatch({
      type:'HIDE_LOADING'
    })
    
  } catch (error) {
    dispatch({
      type:'HIDE_LOADING'
    })
    message.error("Something went wrong")
    console.log(error)
  }
}

//currently login user

useEffect(()=>{
  if(localStorage.getItem('auth')){

    localStorage.getItem('auth')
    navigate('/')
  }
  
},[navigate])






  return (
    <>
        
        <div className='register'>
<div className='register-form'>

<h1>POS APP</h1>
<h3>Login Page</h3>
<Form layout='vertical'  onFinish={handleSubmit}>


<Form.Item name='userId' label="User Id">
<Input />
</Form.Item>

<Form.Item name='password' label="Password">
<Input type='password' />
</Form.Item>



<div className='d-flex justify-content-between'>
  <p>
not a user please
    <Link  to="/register" style={{textDecoration:"none"}}> Register Here !</Link>
  </p>
  <Button type='primary' htmlType='submit'>Login</Button></div>
  </Form>
  </div>

      </div>
    </>
  )
}
