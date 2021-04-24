import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faLock,
  faSave,
  faEnvelopeOpenText,
  faPlus,
  faTrashAlt,
  faCreditCard,
  faCaretDown,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFacebook,
  faGoogle,
  faApple,
  faGooglePay,
  faApplePay,
} from "@fortawesome/free-brands-svg-icons";

library.add(faCheck);
library.add(faCheckCircle);
library.add(faExclamationCircle);
library.add(faExclamationTriangle);
library.add(faLock);
library.add(faSave);
library.add(faFacebook);
library.add(faGoogle);
library.add(faApple);
library.add(faEnvelopeOpenText);
library.add(faPlus);
library.add(faTrashAlt);
library.add(faCreditCard);
library.add(faGooglePay);
library.add(faApplePay);
library.add(faSearch);
library.add(faCaretDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);