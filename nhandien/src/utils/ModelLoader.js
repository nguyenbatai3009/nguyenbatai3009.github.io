import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

export class ModelLoader {
    constructor(timeout = 30000) {
        this.timeout = timeout;
    }

    async loadModel() {
        await tf.ready();
        
        const modelLoadPromise = handpose.load();
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout loading model')), this.timeout)
        );
        
        return Promise.race([modelLoadPromise, timeoutPromise]);
    }
}