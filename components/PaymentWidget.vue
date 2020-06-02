<template>
  <div>
    For {{wordCount}} words at a rate of {{author.rateUsd}} per word, this
    article costs {{formatCurrency(amountOwed)}}.

    <button @click="pay" class="pay-button">
      Pay Now
    </button>
  </div>
</template>

<script>
import readingTime from 'reading-time';

export default {
  props: [
    'deliverable',
    'workspace',
  ],
  data() {
    return {
      author: {
        paypalEmail: 'amakachukwu2001@gmail.com',
        rateUsd: 0.01,
      },
    }
  },
  computed: {
    amountOwed() {
      return Math.round(this.wordCount * this.author.rateUsd * 100) / 100;
    },
    wordCount() {
      const readingTimeStats = readingTime(this.deliverable.data.html);
      return readingTimeStats.words;
    },
    todayAsMMDDYYYY() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      if(dd < 10) {
          dd = `0${dd}`;
      }

      if(mm < 10) {
          mm = `0${mm}`;
      }

      return `${mm}/${dd}/${yyyy}`;
    }
  },
  methods: {
    formatCurrency(amount) {
      return `$${amount} USD`;
    },
    pay() {
      const paypalBaseUrl =
          'https://www.paypal.com/cgi-bin/webscr?&cmd=_xclick';
      const returnUrl =
          `${process.env.clientBaseUrl}${this.$route.fullPath}?complete=true`;
      const options = {
        'business': this.author.paypalEmail,
        'currency_code': 'USD',
        'amount': this.amountOwed,
        'item_name': `${this.deliverable.title} for ${this.workspace.name}`,
        'return': returnUrl,
      };

      const optionsStr = Object.keys(options)
          .map(key => `${key}=${encodeURIComponent(options[key])}`)
          .join('&');

      const url = paypalBaseUrl + '&' + optionsStr;
      window.location.href = url;
    }
  }
}
</script>

<style>
  .pay-button {
    cursor: pointer;
    display: block;
    margin-top: 20px;
  }
</style>
