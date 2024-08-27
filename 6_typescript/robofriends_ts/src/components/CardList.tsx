import React from 'react';
import Card from './Card';
import { IRobot } from '../containers/App';

interface CardListProps {
  robots: Array<IRobot>;
}

const CardList: React.FC<CardListProps> = ({ robots }) => {
  // will be caught by ErrorBoundry, will cause dev to crash but, in live build will not.
  // if (true) {
  //   throw new Error('Nooooo!');
  // }
  return (
    <div>
      {robots.map((user) => {
        return (
          <Card
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
          />
        );
      })}
    </div>
  );
};

export default CardList;
