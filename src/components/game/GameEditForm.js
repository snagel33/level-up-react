import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById, updateGame } from "./GameManager.js"
import { getGameTypes } from "./GameManager.js"
import { useHistory } from "react-router-dom"

export const GameEditForm = () => {
    const [game, setGame] = useState({
        title: "",
        maker: "",
        number_of_players: "",
        skill_level: "",
        game_type: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const {gameId} = useParams();
    const history = useHistory();
    const navigate = useHistory();
    const [gameTypes, setGameTypes] = useState([]);

    const handleFieldChange = (event) => {
        const stateToChange = { ...game };
        stateToChange[event.target.id] = event.target.value;
        setGame(stateToChange);
    }

    const updateExistingGame = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const editedGame = {
            id: gameId,
            title: game.title,
            maker: game.maker,
            number_of_players: game.number_of_players,
            skill_level: game.skill_level,
            game_type: game.game_type,
        };

    updateGame(editedGame)
        .then(() => navigate.push("/games"))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getGameById(gameId)
            .then(game => {
                setGame(game);
                setIsLoading(false);
            })
        }, []);

    useEffect(() => {
        getGameTypes()
            .then(gameTypes => setGameTypes(gameTypes))
        }, []);

    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="title"
                            value={game.title}
                        />
                        <label htmlFor="title">Game Title</label>

                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="maker"
                            value={game.maker}
                        />
                        <label htmlFor="maker">Game Maker</label>

                        <input
                            type="number"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="number_of_players"
                            value={game.number_of_players}
                        />
                        <label htmlFor="number_of_players">Number of Players</label>

                        <input
                            type="number"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="skill_level"
                            value={game.skill_level}
                        />
                        <label htmlFor="skill_level">Skill Level</label>

                        <select
                            className="form-control"
                            onChange={handleFieldChange}
                            id="game_type"
                            value={game.game_type}
                        >
                            <option value="">Select a game type</option>
                            {gameTypes.map(gameType => {
                                return <option key={gameType.id} value={gameType.id}>{gameType.label}</option>
                            }
                            )}
                        </select>
                        <label htmlFor="game_type">Game Type</label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingGame}
                            className="btn btn-primary">Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}