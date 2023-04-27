import {useEffect, useState} from "react";
import {db} from "../../fs/firebaseConfig";
import Dashboard from "../dashboard";
import {useLocation, useNavigate} from "react-router-dom";

function useDocumentExistence(pin) {
    const [docExists, setDocExists] = useState(false);
    const docRef = db.collection("employee").doc(pin);

    useEffect(() => {
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setDocExists(true);
                } else {
                    setDocExists(false);
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }, [docRef]);

    return docExists;
}

function Login() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [pin, setPin] = useState("");
    const docExists = useDocumentExistence(pin);

    function handleLogin() {
        if (docExists) {
            navigate("/dashboard");
        } else {
            alert("Invalid Login Credentials");
        }
    }

    return (
        <div>
            <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;