import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
        console.log("you hit changeGameState")
        console.log(domEvent.target.value)
    }
    

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Game Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gamer">Gamer: </label>
                    <input type="text" name="gamer" required autoFocus className="form-control"
                        value={currentGame.gamer}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <input type="text" name="game_type" required autoFocus className="form-control"
                        value={currentGame.game_type}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}