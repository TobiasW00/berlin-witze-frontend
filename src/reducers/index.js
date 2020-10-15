import { combineReducers } from "redux";
import TagsReducer from "./reducer_tags";
/*
import MembersReducer from "./reducer_members";
import FantasiesReducer from "./reducer_fantasies";
import SearchFilterReducer from "./reducer_searchfilter";
import UserSearchFilterReducer from "./reducer_usersearchfilter";
import DateSearchFilterReducer from "./reducer_datesearchfilter";
import InboxReducer from "./reducer_inbox";

import ConversationReducer from "./reducer_conversation";
import EditFantasieReducer from "./reducer_fantasieedit";
import EditDateReducer from "./reducer_dateedit";
import LoadingReducer from "./reducer_loading";
import UserReducer from "./reducer_user";
import DatesReducer from "./reducer_dates";
import ConnectionReducer from "./reducer_connection";
*/

const rootReducer = combineReducers({
    tags: TagsReducer
    /*
    members: MembersReducer,
  fantasies: FantasiesReducer,
  fantasieedit: EditFantasieReducer,
  dateedit: EditDateReducer,

  dates: DatesReducer,
  searchfilter: SearchFilterReducer,
  usersearchfilter: UserSearchFilterReducer,
  datesearchfilter: DateSearchFilterReducer,
  inbox: InboxReducer,
  conversation: ConversationReducer,
  loading: LoadingReducer,
  connection: ConnectionReducer,
  user:UserReducer
  */
});

export default rootReducer;