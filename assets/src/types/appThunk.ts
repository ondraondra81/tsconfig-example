import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import IState from './stateInterface';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IState, null, Action<string>>;
