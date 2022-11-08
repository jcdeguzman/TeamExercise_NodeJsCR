import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
    name: "",
    email: "",
    contact: "",
}

const AddAccount = (props) => {
    const {setOpenCreate} = props
    const [state, setState] = useState(initialState);
    const [id, setID] = useState(props.id)
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [contact, setContact] = useState(props.contact)
    // const {name, email, contact} = state;
    const navigate = useNavigate()

    const handleCloseCreate = () => {
        setOpenCreate(false)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please provide values to its corresponding fields")
        } else {
            if(props.action === "add"){
                axios.post("http://localhost:5000/api/post", {
                    name,
                    email,
                    contact
                }).then(() => {
                    setState({name: "", email: "", contact: ""});
                }).catch((err) => toast.error(err.response.data));
            }
            else if(props.action ==="edit"){
                axios.put(`http://localhost:5000/api/update/${id}`,{
                    name,
                    email,
                    contact
                }).then(() => {
                    setState({name: "", email: "", contact: ""});
                }).catch((err) => toast.error(err.response.data));;
            }
            setOpenCreate(false)
            setTimeout(() => navigate("/"));
            window.location.reload();
        }
    };

    return(
        <div>
            <Grid
                container
                direction={'row'}
                justifyContent={'flex-end'}
                alignItems={'flex-start'}>
                    <IconButton onClick={handleCloseCreate}>
                        <CloseIcon/>
                    </IconButton>
            </Grid>

            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
                }}
                onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type="text" id="name" name="name" placeholder='Full name' value={name} onChange={(e) => {setName(e.target.value)}}/>
                <label htmlFor='email'>Email Address</label>
                <input type="email" id="email" name="email" placeholder='Email address' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <label htmlFor='contact'>Contact</label>
                <input type="number" id="contact" name="contact" placeholder='Contact number' value={contact} onChange={(e) => {setContact(e.target.value)}}/>
                <input type="submit" value="Save"/>
            </form>
        </div>
    );
};

export default AddAccount;