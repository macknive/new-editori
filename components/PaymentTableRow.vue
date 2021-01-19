<template>
  <tr>
    <td>{{ data.user.display_name }}</td>
    <td>{{ data.step.label }}</td>
    <td><input type="text" v-model="data.rate" size="5" /></td>
    <td>
      <select v-model="data.type" @change="resetMultiplier">
        <option v-for="(type, key) in paymentTypes" :key="key" :value="key">
          {{ type.label }}
        </option>
      </select>
    </td>
    <td>
      <span v-if="paymentType.multiplier">
        <input type="number" v-model="multiplier" size="5" min="0" />
        {{ paymentType.multiplier.suffix }}
      </span>
    </td>
    <td>
      {{ formatCurrency(total, data.currency) }}
    </td>
    <td>
      <button @click="pay">Pay</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['data', 'deliverable', 'wordCount', 'workspace'],
  data() {
    return {
      multiplier: this.data.type === 'perWord' ? this.wordCount : 1,
      paymentTypes: {
        fixedRate: {
          defaultMultiplier: 1,
          label: 'Flat Rate',
          multiplier: false
        },
        perWord: {
          defaultMultiplier: this.wordCount,
          label: 'Per Word',
          multiplier: {
            suffix: 'words'
          }
        },
        perHour: {
          defaultMultiplier: 1,
          label: 'Per Hour',
          multiplier: {
            suffix: 'hours'
          }
        }
      }
    }
  },
  methods: {
    formatCurrency(amount, currency) {
      return `$${amount} USD`
    },
    resetMultiplier() {
      this.multiplier = this.paymentType.defaultMultiplier || 1
    },
    pay() {
      const paypalBaseUrl = 'https://www.paypal.com/cgi-bin/webscr?&cmd=_xclick'
      const returnUrl = `${process.env.clientBaseUrl}${this.$route.fullPath}?complete=true`
      const options = {
        business: this.data.paypalEmail,
        currency_code: 'USD',
        amount: this.total,
        item_name: `${this.deliverable.title} for ${this.workspace.name}`,
        return: returnUrl
      }

      const optionsStr = Object.keys(options)
        .map(key => `${key}=${encodeURIComponent(options[key])}`)
        .join('&')

      const url = paypalBaseUrl + '&' + optionsStr
      window.location.href = url
    }
  },
  computed: {
    total() {
      const multiplierToUse = this.multiplier || 1
      return Math.round(this.data.rate * multiplierToUse * 100) / 100
    },
    paymentType() {
      return this.paymentTypes[this.data.type]
    }
  }
}
</script>

<style></style>
