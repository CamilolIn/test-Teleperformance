import React from 'react'
import s from '../../styles/home.module.css'
import Navigation from '../Nav/index';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';



const Home = () =>  {
    const history = useHistory();
    return (
        <>
        <Navigation className={s.navHome}/>
        <div className={s.bgHome} >
            <div className={s.conten___Home}>
                <h1>TELEPERFORMANCE<span className={s.point__title}>.</span>CO</h1>
                <h4>Accede a tus clases e interactua con tus compañeros en linea. </h4>
                <p>Inicia sesion ya, si no tienes una cuenta registrate dando clieck en el boton.</p>
                <Button className={s.button} onClick={() => history.push('/register')}>Resgistrar</Button>
            </div>
        </div>
        </>
    )
}


export default Home