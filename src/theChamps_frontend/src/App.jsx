import { useState } from 'react';
import { theChamps_backend } from 'declarations/theChamps_backend';
import HomePage from './pages/Homepage';
import MyProfilePage from './pages/MyProfilePage';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    theChamps_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
     <HomePage/> 
     {/* <MyProfilePage/> */}
    </main>
  );
}

export default App;
