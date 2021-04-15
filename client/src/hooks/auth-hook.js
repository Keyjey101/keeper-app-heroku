import {useState, useCallback, useEffect} from "react"


export const useAuth = () => {

   // debugger

const [userToken, setUserToken] = useState(null)
const [userId, setUserId] = useState(null)


const login = useCallback( (jwtToken, id) => {
setUserToken(jwtToken)
setUserId(id)

localStorage.setItem('userKeeper', JSON.stringify({ userId: id, userToken: jwtToken}))

}, [])

const logout = useCallback( () => {
    setUserToken(null)
    setUserId(null)
    localStorage.removeItem('userKeeper')

    
}, [])

useEffect(() => {

const data = JSON.parse(localStorage.getItem('userKeeper'))
 
if (data && data.userToken) {
    login(data.userToken, data.userId)
}


}, [login])


return {login, logout, userToken, userId}

}