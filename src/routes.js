import React from 'react';
import { AnswerPage, CoursePage, HomePage,LoginPage,RegisterPage } from './pages/index';





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
        main: () => <LoginPage />
    },
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/register',
        exact: true,
        main: () => <RegisterPage />
    }

];

export default routes;