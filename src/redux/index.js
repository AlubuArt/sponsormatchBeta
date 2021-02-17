import { combineReducers } from 'redux';

import EmailApp from './email/reducer';
import ChatApp from './chat/reducer';

import Bookmarkapp from './bookmark/reducer'
import Taskapp from './task/reducer'
import Projectapp from './project/reducer'
import Customizer from './customizer/reducer';

const reducers = combineReducers({
    
    EmailApp,
    ChatApp,
    
    Bookmarkapp,
    Taskapp,
    Projectapp,
    Customizer
});

export default reducers;