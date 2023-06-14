import "./App.css";
import AppLayout from "./layouts/AppLayout";
import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import { Drivers, Dhl, Races, Teams } from "./pages";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route path={path.DRIVERS} element={<Drivers />} />
                    <Route path={path.RACES} element={<Races />} />
                    <Route path={path.TEAMS} element={<Teams />} />
                    <Route path={path.DHL} element={<Dhl />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
