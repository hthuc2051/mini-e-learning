import React from 'react';
import { AnswerPage, CoursePage, HomePage,LoginPage,RegisterPage } from './pages/index';





const routes = [
    {
        path: '/lesson/:id',
        exact: false,
        main: AnswerPage
    },
    {
        path: '/course/:id',
        exact: false,
        main: CoursePage
    },
    {
        path: '/home/:id',
        exact: false,
        main: HomePage
    },
    {
        path: '/',
        exact: true,
        main: () => <LoginPage />
    },
    {
        path: '/register',
        exact: true,
        main: () => <RegisterPage />
    }

];

export default routes;