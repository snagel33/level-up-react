import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { useHistory } from "react-router-dom"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="nav-item">
                <img src="https://www.seekpng.com/png/detail/150-1504495_my-snes-comeback-super-nintendo-clip-art.png" alt="logo" className="logo" />
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/">Games</Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link" to="/game/GameList">Games</Link>
            </li> */}
            <li className="nav-item">
                <Link className="nav-link" to="/event/EventList">Events</Link>
            </li>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
