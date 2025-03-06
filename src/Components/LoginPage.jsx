import { useState, useEffect } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import {useFormik} from "formik"


const LoginPage = () => {

    let navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values,action) => {
            let {email, password} = values
            try {
                let response = await axios.post("https://qr-code-app-backend.onrender.com/user/login",{email, password}, {withCredentials: true})

                if(response.data.result == true){
                  localStorage.setItem("UserData", JSON.stringify(response.data.data));
                  navigate('/')
                }
            } catch (error) {
                console.log(error);
            }
            action.resetForm()
        }
    });



  return (
    <div>
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-100">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="block w-full bg-slate-100 rounded-md border-0 p-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2 flex items-center">
                  <input
                    id="password"
                    name="password"
                    type={"password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="block w-full bg-slate-100 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                > Log in
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default LoginPage
