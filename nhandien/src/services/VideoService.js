export class VideoService {
    constructor(videoElement) {
        this.video = videoElement;
        this.stream = null;
    }

    async initialize(config) {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { width: config.width, height: config.height },
                audio: config.audio
            });
            this.video.srcObject = this.stream;
            
            await new Promise(resolve => {
                this.video.onloadedmetadata = resolve;
            });
            
            return true;
        } catch (error) {
            throw new Error(`Không thể khởi tạo camera: ${error.message}`);
        }
    }

    cleanup() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }
}