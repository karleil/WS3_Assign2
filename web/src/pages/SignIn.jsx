import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function SignIn( handleLogin ) {

    const [loginSuccess, setLoginSuccess] = useState(false); //tracks if login was successful
    const [formData, setFormData] = useState({ //tracks email and password
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(loginSuccess) { navigate("/guitars") }
    }, [loginSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/users/sign-in", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() )
        .then( returnedData => {
            localStorage.setItem( "jwt-token", returnedData.jwt);
            setLoginSuccess(true);
            handleLogin(); // Call the handleLogin function passed as a prop
        });
        
    };


    return (
        <div className="flex justify-center items-center mb-48 mt-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-6xl text-orange-600 font-bold mb-6 text-center">Sign In</h1>
                <p className="text-gray-600 text-center mb-8">Welcome back! Please sign in to your account.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                            onChange={ (event) => {
                                setFormData({ ...formData, email: event.target.value })
                            }} 
                        />
                    </div>
                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                            onChange={ (event) => {
                                setFormData({ ...formData, password: event.target.value })
                            }} 
                        />
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="flex justify-center mt-6 gap-2">
                    <p className="text-gray-600">Don't have an account?</p>
                    <Link to="/signup" className="text-orange-500 font-bold underline">
                        Sign up!
                    </Link>
                </div>
            </div>
        </div>
    );
}