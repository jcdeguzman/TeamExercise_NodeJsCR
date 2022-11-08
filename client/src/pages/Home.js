import React, {useEffect, useState} from 'react';
import "./Home.css";
import { Button, Grid, Dialog } from '@mui/material';
import axios from "axios";
import AddAccount from './AddAccount';

const Home = () => {
    const [data, setData] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);

    const [id, setID] = useState(null)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

    const [action, setAction] = useState("")

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

    const handleEdit = (item) => {
        setID(item.id)
        setName(item.name)
        setEmail(item.email)
        setContact(item.contact)
        setOpenCreate(true)
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/delete/${id}`);
        setTimeout(() => loadData(),500);
    }

    return (
        <div style={{marginTop: "150px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>ID No.</th>
                        <th style={{textAlign: "center"}}>Unsa nimo Name</th>
                        <th style={{textAlign: "center"}}>Email address</th>
                        <th style={{textAlign: "center"}}>Contact</th>
                        <th style={{textAlign: "center"}}>Actions</th>
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
                                <td>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setAction("edit")
                                                handleEdit(item)
                                            }}>Edit</button>
                                        <button onClick={ () => {handleDelete(item.id)}}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button variant="contained" 
                    style={{marginTop: '10px'}} 
                    onClick={()=>{
                        setAction("add")
                        handleOpenCreate()
                    }}>
                        Waray pa account? Register na diri
            </Button>
            <Grid>
                <Dialog open={openCreate}>
                    <AddAccount setOpenCreate={setOpenCreate} id={id} name={name} email={email} contact={contact} action={action}/>
                </Dialog>
            </Grid>
        </div>
    )
}

export default Home;