import { useNavigate } from "react-router"


const NavigationBar = ({children}) => {

    const navigate = useNavigate();

    const goHome = () =>{
        navigate("/")
    }

    const goRegister = () =>{
        navigate("/register")
    }

    return(
        <div  className=" rounded-xl mt-2 ml-3 bg-black text-white h-[50px] w-[200px] items-center">
            <div className="flex flex-row gap-4 items-center justify-center mt-3">
                <button onClick={goHome}> Dashboard</button>
                <div> // </div>
                <button onClick={goRegister}> Registro</button>
                
            </div> 
            {children}
        </div>
        
    )
}

export default NavigationBar