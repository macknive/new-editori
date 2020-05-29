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

library.add(faCheck);
library.add(faCheckCircle);
library.add(faExclamationCircle);
library.add(faExclamationTriangle);
library.add(faLock);
library.add(faSave);

Vue.component('font-awesome-icon', FontAwesomeIcon);