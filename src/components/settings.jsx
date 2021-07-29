import {useState,useRef} from "react"
import {Link, useHistory} from "react-router-dom"
import Logo from "../img/user1.svg"

function Settings() {
    let port = "http://localhost"
    let token = window.localStorage.getItem("id")
    let img = window.localStorage.getItem("src")
    const [src,setSrc] = useState(img)

    let nameValue1 = window.localStorage.getItem("name")
    const [nameValue,setnameValue] = useState(nameValue1)

    let usernameValue1 = window.localStorage.getItem("username")
    const [usernameValue,setusernameValue] = useState(usernameValue1)

    let lastnameValue1 = window.localStorage.getItem("lastname")
    const [lastnameValue,setlastnameValue] = useState(lastnameValue1)

    

    const [imgSrc,setImgSrc] = useState(`${port}/file/getfile/${src}`) 

    const [span, setSpan] = useState("");
    
    const history = useHistory()
    const ref = useRef();
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();
    const ref5 = useRef();
    const [selectedFile,
        setSelectedFile] = useState();
        
    async function fetchData() {
        let response = await fetch(port+"/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        })
        response = await response.json()
        
        if (!response.ok) {
            if(response.message.includes("Error:")) {
                response.message = response.message.substr(6,300)
            }
            setSpan(response.message)
            history.replace("/login")
            return;
        }
    }
     fetchData()


     const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmission = async() => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        let response = await fetch(port+"/file/create", {
            method: "POST",
            headers: {
                Authorization: token
            },
            body: formData
        })
        response = await response.json()
        
        if (!response.ok) {
            setImgSrc(Logo) 
            return;}
        window.localStorage.setItem("src", `${response.file.user_id}.${response.file.type}`)
        ref.current.value = "";
        window.location.reload()

    }

    const [name,setName] = useState("")
    const [Lastname,setLastName] = useState("")
    const [namespan, setnameSpan] = useState("");
    const [succname, setsuccname] = useState("");
    const editName = async() =>{
        let response = await fetch(port+"/users/editName", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: token
            },
            body: JSON.stringify({
                name:name,
                lastname:Lastname
            })
        })
        response = await response.json()
        if(!response.ok) {
            if(response.message.includes("Error:")) {
                response.message = response.message.substr(6,300)
            }
            setnameSpan(response.message)
            return;
        }
        setnameSpan("")
        window.localStorage.setItem("name",response.data.user_name)
        window.localStorage.setItem("lastname",response.data.user_lastName)
        setnameValue(response.data.user_name)
        setsuccname(response.message)
        setlastnameValue(response.data.user_lastName)
        ref1.current.value = "";
        ref2.current.value = "";
    }

    const [username, setusername] = useState("");
    const [usernamespan, setusernameSpan] = useState("");
    const [succuser, setsuccuser] = useState("");
    const editUserName = async() =>{
        let response = await fetch(port+"/users/editUsername", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: token
            },
            body: JSON.stringify({
                username:username.toLowerCase(),
            })
        })
        response = await response.json()
        if(!response.ok) {
            if(response.message.includes("Error:")) {
                response.message = response.message.substr(6,300)
            }
            setusernameSpan(response.message)
            return;
        }
        setusernameSpan('')
        window.localStorage.setItem("username",response.data.user_userName)
        setsuccuser(response.message)
        setusernameValue(response.data.user_userName)
        ref3.current.value = "";
    }

    const [emailspan, setemailspan] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [succemail, setsuccemail] = useState("");
    
    const editEmail = async() =>{
        let response = await fetch(port+"/users/editAccount", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: token
            },
            body: JSON.stringify({
                email:email,
                password
            })
        })
        response = await response.json()
        if(!response.ok) {
            if(response.message.includes("Error:")) {
                response.message = response.message.substr(6,300)
            }
            emailspan(response.message)
            return;
        }
        setemailspan('')
        setsuccemail(response.message)
        ref4.current.value = "";
        ref5.current.value = "";
    }

    return (
        <div>
            <input type="checkbox" id="check"/>
            <label for="check" className="z-30">
                <i className="fa fa-bars z-30" id="btn">=</i>
                <i className="fa fa-times z-30" id="cancle">x</i>

            </label>
            <div className="sidebar z-30">
                <header>
                    <div className="flex flex-col justify-around">
                        <img className="m-3" src={imgSrc} onError={e => { e.currentTarget.src = Logo ;  }}/> 
                        <span
                            className="px-2 py-0.5 mt-2 text-lg font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">{usernameValue}</span>
                    </div>
                    <p className="ml-1   text-xs  text-gray-100   font-sans">{`${nameValue} ${lastnameValue}`}</p>
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
            <section className="flex justify-end">
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6">

                        <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="">
                                        <form action="#">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Photo
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <label className="cursor-pointer">
                                                    <span
                                                        className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                        <svg
                                                            className="h-full w-full text-gray-300"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24">
                                                            <path
                                                                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                        </svg>
                                                    </span>

                                                    <input
                                                        autoComplete="off"
                                                        required
                                                        type="file"
                                                        ref={ref}
                                                        onChange={changeHandler}
                                                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"></input>
                                                </label>
                                            </div>
                                                <button
                                                    type="button"
                                                    onClick={selectedFile
                                                        ? handleSubmission
                                                        : e => {
                                                            return;
                                                        }}
                                                    className="mt-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    save photo
                                                </button>
                                        </div>
                                        </form>
                                        <hr className="border-solid border-4 border-light-blue-500 mt-5 mb-5"/>
                                                <form action="#" onSubmit={e => e.preventDefault()}>
                                                {namespan ? <div className="flex flex-col mb-2">
                                                    <div
                                                        class="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                        role="alert">
                                                        <strong class="font-bold">Error !</strong>
                                                        <span class="block sm:inline">{namespan}</span>
                                                    </div>
                                                </div> : ""}

                                                {succname ? <div className="flex flex-between">
                                                    <div
                                                        class="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                        role="alert">
                                                        <strong class="font-bold">Succsess !</strong>
                                                        <span class="block sm:inline">{succname}</span>
                                                    </div>
                                                    <button onClick={e => setsuccname("")} className="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative">x</button>
                                                </div> : ""}
                                                
                                                    <div className="flex flex-col mb-2">
                                                        <label for="create-account-first-name">Ism</label>
                                                        <div className=" relative ">
                                                            <input
                                                                minLength="3"
                                                                maxLength="32"
                                                                ref={ref2}
                                                                onChange={e => {setName(e.target.value);}}
                                                                autoComplete="off"
                                                                required
                                                                type="text"
                                                                id="create-account-first-name"
                                                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                                placeholder="Ism"/>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col mb-2">
                                                    <label for="last">Familiya</label>
                                                        <div class=" relative ">
                                                            <input
                                                                minLength="3"
                                                                maxLength="32"
                                                                ref={ref1}
                                                                onChange={e => setLastName(e.target.value)}
                                                                autoComplete="off"
                                                                type="text"
                                                                required
                                                                id="last"
                                                                class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                                placeholder="Familiya"/>
                                                        </div>
                                                    </div>
                                                    <button
                                                    onClick={editName}
                                                        type="button"
                                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        Save
                                                    </button>
                                                </form>
                                                <hr className="border-solid border-4 border-light-blue-500 mt-5 mb-5"/>

                                                <form action="#" onSubmit={e => e.preventDefault()}>
                                                {usernamespan ? <div className="flex flex-col mb-2">
                                                    <div
                                                        class="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                        role="alert">
                                                        <strong class="font-bold">Error !</strong>
                                                        <span class="block sm:inline">{usernamespan}</span>
                                                    </div>
                                                </div> : ""}

                                                {succuser ? <div className="flex flex-between">
                                                    <div
                                                        class="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                        role="alert">
                                                        <strong class="font-bold">Succsess !</strong>
                                                        <span class="block sm:inline">{succuser}</span>
                                                    </div>
                                                    <button onClick={e => setsuccuser("")} className="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative">x</button>
                                                </div> : ""}
                                                <div className="flex flex-col mb-2">
                                                <label for="create-account-pseudo">Foydalanuvchi nomi</label>
                                                    <div className=" relative ">
                                                        <input
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            id="create-account-pseudo"
                                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                            name="pseudo"
                                                            ref={ref3}
                                                            min="3"
                                                            max="25"
                                                            onChange={e=>setusername(e.target.value)}
                                                            placeholder="username"/>
                                                    </div>
                                                </div>
                                                    <button
                                                        onClick={editUserName}
                                                        type="button"
                                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        Save
                                                    </button>
                                                </form>
                                                <hr className="border-solid border-4 border-light-blue-500 mt-5 mb-5"/>

                                                <form action="#" onSubmit={e => e.preventDefault()}>
                                                {emailspan ? <div className="flex flex-col mb-2">
                                                    <div
                                                        class="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                        role="alert">
                                                        <strong class="font-bold">Error !</strong>
                                                        <span class="block sm:inline">{emailspan}</span>
                                                    </div>
                                                </div> : ""}

                                                {succemail ? <div className="flex flex-between">
                                                    <div
                                                        class="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                        role="alert">
                                                        <strong class="font-bold">Succsess !</strong>
                                                        <span class="block sm:inline">{succemail}</span>
                                                    </div>
                                                    <button onClick={e => setsuccemail("")} className="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative">x</button>
                                                </div> : ""}
                                                <div className="flex flex-col mb-2">
                                                <label for="create-account-email">Email</label>
                                                    <div className=" relative ">
                                                        <input
                                                            onChange={e => setemail(e.target.value)}
                                                            autoComplete="off"
                                                            type="email"
                                                            ref={ref4}
                                                            required
                                                            id="create-account-email"
                                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                            placeholder="Email"/>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col mb-2">
                                                <label for="create-account-eail">Passport</label>
                                                    <div className=" relative ">
                                                        <input
                                                            onChange={e => setpassword(e.target.value)}
                                                            autoComplete="off"
                                                            type="password"
                                                            ref={ref5}
                                                            required
                                                            id="create-account-eail"
                                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                            placeholder="password"/>
                                                    </div>
                                                </div>
                                                    <button
                                                        onClick={editEmail}
                                                        type="button"
                                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        Save
                                                    </button>
                                                </form>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Settings;
