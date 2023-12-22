import {UserState} from './user/userSlice';

export interface StoreInterface {
  User: UserState;
}

export type RootState = {
  User: StoreInterface['User'];
};
