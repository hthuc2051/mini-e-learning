import React from 'react';
import { AnswerPage } from './pages/index';





const routes = [
    {
        path: '/',
        exact: true,
        main: () => <AnswerPage />
    }
];

export default routes;