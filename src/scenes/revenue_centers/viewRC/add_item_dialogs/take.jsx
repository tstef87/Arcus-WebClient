import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../../fs/firebaseConfig";
import Box from "@mui/material/Box";


export default function Take(){


    const [active, setActive] = useState("");
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const [itemList, setItems] = useState([]);
    const itemCollectionRef = collection(db, "Items")
    useEffect(() => {
        const getItemList = async () => {
            try {
                const data = await getDocs(itemCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                setItems(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getItemList().then(r => console.log("done"));
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    return(
        <Box>

        </Box>
    );




}