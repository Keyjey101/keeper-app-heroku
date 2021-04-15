import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {Notes} from "./partials/Notes"
import {Something} from "./partials/Something"
import {Auth} from "./partials/Auth"
//import { NoMatch } from "./partials/NoMacth"




export const useRoutes = isAuth => {

    
    console.log('isAuth is',isAuth)
    
if (isAuth) {
    return (

        
        <Switch>

<Route exact path="/notes" >
    <Notes />

</Route>


<Route exact path="/something" >
    <Something />
    
</Route>

<Redirect  to="/notes" />



        </Switch>
    )
}
return (
    <Switch>

<Route path="/" exact>
    <Auth />

</Route>

<Redirect to="/" />

    </Switch>
)
}