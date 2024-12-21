import { Hand } from '@tensorflow-models/handpose';

// Function to calculate the distance between two points
const getDistance = (a: number[], b: number[]): number => {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
};

// Function to recognize specific hand gestures
export const recognizeGesture = (hand: Hand): string => {
  const landmarks = hand.landmarks;
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  const palmBase = landmarks[0];

  // Check for closed fist
  if (
    getDistance(thumbTip, palmBase) < 100 &&
    getDistance(indexTip, palmBase) < 100 &&
    getDistance(middleTip, palmBase) < 100 &&
    getDistance(ringTip, palmBase) < 100 &&
    getDistance(pinkyTip, palmBase) < 100
  ) {
    return "Closed Fist";
  }

  // Check for open palm
  if (
    getDistance(thumbTip, palmBase) > 150 &&
    getDistance(indexTip, palmBase) > 150 &&
    getDistance(middleTip, palmBase) > 150 &&
    getDistance(ringTip, palmBase) > 150 &&
    getDistance(pinkyTip, palmBase) > 150
  ) {
    return "Open Palm";
  }

  // Check for thumbs up
  if (
    thumbTip[1] < landmarks[2][1] &&
    getDistance(indexTip, palmBase) < 100 &&
    getDistance(middleTip, palmBase) < 100 &&
    getDistance(ringTip, palmBase) < 100 &&
    getDistance(pinkyTip, palmBase) < 100
  ) {
    return "Thumbs Up";
  }

  // Default: no specific gesture recognized
  return "No specific gesture";
};

