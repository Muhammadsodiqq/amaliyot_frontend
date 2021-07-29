import React, {useState} from "react"
import Logo from "../img/user1.svg"
import "./home.css"
import {Link, useHistory} from "react-router-dom"
function SideNavHome() {
  let port = "http://localhost"
    const [inputClass,
        setInputClass] = useState("suggestion-input")
    const [name,
        setName] = useState("")
    const [username,
        setusername] = useState("")
    const [sugClass,
        setSugClass] = useState("")
    const [sugText,
        setSugText] = useState("")
    const [sugListClass,
        setSugListClass] = useState("suggestion-list displayed")
    const [resetClass,
        setresetClass] = useState("displayed")


    const history = useHistory()

    let token = window
        .localStorage
        .getItem("id")
    let src = window
        .localStorage
        .getItem("src")
    if (!token) {
        history.replace("/login")
    }
    async function fetchData() {
        let response = await fetch(port + "/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
        response = await response.json()
        if (!response.ok) {
            history.replace("/login")
            return;
        }
        setusername(response.data.user_userName)
        setName(`${response.data.user_name} ${response.data.user_lastName}`)
        window.localStorage.setItem("name",response.data.user_name)
        window.localStorage.setItem("lastname",response.data.user_lastName)
        window.localStorage.setItem("username",response.data.user_userName)
        window.localStorage.setItem("email",response.data.user_email)
    }
    fetchData()
    
    async function getAll() {
        let response = await fetch(port + "/users/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
        response = await response.json()
        if (!response.ok) {
            window.localStorage.removeItem("src")
            history.replace("/login")
            return;
        }
        for(let i of response.data){
            console.log(i);
            arr.push({name:`${i.user_name} ${i.user_lastName}`,username:`${i.user_userName}`,photo:`${port}/file/getfile/${i.user_photos[0]?.user_id}.${i.user_photos[0]?.type}`})
        }
    }
    getAll()
    

    return (
        <div className="">
            <input type="checkbox" id="check"/>
            <label for="check">
                <i className="fa fa-bars" id="btn">=</i>
                <i className="fa fa-times" id="cancle">x</i>

            </label>
            <div className="sidebar">
                <header>
                    <div className="flex flex-col justify-around ">
                        <img className="m-3"
                            src={`${port}/file/getfile/${src}`} onError={e => { e.currentTarget.src = Logo ;  }}/>
                        <span className="px-2 py-0.5 mt-2 text-lg font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">{username}</span>
                    </div>
                    <p className="ml-1   tracking-wide truncate text-xs  text-gray-100   font-sans">{name}</p>
                </header>
                <ul>
                    <li>
                        <Link to="/">
                            <i className="fa fa-qrcode"></i>Home</Link>
                    </li>
                    <li>
                        <Link to="/settings">
                            <i className="fa fa-link"></i>Settings</Link>
                    </li>
                    
                </ul>
         

            </div>
            <section >
                <main className="flex justify-end">
                    <div className="suggestion-box">
                        <div className={inputClass} id="suggestion-input">
                            <input
                                type="text"
                                autoComplete="off"
                                id="suggestions"
                                placeholder="Search any country..."/>
                            <span className="loader"></span>
                            <button
                                id="reset"
                                onClick={e => {
                                e.target.parentNode.childNodes[0].value = "";
                                setSugListClass("suggestion-list");
                                setresetClass("")
                            }}
                                className={resetClass}></button>
                        </div>
                        <div className={sugListClass} id="suggestion-list">
                            <div className="suggestion ">
                                <div className="badge">
                                    <span
                                        className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Muhammad2121</span>
                                    <p className="ml-1   tracking-wide truncate text-xs  text-gray-100   font-sans">Muhammad Xolmuhammadov</p>
                                </div>
                                <img src={Logo} alt="rasm" className="suggestionImg"/>
                            </div>
                            <div className="suggestion ">
                                <div className="badge">
                                    <span
                                        className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Muhammad2121</span>
                                    <p className="ml-1   tracking-wide truncate text-xs  text-gray-100   font-sans">Muhammad Xolmuhammadov</p>
                                </div>
                                <img src={Logo} alt="rasm" className="suggestionImg"/>
                            </div>
                            <div className="suggestion ">
                                <div className="badge">
                                    <span
                                        className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Muhammad2121</span>
                                    <p className="ml-1   tracking-wide truncate text-xs  text-gray-100   font-sans">Muhammad Xolmuhammadov</p>
                                </div>
                                <img src={Logo} alt="rasm" className="suggestionImg"/>
                            </div>
                        </div>
                    </div>
                </main>
            </section>

        </div>

    )
}

export default SideNavHome

// @ayakubofff @DilshodBobokulov