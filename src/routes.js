import React from 'react';
import { AnswerPage,CoursePage } from './pages/index';




const routes = [
    {
        path: '/',
        exact: true,
        main: () => <AnswerPage />
    },
    {
        path: '/course',
        exact: false,
        main: () => <CoursePage />
    }
];

export default routes;