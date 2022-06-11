import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList"
import { GameList } from "./game/GameList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/event/EventList">
                <EventList />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
        </main>
    </>
}
