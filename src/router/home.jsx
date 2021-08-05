import React, {useState} from "react"
import Logo from "../img/user1.svg"
import "./home.css"
import {Link, useHistory} from "react-router-dom"
import {useEffect} from "react"
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

    let [inpValue,
        setinpValue] = useState("")
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
    async function FetchData() {
        let response = await fetch(port + "/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
        response = await response.json()
        if (!response.ok) {
            if (response.message == "user not found") {
                window
                    .localStorage
                    .removeItem("src")
            }
            history.replace("/login")
            return;
        }

        setusername(response.data.user_userName)
        setName(`${response.data.user_name} ${response.data.user_lastName}`)
        window
            .localStorage
            .setItem("name", response.data.user_name)
        window
            .localStorage
            .setItem("lastname", response.data.user_lastName)
        window
            .localStorage
            .setItem("username", response.data.user_userName)
        window
            .localStorage
            .setItem("email", response.data.user_email)
    }

    let arrr = []
    let [arr,
        setArr] = useState(arrr)
    async function GetAll() {
        let response = await fetch(port + "/users/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
        response = await response.json()
        if (!response.ok) {
            if (response.message == "user not found") {
                window
                    .localStorage
                    .removeItem("src")
            }
            history.replace("/login")
            return;
        }

        for (let i of response.data) {
            arrr.push({
                name: `${i.user_name} ${i.user_lastName}`,
                username: `${i.user_userName}`,
                photo: `${port}/file/getfile/${i.user_photos[0]
                    ?.user_id}.${i.user_photos[0]
                        ?.type}`
            })
        }
    }

    useEffect(() => {
        FetchData();
        GetAll()
    }, [])

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
                        <img
                            className="m-3"
                            src={`${port}/file/getfile/${src}`}
                            onError={e => {
                            e.currentTarget.src = Logo;
                        }}/>
                        <span
                            className="px-2 py-0.5 mt-2 text-lg font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">{username}</span>
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
                <main id="main" className="flex justify-end mt-2">
                    <div className="suggestion-box">
                        <div className={inputClass} id="suggestion-input">
                            <input
                                type="text"
                                onChange={e => {
                                setinpValue(e.target.value);
                                setresetClass("displayed")
                            }}
                                autoComplete="off"
                                id="suggestions"
                                placeholder="Search any country..."/>
                            <span className="loader"></span>
                            <button
                                id="reset"
                                onClick={e => {
                                e.target.parentNode.childNodes[0].value = "";
                                setinpValue("");setresetClass("")
                            }}
                                className={resetClass}></button>
                        </div>
                        <div className={sugListClass} id="suggestion-list">
                            {arr
                                .map(function (user, key) {
                                    if (inpValue.length > 3) {

                                        if (user.username.toLowerCase().includes(inpValue.toLowerCase()) && user.username != username) {
                                            return <div
                                                className="suggestion"
                                                onClick={e => {
                                                setinpValue("");
                                                let x = (e.currentTarget.childNodes[0].childNodes[0].textContent);
                                                (e.currentTarget.parentNode.parentNode.childNodes[0].childNodes[0].value = x);
                                            }}
                                                key={key}>
                                                <div className="badge">
                                                    <span
                                                        className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">{user.username}</span>
                                                    <p className="ml-1   tracking-wide truncate text-xs  text-gray-100   font-sans">{user.name}</p>
                                                </div>
                                                <img src={Logo} alt="rasm" className="suggestionImg"/>
                                            </div>
                                        }

                                    }
                                })
}
                        </div>
                    </div>
                    <div className="wrap">
                        <input class="input" type="number" placeholder=""/>

                        <div class="select">
                            <select name="slct" id="slct">
                                <option value="1">$</option>
                                <option value="2">USD</option>
                            </select>
                        </div>
                    </div>
                </main>
            </section>

        </div>

    )
}

export default SideNavHome
