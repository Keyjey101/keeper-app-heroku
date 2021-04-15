import React, {useContext, useEffect, useState} from "react"
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { AuthContext } from "../context/authContext"
import {useHttp} from "../hooks/http-hook"


export const Auth = () => {

  const auth = useContext(AuthContext)

const {status, error, request, clearError} = useHttp()

const [userData, setUserData] = useState({username: "", password: ""})

const [success, setSuccess] = useState({
  visible: false,
  message: ""
})

const [errorMessage, setErrorMessage] = useState({
  visible: false,
  message: ""
})

useEffect(()=>{
  setErrorMessage((prev)=>{
    if (error === null) {
      return {visible: false, message: "it's ok"}
    } else 
    
      return {visible: true, message: error}
  }
  )
  
}, [error])






console.log(errorMessage)

const eventHandler = (event) => {
setUserData({...userData, [event.target.name] : event.target.value})
clearError()
}

/*
function eventHandler(event){
  const name = event.target.name
  const value = event.target.value
  setUserData((prev) => {
    return {...prev, [name]: value}
  })
console.log(userData)}
*/

const regisrtationHandler = async()=>{
  try{

    const data = await request('/api/auth/register', 'POST', {...userData})
    console.log("DATA: ", data)
    setSuccess({visible: true, message: data.message})
  } catch(e){

  }
}

const loginHandler = async()=>{
  try{

    const data = await request('/api/auth/login', 'POST', {...userData})
    auth.login(data.token, data.userId)
    console.log(data)
    
  } catch(e){

  }
}




    return (
        <div>
        <Container>
        <Alert show={errorMessage.visible} variant="danger">
          <p>{errorMessage.message}</p>
          <div className="d-flex justify-content-end">
          <Button onClick={() => setErrorMessage({visible:false})} variant="outline">
          ❌
          </Button>
</div>
        </Alert>

        <Alert show={success.visible} variant="success"> <p>{success.message}</p>
        <div className="d-flex justify-content-end">
        <Button onClick={() => setSuccess({visible:false})} variant="outline">
        ✔️
          </Button>
</div>

         </Alert>


            <Form className="regisrtation-form">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control type="email" placeholder="Enter email" className="yellow" name="username" onChange={eventHandler}/>
    <Form.Text className="text-muted">
      Yes we will sent you A LOT of spam.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" className="yellow" name="password" onChange={eventHandler}/>
    <Form.Text id="passwordHelpInline" muted>
      Must be at least 5 characters long.
    </Form.Text>
  </Form.Group>
  
  <Button variant="secondary" type="submit" className="button" onClick={regisrtationHandler} disabled={status}>
    Registration
  </Button>

  <Button variant="warning" type="submit" onClick={loginHandler} disabled={status}>
    Login
  </Button>
</Form>
</Container>
        </div>
    )
}