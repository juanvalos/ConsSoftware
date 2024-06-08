import Form from "./components/Form";
import profile from "../../views/profile.svg";
import NavigationBar from "../../shared/NavigationBar";

const Register = () => {
    return (
        <div className="flex flex-column flex justify-center">
            
            <NavigationBar/>
            
            <div className="flex flex-row flex justify-center">
            
                <div className="mt-[200px]">
                    <Form />
                </div>

                <img src={profile} height={"800px"} width={"700px"} className="ml-[120px]"/>
            
            </div>
        </div>
        
        
    
    )
}

export default Register;