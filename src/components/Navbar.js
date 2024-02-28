import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigation = useNavigate();
    return (
        <nav className="bg-gray-500 p-4 flex items-center justify-between">

            <Link to="/">
                <img src="/images/im-200.png" alt="Logo" className="h-8 w-auto" />
            </Link>


            <div className="flex space-x-4 ml-4">
                <Link to="/" className="text-white font-extrabold hover:text-green-500 after:text-green-400">Home</Link>
                <Link to="/about" className="text-white font-extrabold hover:text-green-500 after:text-green-400">About</Link>
            </div>

            <button className="bg-white font-extrabold text-blue-500 px-4 py-2 rounded-xl" onClick={() => { navigation('/login') }}>Login</button>
        </nav>
    )
}

export default Navbar