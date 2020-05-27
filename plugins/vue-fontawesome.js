import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckCircle,
  faExclamationCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheckCircle);
library.add(faExclamationCircle);
library.add(faSave);

Vue.component('font-awesome-icon', FontAwesomeIcon);