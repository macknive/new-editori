<template>
  <div class="container-700">
    <div align="center" class="pb-12">
      <h1>Workspace Setup</h1>
      <h4>The best relationships start with at least this much...</h4>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <p class="text-brown">Workspace Name</p>
      <vs-input
        v-model="newWorkspace.workspaceName"
        solo
        :rules="rules"
        hide-details="auto"
        clearable
        class="pb-3"
      ></vs-input>
      <p class="text-brown">Workspace Slug</p>
      <vs-input
        v-model="newWorkspace.workspaceSlug"
        solo
        :rules="rules"
        hide-details="auto"
        clearable
        class="pb-3"
      ></vs-input>
      <p class="text-brown">Type of Project</p>
      <v-select
        :items="newWorkspace.projectType"
        outlined
        :rules="rules"
      ></v-select>
      <p class="text-brown">Number of Collaborators</p>
      <v-select
        v-model="selected"
        :items="newWorkspace.collaboratorCount"
        outlined
        :rules="rules"
        class="pb-3"
      ></v-select>
      <v-card class="pa-1 mb-8 pb-3" v-if="selected">
        <div>
          <p class="text-brown">Monthly Subscription</p>
          <div>
            <div class="pb-0 mb-0">
              <span class="noto-serif text-gray">
                {{ selected }} collaborators @ ${{ basePrice }} per month
              </span>
            </div>
            <div class="pb-0 mb-0" align="right">
              <span class="noto-serif text-gray">3-day free trial</span>
            </div>
          </div>
          <div>
            <div>
              <h4 class="noto-serif">${{ totalPrice }} per month</h4>
            </div>
            <div align="right">
              <h4 class="noto-serif">$0 due today</h4>
            </div>
          </div>
          <div v-if="visible" class="pb-3">
            <div>
              <div class="col-6" align="center">
                <vs-button
                  @click="visible = !visible"
                  block
                  color="brown darken-3 white--text"
                  class="py-7 step-button"
                  ><font-awesome-icon
                    class="white"
                    icon="credit-card"
                    size="1x"
                  ></font-awesome-icon
                  >&nbsp;&nbsp;CREDIT CARD</vs-button
                >
              </div>
              <div class="col" align="center">
                <font-awesome-icon
                  :icon="['fab', 'apple-pay']"
                  class="icon alt svg-apple"
                  size="4x"
                />
              </div>
              <div class="col" align="center">
                <font-awesome-icon
                  :icon="['fab', 'google-pay']"
                  class="icon alt svg-google"
                  size="4x"
                />
              </div>
            </div>
          </div>

          <div v-if="!visible" class="pb-3">
            <div>
              <div>
                <vs-input
                  class="payment-textfield"
                  v-model="newWorkspace.cardName"
                  label="Card Number"
                  solo
                  hide-details="auto"
                ></vs-input>
              </div>
              <div>
                <vs-input
                  class="payment-textfield"
                  v-model="newWorkspace.cardNumber"
                  label="MM/YY"
                  solo
                  hide-details="auto"
                ></vs-input>
              </div>
              <div>
                <vs-button block color="step-button">SUBSCRIBE</vs-button>
              </div>
            </div>
            <a @click="visible = !visible" class="text-brown"
              >Other payment methods</a
            >
          </div>

          <h4 align="center">
            You will be charged ${{ totalPrice }} on {{ formattedDate }}
          </h4>
        </div>
      </v-card>
      <vs-button
        :disabled="!valid"
        :color="color"
        block
        @click="validate() ? addWorkspace() : errorMessage()"
        class="step-button width-100"
        >NEXT</vs-button
      >
    </v-form>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      valid: true,
      moment: moment,
      color: '#593d3b',
      selected: '',
      basePrice: 9.99,
      newWorkspace: {
        workspaceName: '',
        workspaceSlug: '',
        cardName: '',
        cardNumber: '',
        projectType: ['Blog', 'Post', 'Article', 'Editor'],
        collaboratorCount: ['1', '2', '3', '4']
      },
      rules: [value => !!value || 'Required.'],
      visible: true
    };
  },
  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      return true;
    },
    addWorkspace() {
      this.$emit('thisWorkspace', this.newWorkspace);
    },
    errorMessage() {
      console.log('Please fill the required form');
    }
  },
  computed: {
    totalPrice() {
      return this.selected * this.basePrice;
    },
    formattedDate() {
      return moment(this.givenDate)
        .add(3, 'days')
        .format('MMMM DD, YYYY');
    }
  }
};
</script>

<style>
.vs-con-input-label {
  width: 100%;
}

.vs-inputx {
  height: 40px;
}
.vs-button {
  background: unset;
}
</style>
