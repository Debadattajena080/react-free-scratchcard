import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./scratchcard.css";

const ScratchCard = ({
  scratchImage,
  prizeImage,
  rewardOptions,
  onRewardSelected,
  onScratchComplete,
  scratchedPoints,
  revealButtonText = "Scratch Now",
  revealingText = "Revealing...",
  scratchRadius = 20,
  autoScratchSpeed = 1,
  rewardExpiryMinutes = 5,
  storeReward = true,
}) => {
  const canvasRef = useRef(null);
  const prizeCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAutoScratching, setIsAutoScratching] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  // Initialize reward selection
  useEffect(() => {
    if (rewardOptions && rewardOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * rewardOptions.length);
      const reward = rewardOptions[randomIndex];
      setSelectedReward(reward);

      if (onRewardSelected) {
        onRewardSelected(reward);
      }
    }
  }, [rewardOptions, onRewardSelected]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Draw scratch surface
    if (scratchImage) {
      const img = new Image();
      img.src = scratchImage;
      img.onload = () => ctx.drawImage(img, 0, 0, width, height);
    } else {
      ctx.fillStyle = "#ddd";
      ctx.fillRect(0, 0, width, height);
    }

    // Draw prize
    const prizeCanvas = prizeCanvasRef.current;
    if (!prizeCanvas) return;

    const prizeCtx = prizeCanvas.getContext("2d");
    prizeCanvas.width = width;
    prizeCanvas.height = height;

    const imageToUse = selectedReward?.image || prizeImage;
    if (!imageToUse) return;

    const prizeImg = new Image();
    prizeImg.src = imageToUse;
    prizeImg.onload = () => prizeCtx.drawImage(prizeImg, 0, 0, width, height);

    return () => cancelAnimationFrame(animationRef.current);
  }, [scratchImage, prizeImage, selectedReward]);

  const autoScratch = () => {
    if (isAutoScratching || isRevealed) return;

    setIsAutoScratching(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";

    const width = canvas.width;
    const height = canvas.height;

    const centerX = width / 2;
    const centerY = height / 2;

    let angle = 0;
    let radius = 10;
    const maxRadius = Math.min(width, height) / 2;
    const radiusStep = autoScratchSpeed;
    const angleStep = 0.2;

    const animate = () => {
      const x = centerX + radius * Math.cos(angle) + Math.random() * 5;
      const y = centerY + radius * Math.sin(angle) + Math.random() * 5;

      ctx.beginPath();
      ctx.arc(x, y, scratchRadius, 0, Math.PI * 2);
      ctx.fill();

      angle += angleStep;
      radius += radiusStep;

      if (radius < maxRadius) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationRef.current);
        setIsAutoScratching(false);
        setIsRevealed(true);

        const result = {
          reward: selectedReward,
          points: selectedReward?.points || scratchedPoints || 0,
        };

        if (onScratchComplete) {
          onScratchComplete(result);
        }

        if (storeReward && result.points > 0) {
          const rewardData = {
            points: result.points,
            expiry: Date.now() + rewardExpiryMinutes * 60 * 1000,
          };
          localStorage.setItem("scratchReward", JSON.stringify(rewardData));
        }
      }
    };

    animate();
  };

  return (
    <div className="scratch-container">
      <button
        className={`scratch-btn ${isRevealed ? "hidden" : ""}`}
        onClick={autoScratch}
        disabled={isAutoScratching}
      >
        {isAutoScratching ? revealingText : revealButtonText}
      </button>

      <div className="card-wrapper" onClick={autoScratch}>
        <canvas ref={canvasRef} className="scratch-canvas mt-2" />
        <canvas
          ref={prizeCanvasRef}
          className={`prize-canvas ${isRevealed ? "visible" : ""}`}
        />
      </div>
    </div>
  );
};

ScratchCard.propTypes = {
  // Basic usage
  scratchImage: PropTypes.string.isRequired,
  prizeImage: PropTypes.string,

  // Random rewards
  rewardOptions: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      points: PropTypes.number,
    })
  ),
  onRewardSelected: PropTypes.func,

  // Callbacks
  onScratchComplete: PropTypes.func,

  // Points
  scratchedPoints: PropTypes.number,

  // UI
  revealButtonText: PropTypes.string,
  revealingText: PropTypes.string,

  // Behavior
  scratchRadius: PropTypes.number,
  autoScratchSpeed: PropTypes.number,

  // Storage
  rewardExpiryMinutes: PropTypes.number,
  storeReward: PropTypes.bool,
};

ScratchCard.defaultProps = {
  rewardOptions: [],
  storeReward: true,
};

export default ScratchCard;
