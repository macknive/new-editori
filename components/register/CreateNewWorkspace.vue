<template>
  <div class="container-700 m-auto">
    <div align="center">
      <h1>Workspace Setup</h1>
      <h4>The best relationships start with at least this much...</h4>
    </div>

    <p class="text-brown">Workspace Name</p>
    <vs-input v-model="newWorkspace.workspaceName" class="mb-20"></vs-input>
    <p class="text-brown">Workspace Slug</p>
    <vs-input v-model="newWorkspace.workspaceSlug" class="mb-20"></vs-input>
    <p class="text-brown">Type of Project</p>
    <vs-select width="100%" class="mb-20">
      <vs-select-item
        v-for="project in newWorkspace.projectType"
        :key="project.id"
        :text="project"
      />
    </vs-select>
    <p class="text-brown">Number of Collaborators</p>
    <vs-select width="100%" class="mb-20" v-model="selected">
      <vs-select-item
        v-for="collaborator in newWorkspace.collaboratorCount"
        :key="collaborator.id"
        :text="collaborator"
        :value="collaborator"
      />
    </vs-select>

    <div v-if="selected">
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
        <div class="container-row">
          <div>
            <h4 class="noto-serif">${{ totalPrice }} per month</h4>
          </div>
          <div align="right">
            <h4 class="noto-serif">$0 due today</h4>
          </div>
        </div>
        <div v-if="visible">
          <div class="container-row">
            <div class="m-auto">
              <button
                @click="visible = !visible"
                color="brown darken-3 white--text"
                class="step-button"
              >
                <font-awesome-icon
                  class="white"
                  icon="credit-card"
                  size="1x"
                ></font-awesome-icon
                >&nbsp;&nbsp;CREDIT CARD
              </button>
            </div>
            <div class="m-auto">
              <font-awesome-icon
                :icon="['fab', 'apple-pay']"
                class="icon alt svg-apple"
                size="4x"
              />
            </div>
            <div class="m-auto">
              <font-awesome-icon
                :icon="['fab', 'google-pay']"
                class="icon alt svg-google"
                size="4x"
              />
            </div>
          </div>
        </div>

        <div v-if="!visible">
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
    </div>
    <vs-button
      :disabled="!valid"
      :color="color"
      block
      @click="addWorkspace()"
      class="step-button width-100"
      >NEXT</vs-button
    >
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
.vs-con-input-label,
select {
  width: 100%;
}

.vs-inputx {
  height: 40px;
}
.vs-button {
  background: unset;
}
</style>
