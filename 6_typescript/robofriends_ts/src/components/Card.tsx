import React from 'react';

interface CardProps {
  name: string;
  email: string;
  id: number;
}

//SFC is deprecated and replaced with FC - functional component
const Card: React.FC<CardProps> = ({ name, email, id }) => {
  return (
    <div className="bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img src={`https://robohash.org/${id}?size=200x200`} alt="robot" />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;
