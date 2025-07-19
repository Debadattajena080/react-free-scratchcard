import React, { useState } from "react";
import frontImage from "../../assets/google-scratch-card.jpg";
import S999 from "../../assets/winning-card.jpg";
import S899 from "../../assets/Google-Pay-Rs-800.png";
import ScratchCard from "../scratchcard/ScratchCard";

const Events = () => {
  const rewardOptions = [
    { image: S999, points: 999 },
    { image: S899, points: 899 },
  ];

  const [selectedReward] = useState(() => {
    const randomIndex = Math.floor(Math.random() * rewardOptions.length);
    return rewardOptions[randomIndex];
  });

  const handleScratchComplete = () => {
    console.log("Scratch completed!");
  };

  console.log("selected image", selectedReward);

  return (
    <div>
      <ScratchCard
        onScratchComplete={handleScratchComplete}
        scratchImage={frontImage}
        prizeImage={selectedReward?.image}
        scratchedPoints={selectedReward?.points}
      />
    </div>
  );
};

export default Events;
