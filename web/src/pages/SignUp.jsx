import { Link } from "react-router";
import { useState } from "react";

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch("http://localhost:3000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() )
        .then(returnedJSON => {
            console.log(returnedJSON);
        });

    }; 

    return (
        <div className="flex justify-center items-center mb-24 mt-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-6xl text-orange-600 font-bold mb-6 text-center">Sign Up</h1>
                <p className="text-gray-600 text-center mb-8">Create an account to start your wishlist!</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-left text-gray-700 font-medium mb-2">
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
                        <label htmlFor="password" className="block text-left text-gray-700 font-medium mb-2">
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
                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-left text-gray-700 font-medium mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                            onChange={ (event) => {
                                setFormData({ ...formData, confirmPassword: event.target.value })
                            }}
                        />
                    </div>
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="flex justify-center mt-6 gap-2">
                    <p className="text-gray-600">Already have an account?</p>
                    <Link to="/signin" className="text-orange-500 font-bold underline">
                        Sign in!
                    </Link>
                </div>
            </div>
        </div>
    );
}