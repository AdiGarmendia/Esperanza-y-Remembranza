import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import EsperanzaYRemembranza from './components/EsperanzaYRemembranza.js';

ReactDOM.render(
	<Router>
		<EsperanzaYRemembranza />
        
	</Router>,
	document.getElementById("root")
)
