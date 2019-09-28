import React from 'react';
import { AnswerPage,CoursePage } from './pages/index';




const routes = [
    {
        path: '/learning',
        exact: false,
        main: () => <AnswerPage />
    },
    {
        path: '/course',
        exact: false,
        main: () => <CoursePage />
    },
    {
        path: '/chapter',
        exact: false,
        main: () => <AnswerPage />
    },
    {
        path: '/login',
        exact: false,
        main: () => <AnswerPage />
    },
    {
        path: '/',
        exact: true,
        main: () => <AnswerPage />
    }

];

export default routes;