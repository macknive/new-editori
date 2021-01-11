<template>
<v-container>
  <div align="center">
    <h1>Workspace Setup</h1>
    <p>The best relationships start with at least this much...</p>
  </div>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <p class="text-brown">Workspace Name</p>
    <v-text-field
      v-model="newWorkspace.workspaceName"
      solo
      :rules="rules"
      hide-details="auto"
      clearable
    ></v-text-field><br>
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
    ></v-select>
    <v-card class="pa-1" v-if="selected">
      <v-container>
        <p class="text-brown">Monthly Subscription</p>
        <v-row>
          <v-col>
            <p> {{selected}} collaborators @ ${{basePrice}} per month</p>
            <h3>${{totalPrice}} per month</h3>
          </v-col>
          <v-col align="right">
            <p>3-day free trial</p>
            <h3>$0 due today</h3>
          </v-col>
        </v-row>
        <div v-if="visible">
          <v-row>
            <v-col class="col pt-5">
              <v-btn @click="visible = !visible" block color="brown darken-3 white--text py-7 step-button"><font-awesome-icon class="text-white" icon="credit-card" size="1x"></font-awesome-icon>&nbsp;&nbsp;&nbsp;CREDIT CARD</v-btn>
            </v-col>
            <v-col class="col svgcol pt-5" align="right">
              <font-awesome-icon :icon="['fab', 'apple-pay']" class="icon alt svgapple" size="4x"/>
            </v-col>
            <v-col class="col svgcol pt-5" align="right">
              <font-awesome-icon :icon="['fab', 'google-pay']" class="icon alt svggoogle" size="4x"/>
            </v-col>
          </v-row>
        </div>

        <div v-if="!visible">
          <v-row>
            <v-col class="col-5">
              <v-text-field
                v-model="newWorkspace.cardName"
                label="Card Number"
                solo
         
                hide-details="auto"
                clearable
              ></v-text-field>
            </v-col>
            <v-col class="col-3">
              <v-text-field
                v-model="newWorkspace.cardNumber"
                label="MM/YY"
                solo
     
                hide-details="auto"
                clearable
              ></v-text-field>
            </v-col>
            <v-col class="col-4">
              <v-btn block color="brown darken-3 white--text py-7 step-button">SUBSCRIBE</v-btn>
            </v-col>

          </v-row>
          <a @click="visible = !visible" class="text-brown">Other payment methods</a>
        </div><br>

        <p align="center">You will be charged ${{totalPrice}} on {{ formattedDate }}</p>

      </v-container>
    </v-card><br>
    <v-btn 
      :disabled="!valid"
      block 
      @click="validate() ? addWorkspace() : errorMessage()" 
      color="brown darken-3 white--text py-7 step-button"
    >NEXT</v-btn>
  </v-form>
</v-container>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      valid: true,
      moment: moment,
      selected: '',
      basePrice: 9.99,
      newWorkspace: {
        workspaceName: "",
        cardName: "",
        cardNumber: "",
        projectType: ['Blog', 'Post', 'Article', 'Editor'],
        collaboratorCount: ['1', '2', '3', '4'],
      },
      rules: [
        value => !!value || 'Required.',
      ],
      visible: true
    }
  },
  methods: {
    validate() {
    if(!this.$refs.form.validate()) {
      return false
    }
    return true
  },
    addWorkspace() {
      this.$emit('thisWorkspace', this.newWorkspace)
    },
    errorMessage() {
      console.log("Please fill the required form")
    }
  },
  computed: {
    totalPrice() {
      return this.selected * this.basePrice
    },
    formattedDate() {
      return moment(this.givenDate).add(3, 'days').format('MMMM DD YYYY')
    }
  }
}
</script>

<style>

</style>
