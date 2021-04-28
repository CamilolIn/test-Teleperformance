import React, {useEffect} from 'react'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Navbar, Nav, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import {logout, getUsers} from '../../store/actions/userActions';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import s from '../../styles/home.module.css'



const Navigation = ({nameUser, role, id}) =>  {
    
    
    const session = useSelector((state) => state);
    const dispacth = useDispatch()
    const userssDis = session && session.users
    const userssLog = session && session.userLog
    const cursosDis = session && session.cursos
    const history = useHistory();

    const logoutP = () => {
        dispacth(logout())
        window.location = '/';
        Cookie.remove('userLoad');
        return
    }

    useEffect(() => {
        dispacth(getUsers)
    }, [])

    return (
        <>
    {!userssLog ?
    
     <Navbar bg="dark" variant="dark" className={s.navHome}>
    <Container>
     <Navbar.Brand href='#' as={Link} to='/'><h4>KUEPA<span className={s.point__title}>.</span>CO</h4></Navbar.Brand>
     <Nav className="mr-auto">

     </Nav>
     <Nav inline>

         <Nav.Link href='#' as={Link} to='/login'> Login</Nav.Link>
         <Nav.Link href='#' as={Link} to='/register'>Resgister</Nav.Link>

     </Nav>
     </Container>
    </Navbar>:
        userssLog && userssLog.role === "moderador" ?
        <Navbar bg="dark" variant="dark" className={s.navHome}>
        <Container>
        <Navbar.Brand href='#' ><h4>KUEPA<span className={s.point__title}>.</span>CO</h4></Navbar.Brand>
        <Nav className="mr-auto">


        </Nav>
        <Nav inline>

            <Nav.Link href='#' as={Link} to='/login'> Hello {session.userLog.role}</Nav.Link>
            <Nav.Link href='#' as={Link} to='/' onClick={logoutP}> Logout </Nav.Link>
        </Nav>
        </Container>
        </Navbar>
        :
        userssLog && userssLog.role === "user" ?
        <Navbar bg="dark" variant="dark" className={s.navHome}>
        <Container>
        <Navbar.Brand href='#' ><h4>KUEPA<span className={s.point__title}>.</span>CO</h4></Navbar.Brand>
        <Nav className="mr-auto">

        

        </Nav>
        <Nav inline>

            <Nav.Link href='#' as={Link} to='/login'> Hello {session.userLog.name}</Nav.Link>
            <Nav.Link href='#' as={Link} to='/' onClick={logoutP}> Logout </Nav.Link>
        </Nav>
        </Container>
        </Navbar>
        :
        <Navbar bg="dark" variant="dark" className={s.navHome}>
        <Container>
        <Navbar.Brand href='#' ><h4>KUEPA<span className={s.point__title}>.</span>CO</h4></Navbar.Brand>
        <Nav className="mr-auto">

        

        </Nav>
        <Nav inline>
            <Nav.Link href='#' as={Link} to='/login'> Login</Nav.Link>
            <Nav.Link href='#' as={Link} to='/register'>Resgister</Nav.Link>
        </Nav>
        </Container>
        </Navbar>
    }
   
    
      </>
    )
}


export default Navigation