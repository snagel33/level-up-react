import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { getGames } from "../game/GameManager"
import { getEventById, updateEvent } from "./EventManager"
import { getEventOrganizer } from "./EventManager"

export const EventEditForm = () => {
    const [event, setEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: "",
        organizer: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const {eventId} = useParams();
    const history = useHistory();
    const navigate = useHistory();
    const [games, setGames] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    
    const handleFieldChange = (event) => {
        const stateToChange = { ...event };
        stateToChange[event.target.id] = event.target.value;
        setEvent(stateToChange);
    }

    const updateExistingEvent = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const editedEvent = {
            id: eventId,
            description: event.description,
            date: event.date,
            time: event.time,
            game: event.game,
            organizer: event.organizer,
        };

    updateEvent(editedEvent)
        .then(() => navigate.push("/events"))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getEventById(eventId)
            .then(event => {
                setEvent(event);
                setIsLoading(false);
            }
        , [])
    }, []);

    useEffect(() => {
        getGames()
            .then(games => setGames(games))
        }, []);

    // useEffect(() => {
    //     getEventOrganizer(eventId)
    //         .then(organizers => setOrganizers(organizers))
    //     }, []);

    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                            type="text"
                            required
                            id="description"
                            value={event.description}
                        />
                        <label htmlFor="description">Description</label>

                        <input
                            type="text"
                            required
                            id="date"
                            value={event.date}
                        />
                        <label htmlFor="date">Date</label>

                        <input
                            type="text"
                            required
                            id="time"
                            value={event.time}
                        />
                        <label htmlFor="time">Time</label>

                        <select
                            className="form-control"
                            onChange={handleFieldChange}
                            id="game"
                            value={event.game}
                        >
                            <option value="">Select Game</option>
                            {games.map(game => (
                                <option key={game.id} value={game.id}>
                                    {game.title}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="game">Game</label>

                        <input
                            type="text"
                            required
                            id="organizer"
                            value={event.organizer}
                        />
                        <label htmlFor="organizer">Organizer</label>

                    </div>
                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingEvent}
                            className="btn btn-primary">Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    )
}