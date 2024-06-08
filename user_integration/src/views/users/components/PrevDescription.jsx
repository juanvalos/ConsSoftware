const PrevDescription = ({descriptions}) =>{
    return (
        <div className="ml-4 flex flex-row">
                {descriptions?.map((des, idx) => (
                    <div className="h-fit w-[200px] bg-[#E7E8EA] rounded-md mb-5 flex items-center justify-center flex-shrink-0 overflow-y flex flex-col text-xs mr-5 mt-10 ml-0">

                        <p className="font-bold">Problema mecánico</p>
                        <p key={idx}>{des.description}</p>
                        <br></br>
                        <p className="font-bold">Valoración mecánica</p>
                        <p key={idx}>{des.prescription}</p>
                        <br></br>
                        <p className="font-bold">Date</p>
                        <p key={idx}>{des.createat}</p>
                    </div>
                ))}

            
        </div> 

    )

};

export default PrevDescription;