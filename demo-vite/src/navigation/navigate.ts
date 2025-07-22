import store from '../store';
import { push } from 'connected-react-router';

export function navigateTo(to: string) {
  store.dispatch(push(to));
}