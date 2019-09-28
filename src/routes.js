import React from 'react';
import { AnswerPage,HomePage } from './pages/index';





const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    }
];

export default routes;