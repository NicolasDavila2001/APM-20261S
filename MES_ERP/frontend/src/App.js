import React from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Mes from "./pages/Mes";
import Erp from "./pages/Erp";
import Line1 from "./pages/Line1";
import Line2 from "./pages/Line2";
import Line3 from "./pages/Line3";
import HR from "./pages/HR";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Compras from "./pages/Compras";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/mes" element={<Mes />} />

                <Route path="/erp" element={<Erp />} />

                <Route path="/line1" element={<Line1 />} />

                <Route path="/line2" element={<Line2 />} />

                <Route path="/line3" element={<Line3 />} />

                <Route path="/hr" element={<HR />} />

                <Route path="/inventory" element={<Inventory />} />

                <Route path="/sales" element={<Sales />} />

                <Route path="/compras" element={<Compras />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;