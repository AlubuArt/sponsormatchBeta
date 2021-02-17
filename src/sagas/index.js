import { all } from "redux-saga/effects";
import { WatcherChatApp } from '../redux/chat'
import { WatcherEmailApp } from '../redux/email'
import { watchBookmarkList } from "../redux/bookmark";
import { watcherTaskApp } from "../redux/task";

export default function* rootSagas() {
    yield all([
        
        WatcherChatApp(),
        WatcherEmailApp(),
        
        watchBookmarkList(),
        watcherTaskApp()
    ])
}