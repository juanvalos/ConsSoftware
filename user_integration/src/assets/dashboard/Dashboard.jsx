import NavigationBar from "../../shared/NavigationBar";
import Card from "./components/card";
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [results, setResults] = useState ([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async() =>{
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    setResults(data);
  };

  useEffect(() =>{
    fetchUsers();
  }, [])

  const filteredNames = results.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid justify-center flex flex-col">
      <div  className=" rounded-xl mt-2 bg-black text-white h-[70px] w-[1200px]">
        <div className="h-20 flex flex-row gap-4">
            <NavigationBar/>
            <input onChange={(e) => setSearchTerm(e.target.value)} className= "w-[600px] rounded-xl h-10 items-center justify-center mt-4 ml-[150px] text-center text-black" type="text" placeholder="Filtrar por nombre"/>
        </div>
      </div>
    
      <div className="grid grid-cols-3 justify-center ml-[110px]">
        {filteredNames.map((user) => (
            <div key = {user.id}>
              <Card user={user}/>  
            </div>
          
        ))}
      </div>
      
    </div>

  )
}

export default Dashboard;