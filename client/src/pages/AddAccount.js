import React, {useState} from 'react';
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
    const {name, email, contact} = state;
    const navigate = useNavigate()

    const handleCloseCreate = () => {
        setOpenCreate(false)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please provide values to its corresponding fields")
        } else {
            axios.post("http://localhost:5000/api/post", {
                name,
                email,
                contact
            }).then(() => {
                setState({name: "", email: "", contact: ""});
            }).catch((err) => toast.error(err.response.data));
            setOpenCreate(false)
            setTimeout(() => navigate("/"));
            window.location.reload();
        }
    };

    const handleInputChange = e => {
        const {name, value} = e.target
        setState({...state, [name]: value});
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
                <input type="text" id="name" name="name" placeholder='Full name' value={name} onChange={handleInputChange}/>
            </form>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
                }}
                onSubmit={handleSubmit}>
                <label htmlFor='email'>Email Address</label>
                <input type="email" id="email" name="email" placeholder='Email address' value={email} onChange={handleInputChange}/>
            </form>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
                }}
                onSubmit={handleSubmit}>
                <label htmlFor='contact'>Contact</label>
                <input type="number" id="contact" name="contact" placeholder='Contact number' value={contact} onChange={handleInputChange}/>
            <input type="submit" value="Save"/>
            </form>
        </div>
    );
};

export default AddAccount;