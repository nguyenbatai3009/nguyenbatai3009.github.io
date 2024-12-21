import { FINGER_NAMES } from '../config/fingerData.js';
import { APP_CONFIG } from '../config/constants.js';

export class HandVisualizationService {
    constructor(outputElement) {
        this.output = outputElement;
        this.lastUpdate = 0;
    }

    displayResults(fingerStates) {
        // Giới hạn tốc độ cập nhật
        const now = Date.now();
        if (now - this.lastUpdate < APP_CONFIG.updateInterval) return;
        this.lastUpdate = now;

        if (!fingerStates) {
            this.showNoHandsMessage();
            return;
        }

        const raisedFingers = this.getRaisedFingers(fingerStates);
        this.updateDisplay(raisedFingers);
    }

    getRaisedFingers(fingerStates) {
        return Object.entries(fingerStates)
            .filter(([_, isRaised]) => isRaised)
            .map(([finger]) => FINGER_NAMES[finger]);
    }

    updateDisplay(raisedFingers) {
        const totalCount = raisedFingers.length;
        let message = `Số ngón tay đang giơ: ${totalCount}\n`;
        
        if (totalCount > 0) {
            message += `Các ngón: ${raisedFingers.join(', ')}`;
        }
        
        this.output.textContent = message;
    }

    showNoHandsMessage() {
        this.output.textContent = 'Không phát hiện bàn tay';
    }
}