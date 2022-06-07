import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList"
import { GameList } from "./game/GameList"
import { GameForm } from "./game/GameForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/game/Gamelist">
                <GameList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/event/EventList">
                <EventList />
            </Route>
        </main>
    </>
}
