import React from 'react';
import './App.css';
import GoogleLoginButton from './components/GoogleLoginButton';


const App = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-700 underline">
        Hello world!
      </h1>
      <GoogleLoginButton />
    </div>
  )
}

export default App