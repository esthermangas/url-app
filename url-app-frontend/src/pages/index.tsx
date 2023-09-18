import {FieldValues, useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";
import Link from "next/link";


interface ImagePost {
  uri:string;
}
export default function CreateProfile() {
  const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000/api'
  const { register, handleSubmit } = useForm();
  const [urlGenerated, setUrlGenerated] = useState<string>("");


  const onSubmit = async (data:FieldValues) => {
    if(data.image.length > 0){
      const formData = new FormData();
      formData.append("image", data.image[0]);
      axios.post<ImagePost>(`${apiUrl}/upload_file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res=>{
          setUrlGenerated(generateUrlParams({...data, image_url: res.data.uri}))
      }).catch(e => console.log(e))
    } else {
      setUrlGenerated(generateUrlParams({...data}))
    }
  }

  const generateUrlParams = (data:FieldValues):string => {
    let values = {};
    Object.entries(data).forEach(([key, value]) => {
      if(value !== ""){
        values[key] = value
      }
    })
   return new URLSearchParams({...values}).toString()
  }

  return (
    <main
        id="create-profile"
      className={`flex min-h-screen flex-col items-center p-12 lg:p-24`}
    >
      <h1 className="text-lg mb-12 text-center">Generate your Url profile!</h1>
        <form className="flex space-y-6 items-center flex-col max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-gray-100"
              />
            </div>
          </div>
          <div className="w-full">
            <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="mt-1">
              <input
                  {...register("last_name")}
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-gray-100"
              />
            </div>
          </div>
          <div className="w-full">
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-gray-100"
              />
            </div>
          </div>
          <div className="w-full">
            <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <div className="mt-1">
              <input
                  {...register("phone")}
                  type="text"
                  name="phone"
                  id="phone"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-gray-100"
              />
            </div>
          </div>

          <div className="w-full">
            <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
            >
              Image Profile
            </label>
            <div className="mt-1">
              <input
                  {...register("image")}
                  type="file"
                  name="image"
                  id="image"
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-slate-900 file:text-white
                  hover:file:bg-slate-700"
              />
            </div>
          </div>
          <button className="bg-slate-900 hover:bg-slate-700 text-white relative inline-flex transition items-center px-2.5 md:px-4 py-2 shadow-md text-sm font-medium rounded-md focus:outline-none" type="submit">Generate Url</button>
        </form>
      {urlGenerated !== '' && (
          <Link className="mt-6 text-center bg-slate-900 hover:bg-slate-700 text-white relative inline-flex transition items-center px-2.5 md:px-4 py-2 shadow-md text-sm font-medium rounded-md focus:outline-none"
                href={`/profile?${urlGenerated}`}>Visit profile generated!</Link>
      )}
    </main>
  )
}