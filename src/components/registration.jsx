import { useState} from "react";
import {Link, useHistory} from "react-router-dom"

function Signup() {
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [span, setSpan] = useState("");
    const history = useHistory()
    async function Submit(e) {
        e.preventDefault()

        let response = await fetch("http://localhost/users/signup", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                name,
                surname,
                email,
                password
            })
        })
        response = await response.json()
        if(!response.ok) {
            if(response.message.includes("Error:")) {
                response.message = response.message.substr(6,300)
            }
            setSpan(response.message)
            return ;
        }
        window.localStorage.removeItem("id");
        window.localStorage.setItem("id", response.token);
        history.replace("/")
    }

    return (
        <div className="container mx-auto p-4">
            <div
                className="flex mt-10 mx-auto flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div
                    className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Create a new account
                </div>
                <span
                    className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                    Already have an account ?
                    <Link to="/login" className="text-sm text-blue-500 underline hover:text-blue-700">
                        Sign in
                    </Link>
                </span>
                <div className="p-6 mt-8">
                    <form action="#" onSubmit={e => Submit(e)}>
                        {span ? <div className="flex flex-col mb-2">
                                <div
                                    class="bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                    role="alert">
                                    <strong class="font-bold">Error !</strong>
                                    <span class="block sm:inline">{span}</span>
                                    
                                </div></div> : ""}
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input
                                onKeyUp={e => setName(e.target.value)}
                                required
                                    type="text"
                                    id="create-account-first-name"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="First name"
                                    placeholder="Ism"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div class=" relative ">
                                <input
                                onKeyUp={e => setSurname(e.target.value)}
                                    type="text"
                                    required
                                    id="create-account-last-name"
                                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="Last name"
                                    placeholder="Familiya"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input
                                onKeyUp={e => setUsername(e.target.value.trim())}
                                    type="text"
                                    required
                                    id="create-account-pseudo"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="pseudo"
                                    placeholder="username"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input
                                onKeyUp={e => setEmail(e.target.value)}
                                    type="email"
                                    required
                                    id="create-account-email"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Email"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input
                                onKeyUp={e => setPassword(e.target.value)}
                                    type="password"
                                    required
                                    id="create-account-eail"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="password"/>
                            </div>
                        </div>
                        <div className="flex w-full my-4">
                            <button
                                type="submit"
                                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center mt-6"></div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
