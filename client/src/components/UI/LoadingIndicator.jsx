import React from 'react';
import {FaSpinner} from "react-icons/fa";

const LoadingIndicator = () => (
	<div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
		<div className="flex flex-col items-center space-y-2">
			<FaSpinner className="animate-spin text-dark h-8 w-8" />
			<div className="text-xl font-semibold text-dark">
				Loading...
			</div>
		</div>
	</div>
);

export default LoadingIndicator;