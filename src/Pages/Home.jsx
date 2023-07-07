import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="links-wrapper">
            <div className="link" onClick={()=>navigate("/volunteer-registration")}>
                <img src="./Assets/svg/vol.svg" alt="VOLUNTEER" />
            </div>
            <div className="link" onClick={()=>navigate("/apl-registration")}>
                <img src="./Assets/svg/apl.svg" alt="APL" />
            </div>
        </div>
    )
}

export default Home;