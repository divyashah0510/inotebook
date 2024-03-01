/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-32 w-auto" src="/images/im-500.png" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">About</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="block text-sm font-medium leading-6 text-gray-900">This is a simple web application that uses React and Tailwind CSS. It has a simple login and signup system. It uses JWT for authentication. The backend is written in Node.js and Express.js. The database used is MongoDB. The code is available on GitHub <Link className='text-cyan-500' to="https://wwww.github.com/divyashah-510/inotebook"> Here</Link>. The application is a simple example of how to use React and Tailwind CSS to create a simple web application.</p>
      </div>
    </div>

  )
}

export default About