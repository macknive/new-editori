<template>
  <div>
    <table v-if="paymentData.length">
      <tbody>
        <PaymentTableRow v-for="data in paymentData"
            :key="`u${data.user.id}-s${data.step.id}`"
            :data="data"
            :wordCount="wordCount"
            :deliverable="deliverable"
            :workspace="workspace">
        </PaymentTableRow>
      </tbody>
    </table>
    <div v-else>
      No one needs to be paid for {{deliverable.title}}.
    </div>
  </div>
</template>

<script>
import PaymentTableRow from '~/components/PaymentTableRow';
import GetPaymentData from '~/queries/GetPaymentData';
import readingTime from 'reading-time';

export default {
  components: {
    PaymentTableRow,
  },
  props: [
    'assignee',
    'deliverable',
    'workspace',
  ],
  data() {
    return {
      paymentData: [],
    };
  },
  computed: {
    wordCount() {
      const readingTimeStats = readingTime(this.deliverable.data.html);
      return readingTimeStats.words;
    }
  },
  apollo: {
    paymentData: {
      prefetch: true,
      query: GetPaymentData,
      variables() {
        const stepIds = [];
        const userIds = [];

        this.deliverable.workflow_data.forEach(instance => {
          stepIds.push(instance.step.id);
          userIds.push(instance.assignee.id);
        });

        return {
          stepIds,
          userIds,
        };
      }
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
