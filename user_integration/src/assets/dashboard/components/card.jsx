import { useNavigate } from "react-router"
import user1 from "../components/user1.svg"
const Card = ({user}) => {


    const navigate = useNavigate();

    const handleClick = () =>{
        navigate(`/users/${user.id}`)
    }


    return(
        <button className="w-[250px] bg-cover bg-[#7E7E7E] text-white rounded-xl flex flex-col text-xl mt-4 mb-4 text-slate-100 items-center shadow-md" onClick={handleClick}>
            <img src={user1} height={"80px"} width={"70px"} className="mt-[10px]"/>
            <div className="mt-4 mb-4"> {user.name} </div>
            <div className="mt-4 mb-4"> {user.email} </div>
        </button>
    )

}

export default Card;