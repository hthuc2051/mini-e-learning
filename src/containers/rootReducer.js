import { combineReducers } from 'redux';
import homePage from './HomePage/reducer';
import userPage from './UserPage/reducer';
import adminPage from './AdminPage/reducer';
const appReducers = combineReducers({
    homePage,
    userPage,
    adminPage
});

export default appReducers;