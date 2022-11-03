import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import axios from 'axios';

// Тут список пользователей: https://reqres.in/api/users
let initial = axios.create({
  baseURL: 'https://reqres.in/api/users'
})

function App() {
  const [users, setusers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [invitelist, setinvitelist] = useState([]);
  const [result, setresult] = useState(true);
  const [count, setcount] = useState(0);
  useEffect(() => {

    initial.get().then(res => {
      setusers(res.data.data)
    })

    setLoading(false)
  }, [])
  function onInvite(id) {
    if (invitelist.includes(id)) {
      setinvitelist(prev => prev.filter(_id => _id !== id))
    }
    else {
      setinvitelist(prev => [...prev, id])
    }
    
  }
  const [search, setsearch] = useState('');
  function handlerChange(e) {
    setsearch(e.target.value)
  }
  return (
    <div className="App">
      {result ?
        <Users setresult={setresult} items={users} search={search} invitelist={invitelist} isLoading={isLoading} handlerChange={handlerChange} onInvite={onInvite} /> :
        <Success count={invitelist.length}/>}
    </div>
  );
}

export default App;
