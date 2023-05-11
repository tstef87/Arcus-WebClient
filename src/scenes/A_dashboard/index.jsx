import React, {PureComponent, useEffect, useState} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar} from 'recharts';
import Box from "@mui/material/Box";
import {Legend} from "chart.js";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../../fs/firebaseConfig";
import {width} from "@mui/system";
import FlexBetween from "../../components/FlexBetween";
import {Typography} from "@mui/material";
import CountUp, { useCountUp } from 'react-countup';


const Dashboard = () => {

    const [rc, setRC] = useState([]);
    const rcCollectionRef = collection(db, "RevenueCenter")
    useEffect(() => {
        const getRCList = async () => {
            try {
                const data = await getDocs(rcCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    rcName: doc.id,
                    revenue: doc.get("revenue")?.toFixed(2),
                    sales: doc.get("sales")
                }));

                setRC(filteredData);
                console.log(filteredData);
            }catch (e) {
                console.error(e);
            }
        };
        getRCList().then(r => console.log("done"));
    }, []);


    const [rev, setRev] = useState();
    const [sales, setSales] = useState();

    const numsColectionRef = doc(db, "Nums", "num");

    useEffect(() => {
        const getRegistersList = async () => {
            try {
                const docSnap = await getDoc(numsColectionRef);
                setRev(docSnap.get("revenue"));
                setSales(docSnap.get("sales"));
            }catch (e) {
                console.error(e);
            }
        };
        getRegistersList().then(r => console.log("Got Register List"));
    }, []);



    return (
        <FlexBetween sx={{width: "100%", height: "90%"}}>
            <Box sx={{width: "50%", height: "90%"}}>
                <Typography fontSize={75} marginLeft={5}>
                    Welcome
                </Typography>

                <CountUp
                    marginLeft={10}
                    start={0}
                    end={sales}
                    duration={1}
                    separator=""
                    decimals={0}
                    prefix="Total Sales: "
                    sx={{fontsize: "40dp", marginLeft: "10px"}}
                >
                    {({ countUpRef}) => (
                        <div>
                            <Typography fontSize={30} marginLeft={10} ref={countUpRef} />
                        </div>
                    )}
                </CountUp>

                <CountUp
                    marginLeft={10}
                    start={0}
                    end={rev}
                    duration={1}
                    separator=""
                    decimals={2}
                    decimal="."
                    prefix="Total Revenue: $"
                    sx={{fontsize: "40dp", marginLeft: "10px"}}
                >
                    {({ countUpRef }) => (
                        <div>
                            <Typography fontSize={30} marginLeft={10} ref={countUpRef} />
                        </div>
                    )}
                </CountUp>

            </Box>
            <Box sx={{width: "50%", height: "90%"}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={rc}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rcName" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />



                        <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="sales" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </FlexBetween>
    );
}

export default Dashboard;