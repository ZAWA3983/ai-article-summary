import { jsx as _jsx } from "react/jsx-runtime";
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
const root = document.getElementById('root');
if (root) {
    createRoot(root).render(_jsx(App, {}));
}
