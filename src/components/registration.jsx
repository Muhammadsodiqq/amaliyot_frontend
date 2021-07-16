import {useEffect, useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom"

function Signup() {
    let [submit, setSubmit] = useState(false)
    const history = useHistory()
    async function Submit(e) {
        e.preventDefault()
        console.log("sasa");
        // history.replace("/")
    }

    return (
        <div class="container mx-auto p-4">
            <div
                class="flex mt-10 mx-auto flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div
                    class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Create a new account
                </div>
                <span
                    class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                    Already have an account ?
                    <Link to="/login" class="text-sm text-blue-500 underline hover:text-blue-700">
                        Sign in
                    </Link>
                </span>
                <div class="p-6 mt-8">
                    <form action="#" onSubmit={e => Submit(e)}>
                        <div class="flex flex-col mb-2">
                            <div class=" relative ">
                                <input
                                    type="text"
                                    id="create-account-first-name"
                                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="First name"
                                    placeholder="Ism"/>
                            </div>
                        </div>
                        <div class="flex flex-col mb-2">
                            <div class=" relative ">
                                <input
                                    type="text"
                                    id="create-account-last-name"
                                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="Last name"
                                    placeholder="Familiya"/>
                            </div>
                        </div>
                        <div class="flex flex-col mb-2">
                            <div class=" relative ">
                                <input
                                    type="text"
                                    id="create-account-pseudo"
                                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="pseudo"
                                    placeholder="foydalanuvchi nomi"/>
                            </div>
                        </div>
                        <div class="flex flex-col mb-2">
                            <div class=" relative ">
                                <input
                                    type="email"
                                    id="create-account-email"
                                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Email"/>
                            </div>
                        </div>
                        <div class="flex flex-col mb-2">
                            <div class=" relative ">
                                <input
                                    type="password"
                                    id="create-account-email"
                                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="password"/>
                            </div>
                        </div>
                        <div class="flex w-full my-4">
                            <button
                                type="submit"
                                class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div class="flex items-center justify-center mt-6"></div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
