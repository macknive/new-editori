<template>
  <v-container class="container-700">
    <div align="center" class="pb-12">
      <h1>Workspace Setup</h1>
      <h4>The best relationships start with at least this much...</h4>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <p class="text-brown">Workspace Name</p>
      <v-text-field
        v-model="newWorkspace.workspaceName"
        solo
        :rules="rules"
        hide-details="auto"
        clearable
        class="pb-3"
      ></v-text-field>
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
        <v-container>
          <p class="text-brown">Monthly Subscription</p>
          <v-row>
            <v-col class="pb-0 mb-0">
              <span class="noto-serif text-gray">
                {{ selected }} collaborators @ ${{ basePrice }} per month
              </span>
            </v-col>
            <v-col class="pb-0 mb-0" align="right">
              <span class="noto-serif text-gray">3-day free trial</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h4 class="noto-serif">${{ totalPrice }} per month</h4>
            </v-col>
            <v-col align="right">
              <h4 class="noto-serif">$0 due today</h4>
            </v-col>
          </v-row>
          <div v-if="visible" class="pb-3">
            <v-row>
              <v-col class="col-6" align="center">
                <v-btn
                  @click="visible = !visible"
                  block
                  color="brown darken-3 white--text py-7 step-button"
                  ><font-awesome-icon
                    class="text-white"
                    icon="credit-card"
                    size="1x"
                  ></font-awesome-icon
                  >&nbsp;&nbsp;CREDIT CARD</v-btn
                >
              </v-col>
              <v-col class="col" align="center">
                <font-awesome-icon
                  :icon="['fab', 'apple-pay']"
                  class="icon alt svgapple"
                  size="4x"
                />
              </v-col>
              <v-col class="col svggooglepay" align="center">
                <font-awesome-icon
                  :icon="['fab', 'google-pay']"
                  class="icon alt svggoogle"
                  size="4x"
                />
              </v-col>
            </v-row>
          </div>

          <div v-if="!visible" class="pb-3">
            <v-row>
              <v-col>
                <v-text-field
                  class="cc-textfield"
                  v-model="newWorkspace.cardName"
                  label="Card Number"
                  solo
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  class="cc-textfield"
                  v-model="newWorkspace.cardNumber"
                  label="MM/YY"
                  solo
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn block color="brown darken-3 white--text py-6 step-button"
                  >SUBSCRIBE</v-btn
                >
              </v-col>
            </v-row>
            <a @click="visible = !visible" class="text-brown pb-3"
              >Other payment methods</a
            >
          </div>

          <h4 align="center">
            You will be charged ${{ totalPrice }} on {{ formattedDate }}
          </h4>
        </v-container>
      </v-card>
      <v-btn
        :disabled="!valid"
        block
        @click="validate() ? addWorkspace() : errorMessage()"
        color="brown darken-3 white--text py-7 step-button"
        >NEXT</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      valid: true,
      moment: moment,
      selected: '',
      basePrice: 9.99,
      newWorkspace: {
        workspaceName: '',
        cardName: '',
        cardNumber: '',
        projectType: ['Blog', 'Post', 'Article', 'Editor'],
        collaboratorCount: ['1', '2', '3', '4']
      },
      rules: [value => !!value || 'Required.'],
      visible: true
    }
  },
  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        return false
      }
      return true
    },
    addWorkspace() {
      this.$emit('thisWorkspace', this.newWorkspace)
    },
    errorMessage() {
      console.log('Please fill the required form')
    }
  },
  computed: {
    totalPrice() {
      return this.selected * this.basePrice
    },
    formattedDate() {
      return moment(this.givenDate)
        .add(3, 'days')
        .format('MMMM DD, YYYY')
    }
  }
}
</script>

<style></style>
