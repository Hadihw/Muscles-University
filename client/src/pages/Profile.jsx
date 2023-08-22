import React from 'react';
import { FaUserCircle, FaBirthdayCake, FaWeight, FaRulerVertical } from 'react-icons/fa';

const Profile = () => {
    const brandColors = {
        medium: '#9F8157',
        dark: '#745228',
        light: '#FBEDC7',
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
                <FaUserCircle size={28} style={{ color: brandColors.dark }} />
                <h3 className="text-xl font-semibold ml-3">Profile</h3>
            </div>
            <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4" />
                <div>
                    <p className="text-lg font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">Member since Jan 2021</p>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-sm font-medium">Personal Information:</p>
                <ul className="list-disc list-inside text-xs pl-4 mt-2">
                    <li>
                        <FaBirthdayCake className="inline mr-1" /> Age: 30
                    </li>
                    <li>
                        <FaWeight className="inline mr-1" /> Weight: 165 lbs
                    </li>
                    <li>
                        <FaRulerVertical className="inline mr-1" /> Height: 5'10"
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;