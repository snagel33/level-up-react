import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList"
import { GameList } from "./game/GameList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { GameEditForm } from "./game/GameEditForm"
import { EventEditForm } from "./event/EventEditForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path={["/","/games"]}><GameList /></Route>
            <Route exact path="/games/new"><GameForm /></Route>
            <Route exact path="/games/:gameId/edit"><GameEditForm /></Route>
            {}
            <Route exact path="/event/EventList"><EventList /></Route>
            <Route exact path="/events/new"><EventForm /></Route>
            <Route exact path="/events/:eventId/edit"><EventEditForm /></Route>
        </main>
    </>
}
