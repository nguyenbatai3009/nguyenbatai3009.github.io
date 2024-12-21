export class FingerCounter {
    constructor(indices) {
        this.indices = indices;
    }

    countFingers(landmarks) {
        let count = 0;

        // Đếm 4 ngón (trỏ, giữa, áp út, út)
        for (let i = 0; i < this.indices.tips.length; i++) {
            if (landmarks[this.indices.tips[i]][1] < landmarks[this.indices.bases[i]][1]) {
                count++;
            }
        }

        // Kiểm tra ngón cái
        const thumbTip = landmarks[this.indices.thumb.tip];
        const thumbBase = landmarks[this.indices.thumb.base];
        if (thumbTip[0] > thumbBase[0]) {
            count++;
        }

        return count;
    }
}