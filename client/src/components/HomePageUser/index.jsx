import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Nav/index';
import { createUser, getUsers } from '../../store/actions/userActions';
import Socket from '../Chat/Socket'
import Chat from '../Chat/Chat'
import { Container } from 'react-bootstrap';
import s from '../../styles/chat.module.css'



const HomePage = () => {
    const dispacth = useDispatch()
    const session = useSelector((state) => state);
    const name = session.userLog.name
    const role = session.userLog.role
    console.log(name)
    
    useEffect(() => {
        dispacth(getUsers)
    }, [])



    return (
    <div>
        <>
        <Navigation /> 
        <div className={s.contant}>

        <div className={s.cont__iframe}>
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/B0jxclqckC0?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
        </div>


        <Chat
            nombre={name}
            role={role}
        />
        </div>
        </>
    </div>
    )
}

export default HomePage