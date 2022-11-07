import React, {useEffect, useState} from 'react';
import "./Home.css";
import { Button, Grid, Dialog } from '@mui/material';
import axios from "axios";
import AddAccount from './AddAccount';

const Home = () => {
    const [data, setData] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);

    const handleOpenCreate = () => {
        setOpenCreate(true)
    }

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{marginTop: "150px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>ID No.</th>
                        <th style={{textAlign: "center"}}>Unsa nimo Name</th>
                        <th style={{textAlign: "center"}}>Email address</th>
                        <th style={{textAlign: "center"}}>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return(
                            <tr key={item.id}>
                                <th scoop="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button variant="contained" 
                    style={{marginTop: '10px'}} 
                    onClick={handleOpenCreate}>
                        Waray pa account? Register na diri
            </Button>
            <Grid>
                <Dialog open={openCreate}>
                    <AddAccount setOpenCreate={setOpenCreate}/>
                </Dialog>
            </Grid>
        </div>
    )
}

export default Home;