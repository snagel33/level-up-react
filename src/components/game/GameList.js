import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "./GameManager.js"
import { useHistory } from "react-router-dom"
import "./GameList.css"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const handleDeleteGame = id => {
        deleteGame(id)
            .then(() => getGames().then(setGames));
    }

    return (
        <article className="games">
            <button className="btn_new"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div className="game__type">Game type is {game.game_type.label}</div>
                        <div className="game__type">Added by {game.gamer.id}</div>
                        <button className="btn_edit"
                                onClick={() => {
                                    history.push({ pathname: `/games/${game.id}/edit` })
                                }
                        }>Edit</button>
                        <button className="btn_delete"
                                onClick={() => handleDeleteGame(game.id)}>Delete</button>
                    </section>

                })
            }
        </article>
    )
}