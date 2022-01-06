import NavBar from "../NavBar/NavBar";
import Card from "./Card";

export default function Home () {


    return (
        
        <div className='{styles.home}'>

            <NavBar/>   

            <div className='{styles.container}'>
                <h1>Home</h1>
                <Card/>
            </div>

        </div>
    );
};