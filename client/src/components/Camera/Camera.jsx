import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import {FaPlay, FaStop} from "react-icons/all";

function Camera() {
	const videoRef = useRef(null);
	const [streaming, setStreaming] = useState(false);
	const [model, setModel] = useState(null);
	const [feedback, setFeedback] = useState('');

	useEffect(() => {
		async function loadModel() {
			const model = await posenet.load();
			setModel(model);
		}

		loadModel();
	}, []);

	const startVideo = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			videoRef.current.srcObject = stream;
			videoRef.current.play();

			setStreaming(true);
		} catch (error) {
			console.error("Error accessing media devices.", error);
		}
	};

	const stopVideo = () => {
		const stream = videoRef.current.srcObject;
		const tracks = stream.getTracks();

		tracks.forEach((track) => {
			track.stop();
		});

		videoRef.current.srcObject = null;
		setStreaming(false);
	};

	useEffect(() => {
		if (streaming && model) {
			const intervalId = setInterval(async () => {
				const pose = await model.estimateSinglePose(videoRef.current);

				const leftHip = pose.keypoints.find(kp => kp.part === 'leftHip');
				const rightHip = pose.keypoints.find(kp => kp.part === 'rightHip');
				const leftKnee = pose.keypoints.find(kp => kp.part === 'leftKnee');
				const rightKnee = pose.keypoints.find(kp => kp.part === 'rightKnee');
				const leftAnkle = pose.keypoints.find(kp => kp.part === 'leftAnkle');
				const rightAnkle = pose.keypoints.find(kp => kp.part === 'rightAnkle');

				let feedback = '';

				if (
					leftKnee.position.y < leftHip.position.y &&
					rightKnee.position.y < rightHip.position.y &&
					leftKnee.position.y < leftAnkle.position.y &&
					rightKnee.position.y < rightAnkle.position.y
				) {
					feedback += 'Good squat form: knees are bending correctly. ';
				} else {
					feedback += 'Bad squat form: knees are not bending correctly. ';
				}

				if (
					leftHip.position.x < leftKnee.position.x &&
					rightHip.position.x > rightKnee.position.x
				) {
					feedback += 'Good squat form: hips are aligned with knees.';
				} else {
					feedback += 'Bad squat form: hips are not aligned with knees.';
				}

				setFeedback(feedback);
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [streaming, model]);

	return (
		<div className="flex flex-col items-center">
			<video ref={videoRef} width="640" height="480" className="rounded shadow-lg mb-4" />
			<div className="flex space-x-4">
				{!streaming &&
					<button onClick={startVideo} className="bg-green-500 p-2 rounded-full hover:bg-green-600 focus:outline-none">
						<FaPlay className="text-white"/>
					</button>}
				{streaming &&
					<button onClick={stopVideo} className="bg-red-500 p-2 rounded-full hover:bg-red-600 focus:outline-none">
						<FaStop className="text-white"/>
					</button>}
			</div>
			<p className="mt-4 text-center bg-yellow-100 p-2 rounded-md w-2/3">{feedback}</p>
		</div>
	);
}

export default Camera;
