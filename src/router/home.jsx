import {useEffect, useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom"

function Home() {
    let token = window.localStorage.getItem("id")
    const history = useHistory()
    if(!token) history.replace("/login")


    return (
        <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
        </>
    );
}

export default Home;
