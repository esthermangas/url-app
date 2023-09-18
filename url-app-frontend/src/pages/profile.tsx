import {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import Image from "next/image";


interface ProfileQuery{
    name:string;
    last_name:string;
    image_url:string;
    phone:string;
    email:string;
}

interface CreateProfileResponse{
    message:string;
}
export default function Profile(){
    const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000/api'
    const router = useRouter();
    const [values, setValues] = useState<ProfileQuery>({
        name:"Unspecified",
        last_name:"Unspecified",
        image_url:"/no_image.jpeg",
        phone:"Unspecified",
        email:"Unspecified",
    })
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        if(Object.keys(router.query).length > 0) {
            setValues({...values, ...router.query})
            axios.post<CreateProfileResponse>(`${apiUrl}/create_user`, router.query,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res=>{setLoading(false);console.log(res.data.message)}).catch(e => console.log(e))
        }
    }, [router.query])

    return (
        <main
            id="view-profile"
            className={`flex min-h-screen flex-col items-center p-12 lg:p-24`}
        >
            {loading && (
                <div role="status">
                    <svg aria-hidden="true"
                         className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            {!loading && (
                <div className="lg:max-w-2xl md:max-w-lg max-w-xs rounded overflow-hidden shadow-lg">
                    <div className="w-full max-h-96 overflow-hidden">
                        <Image src={values.image_url} alt="profile_image" width={500} height={100}/>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <div className="flex flex-col">
                            <CustomLabel htmlFor="name" label="Name"/>
                            <CustomSpan value={values.name} />
                        </div>
                        <div className="flex flex-col">
                            <CustomLabel htmlFor="last_name" label="Last Name"/>
                            <CustomSpan value={values.last_name} />
                        </div><div className="flex flex-col">
                        <CustomLabel htmlFor="email" label="Email"/>
                        <CustomSpan value={values.email} />
                    </div><div className="flex flex-col">
                        <CustomLabel htmlFor="phone" label="Phone"/>
                        <CustomSpan value={values.phone} />
                    </div>
                    </div>
                </div>
            )}
        </main>
    )
}


interface LabelProps {
    htmlFor:string;
    label:string;
}
const CustomLabel = ({htmlFor, label}:LabelProps) => {

    return (
        <label className="block text-sm text-gray-400" htmlFor={htmlFor}>
            {label}
        </label>
    )
}


interface SpanProps {
    value:string;
}
const CustomSpan = ({value}:SpanProps) => {

    return (
        <span className="inline-block py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {value}
        </span>
    )
}