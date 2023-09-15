import React from "react";
import { createRoot } from 'react-dom/client';
import "./static/css/index.css";
import App from "./App";
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const root = document.getElementById('root');
const app = createRoot(root);

app.render(
	<Provider store={store}>
		<App />
	</Provider>
);