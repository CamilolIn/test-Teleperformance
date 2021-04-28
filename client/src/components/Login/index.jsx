import React, {useState, useEffect} from 'react'
import Navigation from '../Nav/index'
import { Card, Button, Form, Container, Col, Row } from 'react-bootstrap';
import { login, getUsers } from '../../store/actions/userActions'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {Spinner} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import s from '../../styles/login.module.css';
import swal from 'sweetalert';


const Login = () =>  {
    const [values, setValues] = useState({
        email: '',
        password: ''
        })
    const [loading, setLoading] = useState(false)
    const dispacth = useDispatch()
    const history = useHistory();
    const session = useSelector((state) => state);
    const userLog = session && session.userLog
    

    const handleChange = function(e){
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const susses = (log, role)=>{
        if(log){
            if(role === 'admin'){
                return history.push('/userPage');
            }
            return history.push('/userPage');
        }else{
            swal({
                title:"Error al iniciar session",
                text:'Verifica tu usuario o tu contraseña',
                icon: "error"
            })
            return history.push('/login');
        }
    }

    console.log(session)

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setTimeout(async() => {
            setLoading(false)
            await dispacth(login(values, susses))
        }, 2000);
    }

    useEffect(() => {
        dispacth(getUsers)
    }, [])
    return (
        <div>
            
            <Navigation/>
            <Container className={s.cont__form___Princ}>
            <div className={s.cont__form_image}></div>
            <Form onSubmit={handlerSubmit} className={s.cont__form}>
            <h2 className={s.title}>LOGIN</h2>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="dark" type="submit">
                 {loading ? <Spinner color="ligth"/> : "Submit"} 
            </Button>
            <p onClick={() => history.push('/register')} className={s.parrLog__Reg}>Registro</p>
            </Form>
            </Container>
        </div>
    )
}


export default Login