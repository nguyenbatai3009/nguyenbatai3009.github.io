'use client'

import { useState, useRef, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import * as handpose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'
import { drawHand } from '../utils/drawHand'
import { recognizeGesture } from '../utils/handGestures';

export default function FingerCounter() {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fingerCount, setFingerCount] = useState<number>(0)
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false)
  const [gesture, setGesture] = useState<string>("No hand detected");
  const [isHandPresent, setIsHandPresent] = useState(false);

  const runHandpose = async () => {
    try {
      // Initialize TensorFlow.js
      await tf.ready()
      // Set the backend to 'webgl'
      await tf.setBackend('webgl')
      
      const net = await handpose.load()
      console.log('Handpose model loaded.')
      setIsModelLoaded(true)
      
      // Loop and detect hands
      setInterval(() => {
        detect(net)
      }, 100)
    } catch (error) {
      console.error('Error initializing TensorFlow.js or loading the handpose model:', error)
    }
  }

  const detect = async (net: handpose.HandPose) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Set canvas height and width
      if (canvasRef.current) {
        canvasRef.current.width = videoWidth
        canvasRef.current.height = videoHeight
      }

      // Make Detections
      const hand = await net.estimateHands(video)

      if (hand.length > 0) {
        setIsHandPresent(true);
        const fingers = countFingers(hand[0].landmarks);
        setFingerCount(fingers);
        setGesture(recognizeGesture(hand[0]));
      } else {
        setIsHandPresent(false);
        setFingerCount(0);
        setGesture("No hand detected");
      }

      // Draw mesh
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) {
        drawHand(hand, ctx)
      }
    }
  }

  const countFingers = (landmarks: number[][]) => {
    let fingerCount = 0
    
    // Thumb
    if (landmarks[4][0] < landmarks[3][0]) fingerCount++
    
    // Index finger
    if (landmarks[8][1] < landmarks[7][1]) fingerCount++
    
    // Middle finger
    if (landmarks[12][1] < landmarks[11][1]) fingerCount++
    
    // Ring finger
    if (landmarks[16][1] < landmarks[15][1]) fingerCount++
    
    // Pinky
    if (landmarks[20][1] < landmarks[19][1]) fingerCount++

    return fingerCount
  }

  useEffect(() => {
    runHandpose()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Finger Counter</h1>
      {!isModelLoaded && (
        <div className="text-xl mb-4">Loading handpose model...</div>
      )}
      <div className="relative">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </div>
      <div className="mt-4 text-2xl font-bold">
        {isHandPresent 
          ? `Fingers Detected: ${fingerCount}`
          : "No hand detected"}
      </div>
      <div className="mt-2 text-xl">
        Gesture: {gesture}
      </div>
    </div>
  )
}

