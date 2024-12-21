import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import { HAND_CONFIG } from '../config/constants.js';
import { FingerCounter } from '../utils/FingerCounter.js';

export class HandDetectionService {
    constructor() {
        this.model = null;
        this.fingerCounter = new FingerCounter(HAND_CONFIG.fingerIndices);
    }

    async initialize() {
        try {
            await tf.ready();
            this.model = await handpose.load();
            return true;
        } catch (error) {
            throw new Error(`Không thể khởi tạo model: ${error.message}`);
        }
    }

    async detectHands(video) {
        if (!this.model) {
            throw new Error('Model chưa được khởi tạo');
        }

        try {
            const predictions = await this.model.estimateHands(video);
            if (predictions.length > 0) {
                return this.fingerCounter.countFingers(predictions[0].landmarks);
            }
            return 0;
        } catch (error) {
            console.error('Lỗi nhận diện:', error);
            return 0;
        }
    }
}
