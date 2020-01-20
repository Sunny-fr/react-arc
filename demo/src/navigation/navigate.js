import store from '../store'
import {push} from 'connected-react-router'
export function navigateTo(to) {
    store.dispatch(push(to))
}