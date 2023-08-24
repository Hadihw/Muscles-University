import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
	const [state, setState] = useState(() => {
		const localValue = localStorage.getItem(key);
		return localValue !== null ? JSON.parse(localValue) : defaultValue;
	});

	useEffect(() => {
		const newValue = localStorage.getItem(key);
		if (state !== JSON.parse(newValue)) {
			setState(JSON.parse(newValue));
		}

		const handleStorageChange = (e) => {
			if (e.key === key) {
				setState(JSON.parse(e.newValue));
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => window.removeEventListener('storage', handleStorageChange);
	}, [key, state]);

	return [state, setState];
}

export default useLocalStorage;