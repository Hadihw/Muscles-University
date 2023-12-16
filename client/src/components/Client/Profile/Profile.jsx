import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {FaApple, FaDumbbell, FaEdit, FaSpinner, FaUser} from 'react-icons/fa';
import 'cropperjs/dist/cropper.css';
import {Cropper} from "react-cropper";
import app from "../../../../Firebase/firebaseConfig";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import LoadingIndicator from "../../UI/LoadingIndicator";


const Profile = ({ userData }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [user, setUser] = useState({});
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const userID = localStorage.getItem('userID');
	const [showToast, setShowToast] = useState(false);
	const [toastOpacity, setToastOpacity] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tempProfilePic, setTempProfilePic] = useState(null);



	useEffect(() => {
		if (userData && Object.keys(userData).length > 0) {
			setUser(userData);
			setIsLoading(false);
		} else {
			setError("There was a problem fetching the user data.");
			setIsLoading(false);
		}

	}, [userData]);



// Component for Error State
	const ErrorIndicator = ({ error }) => (
		<div className="flex h-full w-full items-center justify-center flex-col space-y-4">
			<div className="text-xl font-semibold text-red-500">
				An error occurred!
			</div>
			<div className="text-dark">
				{error}
			</div>
			<button className="bg-dark text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300" onClick={() => window.location.reload()}>Try Again</button>
		</div>
	);



	const handleUpdate = async () => {
		let url = user.profilePic;  // default to the current profilePic

		if (tempProfilePic) {
			// Step 1: Update the image in Firebase Storage
			const storage = getStorage(app);
			const profilePicRef = ref(storage, `profilePics/${userID}`);
			await uploadString(profilePicRef, tempProfilePic, 'data_url');
			url = await getDownloadURL(profilePicRef);
		}

		// Step 2: Update Firestore
		const db = getFirestore(app);
		const userDocRef = doc(db, "users", userID); // Assuming your collection is named "users"
		await setDoc(userDocRef, { profilePic: url }, { merge: true });

		// Step 3: Update the backend
		user.profilePic = url;
		const response = await axios.put(`/api/user/users/${userID}`, user);

		if(response.status === 200) {
			setUser(response.data);
			setIsConfirmModalOpen(false);
			setIsEditing(false);
			setShowToast(true);
			setToastOpacity(1);
			setTimeout(() => {
				setToastOpacity(0);
				setTimeout(() => setShowToast(false), 300);
			}, 3000);
		} else {
			console.error("Failed to update user.");
			// Display the error toast
			setShowToast(true);
			setToastOpacity(1);
			setTimeout(() => {
				setToastOpacity(0);
				setTimeout(() => setShowToast(false), 300);
			}, 3000);
		}
	};
	const handleImageConfirm = (image) => {
		setTempProfilePic(image);
	};

	const handleConfirm = () => {
		handleUpdate();
		setIsConfirmModalOpen(false);
		setIsEditing(false);
	};

	const handleChange = (field) => (e) => {
		setUser({ ...user, [field]: e.target.value });
	};

	if (isLoading) {
		return <LoadingIndicator />;
	}

	if (error) {
		return <ErrorIndicator error={error} />;
	}

	return (
		<div className="h-full w-full p-2 sm:p-4 md:p-6 lg:p-8 bg-background overflow-auto">
			<ToastNotification showToast={showToast} toastOpacity={toastOpacity} />
			<ProfileHeader
				user={user}
				isEditing={isEditing}
				setIsImageModalOpen={setIsImageModalOpen}
				tempProfilePic={tempProfilePic}
				setIsEditing={setIsEditing}
				setIsConfirmModalOpen={setIsConfirmModalOpen}
			/>
			<ProfileDetails
				user={user}
				handleChange={handleChange}
				isEditing={isEditing}
			/>
			<ConfirmationModal isModalOpen={isConfirmModalOpen} handleConfirm={handleConfirm} setIsModalOpen={setIsConfirmModalOpen} />
			<ImageCropModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} onConfirm={handleImageConfirm} />
		</div>
	);
};

const ToastNotification = ({ showToast, toastOpacity, type = "success" }) => (
	showToast && (
		<div
			className={`toast-notification ${type === "success" ? "bg-green-600" : "bg-red-600"} text-white fixed top-5 left-1/2 transform -translate-x-1/2 py-2 px-5 rounded-lg shadow-lg z-50 transition-opacity duration-300 border ${type === "success" ? "border-green-700" : "border-red-700"}`}
			style={{ opacity: toastOpacity }}
		>
			{type === "success" ? "Profile updated successfully!" : "Error updating profile."}
		</div>
	)
);


const ImageCropModal = ({ isOpen, onClose, onConfirm }) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const cropperRef = useRef(null);

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (loadEvent) => {
				setSelectedImage(loadEvent.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const getCroppedImage = () => {
		if (cropperRef.current) {
			const imageElement = cropperRef?.current;
			const cropper = imageElement?.cropper;
			return cropper.getCroppedCanvas().toDataURL();
		}
		return null;
	}

	const handleOnClose = () => {
		setSelectedImage(null);  // Reset the selected image when modal closes
		onClose();
	}

	return (
		isOpen && (
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
				<div className="bg-white p-8 rounded-lg shadow-xl w-2/3 max-w-xl">
					<h3 className="text-xl font-semibold mb-4">Select and Crop Image</h3>
					<div className="border rounded-md p-4 mb-4">
						{selectedImage ? (
							<Cropper
								ref={cropperRef}
								src={selectedImage}
								style={{ height: 400, width: '100%' }}
								aspectRatio={1}
								viewMode={1}
								dragMode="move"
								initialAspectRatio={1}
								guides={false}
								cropBoxMovable={true}
								cropBoxResizable={false}
								background={false}
							/>
						) : (
							<div className="flex flex-col items-center justify-center border-dashed border-2 h-40">
								<input
									type="file"
									id="fileInput"
									className="hidden"
									onChange={handleImageUpload}
								/>
								<label
									htmlFor="fileInput"
									className="bg-dark text-white px-4 py-2 cursor-pointer hover:bg-primary transition-colors duration-300 rounded"
								>
									Choose an image
								</label>
							</div>
						)}
					</div>
					<div className="flex justify-end space-x-4">
						<button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition-colors duration-300" onClick={handleOnClose}>Cancel</button>
						<button className="bg-dark hover:bg-opacity-80 text-white px-4 py-2 rounded transition-colors duration-300" onClick={() => {
							const croppedImage = getCroppedImage();
							onConfirm(croppedImage);
							handleOnClose();
						}}>Confirm</button>
					</div>
				</div>
			</div>
		)
	);
};

const ProfileHeader = ({ user, isEditing, setIsImageModalOpen, setIsEditing, tempProfilePic, setIsConfirmModalOpen }) => (
	<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
		<div className="relative rounded-full w-32 h-32">
			<img
				src={tempProfilePic || user.profilePic || 'https://via.placeholder.com/100'}
				alt="Profile"
				className="rounded-full w-full h-full border-4 border-dark hover:border-opacity-80 transition-colors duration-300"
			/>
			{isEditing && (
				<div
					className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-opacity duration-300"
					onClick={(e) => {
						setIsImageModalOpen(true);
					}}
				>
					<div className="bg-white opacity-50 absolute inset-0 rounded-full"></div>
					<span className="text-xl font-bold text-dark"><FaEdit /></span>
				</div>
			)}
		</div>
		<div className="flex-grow">
			<h2 className="text-3xl font-semibold text-dark">{user.firstName} {user.lastName}</h2>
			<p className="text-lg mt-2 text-gray-500">{user.email}</p>
		</div>
		<button
			onClick={() => {
				if (isEditing) setIsConfirmModalOpen(true);
				else setIsEditing(true);
			}}
			className={`bg-dark text-white px-6 py-2 rounded transition-colors duration-300 hover:bg-opacity-80 ${isEditing ? 'ring-2 ring-dark ring-opacity-50 focus:ring-opacity-100' : ''}`}
		>
			{isEditing ? 'Save Changes' : 'Edit Profile'}
		</button>
	</div>
);

const ProfileDetails = ({ user, handleChange, isEditing }) => (
	<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		<ProfileCategory title="Personal Details" icon={FaUser}>
			<DropdownInput label="Gender" value={user.gender} onChange={handleChange('gender')} isEditing={isEditing} options={['Male', 'Female', 'Non-Binary', 'Prefer not to say']} />
			<ProfileInput label="Age" value={user.age} onChange={handleChange('age')} isEditing={isEditing} unit="years" />
			<ProfileInput label="Height" value={user.height} onChange={handleChange('height')} isEditing={isEditing} unit="cm" />
			<DropdownInput
				label="Daily Activities"
				value={user.dailyActivities}
				onChange={handleChange('dailyActivities')}
				isEditing={isEditing}
				options={['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active']}
			/>
		</ProfileCategory>
		<ProfileCategory title="Nutrition" icon={FaApple}>
			<ProfileInput label="Calories" value={user.calories} onChange={handleChange('calories')} isEditing={isEditing} unit="kcal" />
			<ProfileInput label="Fat" value={user.fat} onChange={handleChange('fat')} isEditing={isEditing} unit="g" />
			<ProfileInput label="Protein" value={user.protein} onChange={handleChange('protein')} isEditing={isEditing} unit="g" />
			<ProfileInput label="Carbs" value={user.carbs} onChange={handleChange('carbs')} isEditing={isEditing} unit="g" />
		</ProfileCategory>
		<ProfileCategory title="Workout & Fitness" icon={FaDumbbell}>
			<DropdownInput label="Workout Location" value={user.workoutLocation} onChange={handleChange('workoutLocation')} isEditing={isEditing} options={['Gym', 'Home', 'Outdoors']} />
			<ProfileInput label="Current Weight" value={user.currentWeight} onChange={handleChange('currentWeight')} isEditing={isEditing} unit="lbs" />
			<ProfileInput label="Goal Weight" value={user.goalWeight} onChange={handleChange('goalWeight')} isEditing={isEditing} unit="lbs" />
			<DropdownInput label="Fitness Goal" value={user.fitnessGoal} onChange={handleChange('fitnessGoal')} isEditing={isEditing} options={['Lose Weight', 'Maintain Weight', 'Gain Muscle']} />
		</ProfileCategory>
	</div>
);

const ConfirmationModal = ({ isModalOpen, handleConfirm, setIsModalOpen }) => (
	isModalOpen && (
		<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }} className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
			<div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
				<h3 className="text-lg font-semibold mb-4">Are you sure you want to save changes?</h3>
				<div className="flex justify-end">
					<button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
					<button className="bg-dark text-white px-4 py-2 rounded" onClick={handleConfirm}>Confirm</button>
				</div>
			</div>
		</div>
	)
);

const ProfileInput = ({ label, value, onChange, isEditing, unit }) => {
	return (
		<div className="mb-4 flex items-center border-b pb-2">
			<label className="block flex-grow text-dark text-md font-semibold mb-2">{label}</label>
			<div className="flex w-2/5 items-center">
				{isEditing ? (
					<input
						value={value || ''}
						onChange={onChange}
						placeholder="-"
						className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
						style={{ width: 'calc(100% - 40px)' }}
					/>
				) : (
					<span className="flex-grow text-gray-600 text-md" style={{ width: 'calc(100% - 40px)' }}>
                        {value || '-'}
                    </span>
				)}
				{unit && <span className="text-bold text-md font-semibold ml-2 text-dark" style={{ width: '40px' }}>{unit}</span>}
			</div>
		</div>
	);
};

const DropdownInput = ({ label, value, onChange, isEditing, options }) => {
	return isEditing ? (
		<div className="mb-4 flex items-center border-b pb-2">
			<label className="block flex-grow text-dark text-md font-semibold mb-2">{label}</label>
			<select
				value={value || ""}
				onChange={onChange}
				className="w-2/5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
			>
				<option value={null}></option> {/* This option will be blank */}
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	) : (
		<ProfileInput label={label} value={value} isEditing={false} />
	);
};

const ProfileCategory = ({ title, icon: Icon, children }) => {
	return (
		<div className="flex-1 space-y-4 p-6 bg-white shadow rounded-lg">
			<h2 className="text-xl font-semibold mb-4 flex items-center">
				<Icon size={24} className="text-dark mr-4" />
				{title}
			</h2>
			{children}
		</div>
	);
};

export default Profile;