
import Lottie from 'lottie-react';
// 💡 IMPORTANT: Adjust this path if your JSON file is elsewhere
import animationData from '../assets/Heartbeat Lottie Animation.json';
// import styles from './LoadingAnimation.module.css'; // For basic centering/styling

export const LoadingAnimation = () => {
  return (
    <div >
      <Lottie
        animationData={animationData} // Pass the imported JSON data
        loop={true}                   // Set to loop continuously
        autoplay={true}               // Set to play automatically
        // Apply basic styling
      />
      <p>
        Loading...
      </p>
    </div>
  );
};