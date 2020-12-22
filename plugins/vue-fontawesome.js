import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faLock,
  faSave,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFacebook,
  faGoogle,
  faApple,
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

Vue.component('font-awesome-icon', FontAwesomeIcon);