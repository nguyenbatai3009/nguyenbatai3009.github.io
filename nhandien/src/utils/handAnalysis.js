import { FINGER_LANDMARKS } from '../config/fingerData.js';
import { FINGER_CONFIG } from '../config/constants.js';
import { calculateAngle } from './geometry.js';

/**
 * Phân tích trạng thái các ngón tay
 * @param {Array} landmarks Các điểm mốc của bàn tay
 * @returns {Object} Trạng thái của từng ngón tay
 */
export function analyzeFingers(landmarks) {
    const fingerStates = {};
    
    for (const [finger, points] of Object.entries(FINGER_LANDMARKS)) {
        fingerStates[finger] = isFingerRaised(landmarks, points);
    }
    
    return fingerStates;
}

function isFingerRaised(landmarks, fingerPoints) {
    const angle = calculateAngle(
        landmarks[fingerPoints[0]],
        landmarks[fingerPoints[1]],
        landmarks[fingerPoints[2]]
    );
    return angle > FINGER_CONFIG.angleThreshold;
}