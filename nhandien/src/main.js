import { VIDEO_CONFIG } from './config/constants.js';
import { VideoService } from './services/VideoService.js';
import { HandDetectionService } from './services/HandDetectionService.js';

class App {
    constructor() {
        this.output = document.getElementById('output');
        this.videoService = new VideoService(document.getElementById('video'));
        this.handDetection = new HandDetectionService();
    }

    async initialize() {
        try {
            await this.videoService.initialize(VIDEO_CONFIG);
            await this.handDetection.initialize();
            
            this.startDetection();
            this.output.textContent = 'Sẵn sàng nhận diện bàn tay';
        } catch (error) {
            this.output.textContent = `Lỗi: ${error.message}`;
            console.error('Lỗi khởi tạo:', error);
        }
    }

    async startDetection() {
        try {
            const fingerCount = await this.handDetection.detectHands(this.videoService.video);
            this.output.textContent = fingerCount > 0 
                ? `Số ngón tay đang giơ: ${fingerCount}`
                : 'Không phát hiện bàn tay';
        } catch (error) {
            console.error('Lỗi nhận diện:', error);
        }

        requestAnimationFrame(() => this.startDetection());
    }

    cleanup() {
        this.videoService.cleanup();
    }
}

const app = new App();
app.initialize();

window.addEventListener('beforeunload', () => app.cleanup());
