import React, {useState} from 'react'
import Navigation from '../Nav/index'
import { Card, Button, Form, Container, Col, Row } from 'react-bootstrap';
import { createUser } from '../../store/actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import s from '../../styles/login.module.css';
import {Spinner} from 'reactstrap';
import swal from 'sweetalert'


const Resgister = () =>  {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
        })
    const dispacth = useDispatch()
    const history = useHistory();

    const handleChange = function(e){

        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        setTimeout(async() => {
            setLoading(false)
            await dispacth(createUser(values))
        }, 2000);
        setTimeout(async() => {
            swal({
                title:"Resgitro existoso",
                text:"ahora ya puedes iniciar sesion",
                icon: "success"
            })
            setValues({
                name: '',
                email: '',
                phone: '',
                password: ''
            });
        }, 3000);

    }

    return (
        <div>
        <Navigation/>
        <Container className={s.cont__form___Princ_reg}>
        <div className={s.cont__form_image_reg}></div>
        <Form onSubmit={handlerSubmit} className={s.cont__form_reg}>
        <h2 className={s.title}>REGISTRO</h2>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label> 
            <Form.Control type="text" placeholder="Tu nombre" name="name" value={values.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Tu Email" name ="email" value={values.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="number" placeholder="Telefono"  name="phone" value={values.phone} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name ="password" value={values.password} onChange={handleChange} />
        </Form.Group>


        <Button variant="dark" type="submit">
            {loading ? <Spinner color="ligth"/> : "Registrar"} 
        </Button>
        <p onClick={() => history.push('/login')} className={s.parrLog__Reg}>Login</p>
        </Form>
        </Container>
    </div>
    )
}


export default Resgister