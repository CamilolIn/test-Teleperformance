import React, {useState, useEffect, useRef} from 'react'
import Socket from './Socket';
import { Card, Button, Form, Container, Col, Row } from 'react-bootstrap';
import socket from './Socket';
import s from '../../styles/chat.module.css'
import { createMensaje } from '../../store/actions/mensjesActions';
import { useSelector, useDispatch } from 'react-redux';


const Chat = ({nombre, role}) => {
    const [mensaje, setMesanje] = useState("")
    const [mensajes, setMesanjes] = useState([])
    const [mensajeDB, setMensajeDB] = useState({
        mensajeData:"",
        from: nombre
    })
    const dispacth = useDispatch()
    const divRef = useRef(null)
    useEffect(() => {
        divRef.current.scrollIntoView({behavior : 'smooth'})
    })

    useEffect(()=> {
        socket.emit('conectado', nombre)
    }, [nombre]);

    useEffect(()=> {
        socket.on('mensajes', mensaje => {
            setMesanjes([...mensajes, mensaje])
        })
        return ()=>  {socket.off()}
    }, [mensajes]);

    const handlerChange = (e) => {
        setMesanje(e.target.value)
        setMensajeDB({...mensajeDB, mensajeData:e.target.value})
        return
    }

    const submit = (e)=> {
            e.preventDefault();
            socket.emit('mensaje', nombre, mensaje)
            setMesanje('')
            dispacth(createMensaje(mensajeDB))
            return 
    }

    console.log(mensajes)

    return (
    <div className={s.contn__mensajes__chat}>
        <div className={s.mensajes___chat}>
            {mensajes.map((m, i)=> {
                return (
                    <>
                    {
                       m.servidor ?<div><p className={s.pMensaje}> { m.mensaje}</p></div>:
                       <div><p className={s.parr, s.pNombre}>{} {m.nombre === nombre ? "Tu dices": m.nombre + " dice"} </p>  <p className={s.parr, s.pMensaje}>{m.mensaje}</p> </div>
                    }

                </>
                )
            })}
            <div ref={divRef}></div>
        </div>
            <form onSubmit={submit} className={s.form__cont}>
                <textarea name="" id="" cols="30" rows="10" value={mensaje} onChange={handlerChange} placeholder='Tu mensaje...'></textarea>
                <div className={s.cont_form__button}>
                <Button className={s.form__button} variant="dark" type='submit'>Enviar</Button>
                </div>
            </form>
    </div>
    )
}


export default Chat