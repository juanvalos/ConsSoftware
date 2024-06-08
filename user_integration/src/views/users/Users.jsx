import { useEffect, useState } from "react"
import { useParams } from "react-router";
import PrevDescription from "./components/PrevDescription";
import CardInfo from "./components/CardInfo";
import NavigationBar from "../../shared/NavigationBar";

const Users = () =>{
    const [descriptions, setDescriptions] = useState ([]);
    const [user, setUser] = useState ([]);

    const { id } = useParams();

    const [form, setForm] = useState({
        description: '',
        prescription: '',
        message: '',
        RAG: ''
    })

    const fetchDescription = async () => {
        const response = await fetch("http://localhost:3000/description/"+id);
        const data = await response.json();
        setDescriptions(data);
    };
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const newForm = {
            ...form,
            [name] : value
        }
        setForm(newForm)
    };

    const fetchUserById = async () => {
        const response = await fetch("http://localhost:3000/users/"+ id);
        const data = await response.json();
        setUser(data);
        return data;
    };

    const handleGenerateHelp = async() => {
        const prompt={
            prompt:form.description,
        }
        const response = await fetch("http://localhost:3000/chat",{
            method: 'POST',
            headers : {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(prompt)
        })
        const data = await response.json();
        console.log(data);
        setForm({...form,prescription:data.response});
        return data;
    };

    const generateRAG = async() => {
        const message={
            message:form.message,
        }
        const response = await fetch("http://localhost:3000/chat/context",{
            method: 'POST',
            headers : {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(message)
        })
        const data = await response.json();
        console.log(data);
        setForm({...form,RAG:data.response});
        return data;
    };

    const handleSubmitConsult = async () => {
        const res = await fetch("http://localhost:3000/description/"+id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        return res.status === 201? alert('Description registered!') : alert("Error!!!")
    };

    useEffect(() =>{
        fetchUserById()
        fetchDescription()
        fetchUserById()
    }, [])

    return(
        
        <div className="flex flex-col flex justify-center bg-[#393D42]/70">
            
            <NavigationBar/>
            
            <div className="flex items-center justify-top flex flex-col mt-[50px]">

                <div className="flex flex-row ">
                    <div className="mr-[45px]">
                        <CardInfo user = {user} />
                    </div>

                    <div className="flex flex-col flex items-center justify-top">
                            
                        <div className="flex flex-row flex items-center justify-top">
                            <div className="bg-[#E7E8EA] flex items-center justify-top flex flex-col w-[250px] h-[300px]  mr-[45px] border-[3px] border-black rounded-xl">
                                <div className="font-bold mt-3">Problema mecánico</div>
                                <textarea className="w-[220px] h-[200px] border-4 mt-[20px] rounded-xl"
                                value = {form.description}
                                name = "description"
                                onChange = {handleInputChange}
                                />
                                </div>
                    
                            <div className="bg-[#E7E8EA] flex items-center justify-top flex flex-col w-[250px] h-[300px] shadow-xl mr-[45px] border-[3px] border-black rounded-xl">
                                <div className="font-bold mt-3">Valoración mecánica</div>
                                <textarea className="w-[220px] h-[200px] border-4 mt-[20px] rounded-xl"
                                    value = {form.prescription}
                                    name = "Prescription"
                                    onChange = {handleInputChange}
                                />
                            </div>
                        </div>
                    
                    
                        <div className="flex items-center justify-center flex flex-row mt-10 mr-11">
                        <button 
                        className="w-[250px] h-10 flex justify-center bg-black text-white py-2 px-4 rounded-md"
                            onClick={handleGenerateHelp}>
                            submit query
                        </button>
                        <button 
                        className="w-[250px] h-10 flex justify-center bg-black text-white py-2 px-4 rounded-md ml-5"
                            onClick={handleSubmitConsult}>
                            Guardar Consulta
                        </button>
                        </div>
                    </div>

                    <div className="flex flex-col flex items-center justify-top">
                            
                        <div className="flex flex-row flex items-center justify-top">
                            <div className="bg-[#E7E8EA] flex items-center justify-top flex flex-col w-[250px] h-[300px]  mr-[45px] border-[3px] border-black rounded-xl">
                                <div className="font-bold mt-3">Question RAG</div>
                                <textarea className="w-[220px] h-[200px] border-4 mt-[20px] rounded-xl"
                                value = {form.message}
                                name = "message"
                                onChange = {handleInputChange}
                                />
                                </div>
                    
                            <div className="bg-[#E7E8EA] flex items-center justify-top flex flex-col w-[250px] h-[300px] shadow-xl mr-[45px] border-[3px] border-black rounded-xl">
                                <div className="font-bold mt-3">Answer RAG</div>
                                <textarea className="w-[220px] h-[200px] border-4 mt-[20px] rounded-xl"
                                    value = {form.RAG}
                                    name = "RAG"
                                    onChange = {handleInputChange}
                                />
                            </div>
                        </div>
                    
                    
                        <div className="flex items-center justify-center flex flex-row mt-10 mr-11">

                        <button 
                        className="w-[250px] h-10 flex justify-center bg-black text-white py-2 px-4 rounded-md ml-5"
                            onClick={generateRAG}>
                            Submit query
                        </button>
                        </div>
                    </div>
                    
                </div>

                <div className="flex flex-col mt-[50px] flex items-center justify-center ">
                    <div className="h-[150] w-[400px] bg-black rounded-md mb-5 flex items-center justify-center">
                        <div className="font-bold mt-3 mb-3 text-white text-l justify-center">Valoraciones pasadas</div>
                    </div>
                    
                    <div className="bg-[#E7E8EA] flex items-center justify-top flex flex-col w-[1200px] h-fit shadow-md mr-[45px] border-[3px] border-black rounded-xl mb-10 bg-white overflow-x-auto">
                        <PrevDescription descriptions={descriptions}/>
                    </div>
                </div>

                

            </div>
        </div>
        
        

    )
}

export default Users