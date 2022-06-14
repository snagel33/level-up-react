import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager.js"
import { createEvent, getEvents, getEventTypes } from './EventManager.js'

export const EventForm = () => {
    const history = useHistory()
    const [events, setEvents] = useState([])
    const [games, setGames] = useState([])
    const [eventOrganizers, setEventOrganizers] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        game: "",
        description: "",
        date: "",
        time: "",
        organizer: ""
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
    }
    , [])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }
    , [])

    // useEffect(() => {
    //     getEventOrganizers().then(data => setEventOrganizers(data))
    // }
    // , [])

    const changeEventState = (domEvent) => {
        const newEvent = Object.assign({}, currentEvent)
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEvent)
        console.log("you hit changeEventState")
        console.log(domEvent.target.value)
    }

    const handleControlledInputChange = (event) => {
        const newEvent = { ...currentEvent }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        // if (event.target.name.includes("gameType")) {
        //     selectedVal = parseInt(selectedVal)
        // }
        newEvent[event.target.name] = selectedVal
        setCurrentEvent(newEvent)
        console.log("you hit changeGameState")
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select value={currentEvent.game} name="game" id="gameId" onChange={handleControlledInputChange}>
                        <option value="0">Select a game</option>
                        {games.map(g => (
                            <option key={g.id} value={g.id}>{g.title}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <select value={currentEvent.organizer} name="organizer" id="organizerId" onChange={changeEventState}>
                        <option value="0">Select an organizer</option>
                        {eventOrganizers.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                </div> */}
                <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <input type="text" name="organizer" required autoFocus className="form-control"
                        value={currentEvent.organizer}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    console.log(currentEvent)
                    // const event = {
                    //     game: currentEvent.game,
                    //     description: currentEvent.description,
                    //     date: parseInt(currentEvent.date),
                    //     time: parseInt(currentEvent.time),
                    //     organizer: parseInt(currentEvent.organizer)
                    // }
                    console.log("new_event")
                    // Send POST request to your API
                    createEvent(currentEvent)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}