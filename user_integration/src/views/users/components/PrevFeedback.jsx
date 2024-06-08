const PrevFeedback = ({descriptions}) =>{
    return (
        <div class="grid justify-center flex flex-col ">   
                 {descriptions?.map((des, idx) => (
                <p key={idx}>{des.prescription}</p>
            ))}
            </div>  

    )

};

export default PrevFeedback;