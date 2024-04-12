import React ,{useState} from 'react';

export default function Sorting({ posts, setPosts , isusername}) {
  
  const [oldtonew, setoldtonew] =useState(false);

  const OldtoNew = () => {
    const sortedPosts = [...posts].reverse();
    setPosts(sortedPosts);
    setoldtonew(!oldtonew);
  };

  const UserSorting = () => {
    const sortedPosts = [...posts].sort((a, b) => {
      const usernameA = a.username.toLowerCase();
      const usernameB = b.username.toLowerCase();
      if (usernameA < usernameB) {
        return -1;
      }
      if (usernameA > usernameB) {
        return 1;
      }
      return 0;
    });
    setPosts(sortedPosts);
  };

  return (
    <div className='FormContainer bg-green-400'>
      <p>Sort by:</p>
      {oldtonew==false ? (
            <button className='block' onClick={OldtoNew}>Oldest to Latest</button>
      ) : (
        <button className='block' onClick={OldtoNew}>Latest to Oldest</button>
      )}
      {isusername==false && (
         <button className='block' onClick={UserSorting}>Username</button>
      )}
      
    </div>
  );
}
