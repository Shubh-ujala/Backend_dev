import axios from "axios";
import Image from "next/image";


// await new Promise((r)=>setTimeout(r,5000))
//it creates the custom delay!

async function getUserDetails(){
  const response = await axios.get(" http://localhost:3000/api/user")
  return response.data 
}

//kind of we have to create a async component (only doable in the server components)
export default async function Home() {
  const data = await getUserDetails();
  return (
    <>
      <div className="flex flex-col h-screen justify-center">
        <div className="flex justify-center">
            <div className="p-4 border shadow-lg">
                <div>Name: {data?.name}</div>
                <div>Email: {data?.email}</div>
            </div>
        </div>
      </div>
    </>
  );
}
