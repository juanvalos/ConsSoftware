import { useState } from "react";

const Form = () =>{
    const [form, setForm] = useState({
        name: '',
        email: '',
        matricula: '',
        carrera: '',
        campus: '',
        telefono: ''
    }
    )


    const handleChange = (e) => {
        const {name, value } = e.target;
        const newForm = {
            ...form,
            [name]: value,
        };
        console.log(name)
        console.log(value)
        setForm(newForm);

    }

    const handleSubmitForm = async () => {
        const res = await fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        return res.status === 200? alert('User registered!') : alert("Error!!!")
    }

    return(
        <div className="text-4xl grid justify-center items-center flex flex-column text-sm text-white">
            
            <div className=" text-center text-4xl justify-center items-center text-black">
                New User
            </div>
            <br></br>
        
            <form >
                <input
                className="text-[#FDFDFD] w-80 h-10 flex justify-center bg-[#393D42] rounded-md mt-3"
                type = "text"
                name="name"
                placeholder="Name :" 
                onChange={handleChange}
                />
            </form>
            <br></br>
            <form>
                <input
                className="text-[#FDFDFD] w-80 h-10 flex justify-center bg-[#393D42] rounded-md mt-3"
                type = "email"
                name="email"
                placeholder="Email :"
                onChange={handleChange}
                />
            </form>
            <br></br>
            <form>
                <input
                className="text-[#FDFDFD] w-80 h-10 flex justify-center bg-[#393D42] rounded-md mt-3"
                type = "text"
                name="matricula"
                placeholder="Matricula :"
                onChange={handleChange}
                />
            </form>
            <br></br>
            <form>
                <input
                className="text-[#FDFDFD] w-80 h-10 flex justify-center bg-[#393D42] rounded-md mt-3"
                type = "text"
                name="carrera"
                placeholder="Carrera (siglas) :"
                onChange={handleChange}
                />
            </form>
            <br></br>
        
            <form>
                <input
                className="text-[#FDFDFD] w-80 h-10 flex justify-center bg-[#393D42] rounded-md mt-3"
                type = "text"
                name="campus"
                placeholder="Campus : "
                onChange={handleChange}
                />
            </form>
            <br></br>
            <form>
                <input
                className="text-[#FDFDFD] w-80 h-10 flex justify-center bg-[#393D42] rounded-md mt-3"
                type = "text"
                name="telefono"
                placeholder="Telefono : "
                onChange={handleChange}
                />
            </form>

            <button 
            className="w-80 h-10 flex justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-5"
            onClick={handleSubmitForm}
            >
                Register
            </button>
            
            
        </div>
    )

}

export default Form;
