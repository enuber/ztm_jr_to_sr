import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
  // will be caught by ErrorBoundry, will cause dev to crash but, in live build will not.
  // if (true) {
  //   throw new Error('Nooooo!');
  // }
  return (
    <div>
      {robots.map((user, index) => {
        return (
          <Card key={index} id={user.id} name={user.name} email={user.email} />
        );
      })}
    </div>
  );
};

export default CardList;
