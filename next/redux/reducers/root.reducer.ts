import { combineReducers } from "redux";
import { SettingEvent } from "../actions/setting.action";
import { SettingStore, settingReducer } from "./setting.reducer";
import { LoadingEvent } from "../actions/loading.action";
import { LoadingStore, loadingReducer } from "./loading.reducer";
import { UserEvent } from "../actions/user.action";
import { UserStore, userReducer } from "./user.reducer";
import { SettingGroupEvent } from "../actions/setting-group.action";
import { SettingGroupStore, settingGroupReducer } from "./setting-group.reducer";
import { WalletEvent } from "../actions/wallet.action";
import { WalletStore, walletReducer } from "./wallet.reducer";

export type Event = SettingEvent | LoadingEvent | UserEvent | SettingGroupEvent | WalletEvent;

export interface Store {
  settingReducer: SettingStore;
  settingGroupReducer: SettingGroupStore;
  loadingReducer: LoadingStore;
  userReducer: UserStore;
  walletReducer: WalletStore;
}

const rootReducer = combineReducers({
  settingReducer,
  settingGroupReducer,
  loadingReducer,
  userReducer,
  walletReducer,
});

export default rootReducer;
