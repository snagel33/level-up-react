import React, { useEffect, useState } from "react";
import { getEvents } from "./EventManager.js";
import { useHistory } from "react-router-dom";
import "./EventList.css";

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }
    , [])

    return (
        <article className="events">
            <button className="btn_new"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">{event.date}</div>
                        <div className="event__time">{event.time}</div>
                        <div className="event__game">{event.game.title}</div>
                        <div className="event__organizer">{event.organizer.id}</div>
                        <button className="btn_edit"
                        onClick={() => {
                            history.push({ pathname: `/events/${event.id}/edit` })
                        }
                    }>Edit</button>
                    </section>
                })
            }
        </article>
    )
}