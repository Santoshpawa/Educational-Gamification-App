import { useState } from "react";

function Signup(){

    const [email, setEmail] = useState('');

    return (
        <div>
            <input type="text" placeholder="Enter Email"  />
            <input type="password" placeholder="Enter Password" />
            <button >Sign Up</button>
        </div>
    )
}

export default Signup;