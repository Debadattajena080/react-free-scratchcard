**A lightweight, customizable React scratch card component with random rewards support.**

## Use it to add gamified rewards, engagement boosters, or event-driven scratch cards to your React apps effortlessly.

## 🚀 Features

✅ Easy to integrate in any React app  
✅ Supports **random rewards** for gamified campaigns  
✅ Auto-scratch and manual scratch options  
✅ Lightweight and flexible customization  
✅ Local storage reward caching with expir

---

## 📦 Installation

npm install react-free-scratchcard

or

yarn add react-free-scratchcard

⚡ Quick Usage

import ScratchCard from "react-free-scratchcard";
import scratchImage from "./assets/scratch-surface.jpg";
import prizeImage from "./assets/prize.jpg";

<ScratchCard
      scratchImage={scratchImage}
      prizeImage={prizeImage}
    />

🎁 Random Rewards Example

import ScratchCard from "react-free-scratchcard";
import scratchImage from "./assets/scratch-surface.jpg";
import prize1 from "./assets/prize1.jpg";
import prize2 from "./assets/prize2.jpg";

const rewardOptions = [
{ image: prizeImage1, points: 899 },
{ image: prizeImage2, points: 999 },
];

const [selectedReward, setSelectedReward] = useState(null);

useEffect(() => {
const randomIndex = Math.floor(Math.random() \* rewardOptions.length);
setSelectedReward(rewardOptions[randomIndex]);
}, []);

const handleScratchComplete = (result) => {
console.log("Scratch completed!", result);
};

      <ScratchCard
        scratchImage={Fimage}
        prizeImage={selectedReward.image}
        scratchedPoints={selectedReward.points}
        onScratchComplete={handleScratchComplete}
      />

⚙️ Props Reference
| Prop                  | Type       | Default          | Description                          |
| --------------------- | ---------- | ---------------- | ------------------------------------ |
|  scratchImage         |  string    |   Required       | Scratch surface image                |

|  prizeImage           |  string    |      ---         | Image revealed after scratching      |

|  rewardOptions        |   array    |       []         | Array of rewards `{ image, points }` |

|  onRewardSelected     |   function |      ---         | Callback when a reward is selected   |

|  onScratchComplete    |   function |      ---         | Callback after scratch completes     |

|  scratchedPoints     |    number   |       0          | Points displayed/awarded             |

|  revealButtonText     | string     |  "Scratch Now"   | Text shown on the reveal button      |

|  revealingText        |  string    |  "Revealing..."  | Text shown during auto-scratch       |

|  scratchRadius        |  number    |       20         | Brush radius for scratching          |

|  autoScratchSpeed     |  number    |       1          | Speed of auto-scratch animation      |

|  rewardExpiryMinutes  |  number    |       5          | Minutes before local reward expiry   |

|  storeReward          |  boolean   |     true         | Enable/disable local reward caching  |


🛠️ Use Cases
✅ Gamified learning platforms
✅ E-commerce promotions
✅ Event rewards (festivals, quizzes)
✅ User engagement and retention activities



✨ Author
Debadatta Jena


