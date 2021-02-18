<template>
  <v-app>
    <v-container class="container-700">
      <div align="center">
        <h3>
          AH, SO YOU'RE TEAM WEBFLOW
        </h3>
        <p class="f-16">
          No Problem, we will use it as the source of truth to stay in sync.
          Just connect your account.
        </p>
        <a>
          <div class="editori-border mb-4">
            <v-container>
              <svg
                width="90"
                height="81"
                viewBox="0 0 90 81"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M81.0938 45.9377C74.5312 45.9377 71.7188 50.9377 68.2812 50.9377C58.9062 50.9377 67.5 23.2815 67.5 23.2815C67.5 23.2815 36.7188 35.7815 36.7188 22.8127C36.7188 17.1877 42.5 15.6252 42.5 9.37524C42.5 3.90649 37.9688 0.781494 32.8125 0.781494C27.3438 0.781494 22.5 3.75024 22.5 9.68774C22.5 16.094 27.3438 18.9065 27.3438 22.5002C27.3438 33.2815 0 26.8752 0 26.8752V78.9065C0 78.9065 27.8125 85.469 27.8125 74.5315C27.8125 70.9377 21.5625 68.2815 21.5625 61.719C21.5625 55.9377 26.0938 52.969 31.5625 52.969C36.7188 52.969 41.25 55.9377 41.25 61.5627C41.25 67.6565 35.4688 69.3752 35.4688 75.0002C35.4688 84.5315 55.7812 78.9065 63.75 78.9065C63.75 78.9065 58.4375 60.1565 67.8125 60.1565C73.4375 60.1565 75.1562 65.7815 81.4062 65.7815C86.875 65.7815 90 61.4065 90 56.2502C90 50.9377 87.0312 45.9377 81.0938 45.9377Z"
                  fill="black"
                />
              </svg>
              <div class="mt-4">
                <span>Connect to Webflow</span>
              </div>
            </v-container>
          </div>
        </a>

        <div class="mb-12">
          <i>Click to login to Webflow</i>
        </div>

        <v-btn
          @click="proceed()"
          type="submit"
          block
          class="py-7"
          color="brown darken-3 white--text"
          >NEXT</v-btn
        >
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {}
</script>

<style></style>
