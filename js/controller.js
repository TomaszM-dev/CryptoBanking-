import { loginMechanics } from "./loginMechanics.js";
import { registerMechanics } from "./registerMechanics.js";
import * as currencyPanel from "./apiRequests.js";

loginMechanics();
registerMechanics();
currencyPanel.exchangeApi();
