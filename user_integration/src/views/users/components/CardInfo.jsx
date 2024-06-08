import userp from "../components/userp.svg"

const CardInfo = ({user}) => {
    return (
        <div className="bg-[#E7E8EA] flex items-center justify-top flex flex-col w-[250px] h-[500px] shadow-md border-[3px] border-black rounded-xl" >
            <img src={userp} className= "h-[80px] w-[70px] mt-2"/>
            <p className="font-bold mt-2 mb-3">User Info</p>
            <p className="font-medium mt-1">Nombre</p>
            <p>{user.name}</p>
            <p className="font-medium mt-1">Email</p>
            <p>{user.email}</p>
            <p className="font-medium mt-1">Matricula</p>
            <p>{user.matricula}</p>
            <p className="font-medium mt-1">Carrera</p>
            <p>{user.carrera}</p>
            <p className="font-medium mt-1">Campus</p>
            <p>{user.campus}</p>
            <p className="font-medium mt-1">Telefono</p>
            <p>{user.telefono}</p>

        </div>
    )
};

export default CardInfo;