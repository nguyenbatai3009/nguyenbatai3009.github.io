import { FINGER_INDICES, DETECTION_CONFIG } from '../config/fingerConfig.js';
import { calculateAngle } from './geometry.js';

export function analyzeFingers(landmarks) {
    const fingerStates = {};
    
    for (const [finger, indices] of Object.entries(FINGER_INDICES)) {
        const angle = calculateAngle(
            landmarks[indices[0]], 
            landmarks[indices[1]], 
            landmarks[indices[2]]
        );
        fingerStates[finger] = angle > DETECTION_CONFIG.ANGLE_THRESHOLD;
    }
    
    return fingerStates;
}