import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ items, isLoading, onInvite, invitelist, handlerChange, search, setresult }) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input value={search} onChange={e => handlerChange(e)} type="text" placeholder="Find user..." />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {
            items.filter(obj => {
              let fullname = obj.first_name + ' ' + obj.last_name
              if (fullname.toLowerCase().includes(search.toLowerCase()) || obj.email.toLowerCase().includes(search.toLowerCase())) {
                return true
              }

            }).map(res => (

              <User key={res.id} {...res} invitelist={invitelist} onInvite={onInvite} />
            ))
          }
        </ul>
      )}
      {invitelist.length > 0
        &&
        <button onClick={() => setresult(false)} className="send-invite-btn">Send invitation</button>
      }
    </>
  );
};
