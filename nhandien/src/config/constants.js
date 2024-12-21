export const VIDEO_CONFIG = {
    width: 960,
    height: 720,
    audio: false
};

export const HAND_CONFIG = {
    confidenceThreshold: 0.7,
    maxHands: 1,
    fingerIndices: {
        tips: [8, 12, 16, 20],
        bases: [6, 10, 14, 18],
        thumb: {
            tip: 4,
            base: 2
        }
    }
};

// Cấu hình bổ sung cho các kích thước màn hình
export const SCREEN_SIZES = {
    mobile: {
        maxWidth: 767
    },
    fullHD: {
        minWidth: 1920,
        maxWidth: 2399
    },
    twoK: {
        minWidth: 2560,
        maxWidth: 2879
    }
};
