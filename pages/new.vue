<template>
  <div id="app">
    <!--Example dependecies-->

    <!--Example Elements-->
    <section class="hero">
      <div class="hero-body" style="padding: 1rem 0">
        <div class="container">
          <div class="columns">
            <div
              class="column is-8 is-offset-3"
              style="display: flex; align-items: center;"
            >
              <div class="is-pulled-left">
                <img width="350px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: .5rem">
      <div class="container">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <horizontal-stepper
              :steps="registerStep"
              @completed-step="completeStep"
              :top-buttons="true"
              @active-step="isStepActive"
              @stepper-finished="alert"
            ></horizontal-stepper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BasicInformation from '~/components/register/BasicInformation';
import WorkspaceMenu from '~/components/register/WorkspaceMenu';
import Success from '~/components/register/Success';

export default {
  layout: 'empty',
  name: 'app',

  data() {
    return {
      registerStep: [
        {
          icon: 'mail',
          name: 'first',
          title: 'Sample title 1',
          subtitle: 'Subtitle sample',
          component: BasicInformation,
          completed: false
        },
        {
          icon: 'report_problem',
          name: 'second',
          title: 'Sample title 2',
          subtitle: 'Subtitle sample',
          component: WorkspaceMenu,
          completed: true
        },
        {
          icon: 'announcement',
          name: 'third',
          title: 'Sample title 3',
          subtitle: 'Subtitle sample',
          component: Success,
          completed: true
        }
      ],
      activeStep: 0
    };
  },
  computed: {},
  methods: {
    completeStep(payload) {
      this.registerStep.forEach(step => {
        if (step.name === payload.name) {
          step.completed = true;
        }
      });
    },
    isStepActive(payload) {
      this.registerStep.forEach(step => {
        if (step.name === payload.name) {
          if (step.completed === true) {
            step.completed = false;
          }
        }
      });
    },
    alert(payload) {
      alert('end');
    }
  }
};
</script>

<style></style>
