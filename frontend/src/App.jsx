import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./signup"
import Login from "./login"
import Dashboard from "./dashboard"
import QuestionDetail from "./questionDetail"


function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/auth/signup" element={<Signup/>} />
        <Route path="/auth/login" element = {<Login/>}/>
        <Route path="/questions/id" element = {<QuestionDetail/>}/>
      </Routes>
    </Router>
      
       
    </>
  )
}

export default App
