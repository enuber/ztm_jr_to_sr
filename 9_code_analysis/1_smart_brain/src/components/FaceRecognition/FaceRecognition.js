import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes }) => {
  const boxList = boxes.map((box, index) => (
    <div
      key={index}
      className="bounding-box"
      style={{
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol,
      }}
    ></div>
  ));

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImg" alt="" src={imageURL} width="500px" height="auto" />
        {boxList}
      </div>
    </div>
  );
};

export default FaceRecognition;
