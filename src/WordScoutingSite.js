import ReactDOM from 'react-dom/client';
import './index.css';
import TufferApp from './TufferApp';

import 'firebase/compat/database';
import React from 'react';

const tuffApp = ReactDOM.createRoot(document.getElementById('tuffApp'));
tuffApp.render(
	<React.StrictMode>
		<TufferApp />
	</React.StrictMode>
);
