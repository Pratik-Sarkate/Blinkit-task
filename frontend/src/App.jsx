import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App(){


    return (
        <>
            {/* <Upload/> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup/>}></Route>
                    <Route path="/signin" element={<Signin/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}



export default App