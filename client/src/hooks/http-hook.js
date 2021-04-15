import {useState, useCallback} from "react"



export const useHttp = () => {
    const [status, setStatus] = useState(false)
    const [error, setError] = useState(null)

const request = useCallback( async (url, method ="GET", body = "null", headers={}) => {
setStatus(true)
try {

if (body) {
    body = JSON.stringify(body)
    headers['Content-Type'] = 'application/json'
}

const response = await fetch(url, {method, body, headers})
const data = await response.json()

if (!response.ok) {
    throw new Error(data.message ||'Something wrong')
}


setStatus(false)

 return data
} catch(e){
setStatus(false)
setError(e.message)
throw e
}




}, [])

const clearError = useCallback(() => setError(null),[])

return {status, request, error, clearError}
}