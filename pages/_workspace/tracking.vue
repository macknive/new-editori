<template>
  <div>
    <HeroSection>
      <div class="title width-100">
        <div class="container-row m-auto">
          <div class="width-500 m-auto">
            <h2>
              Select pages to track and unlock historical performance, providing
              uniqe insights, and tailored opportunities to how to grow traffic
              & revenue
            </h2>
          </div>
          <div class="m-auto width-500 switch-count container-row">
            <div class="tracked">
              {{ tracking }}
            </div>
            <div class="untracked">/{{ workspace.pages.length }}</div>
          </div>
        </div>
      </div>
    </HeroSection>
    <BodySection>
      <div class="container-row m-auto mb-20">
        <div class="width-500">Title</div>
        <div class="m-auto">Tracking</div>
      </div>
      <div v-for="page in workspace.pages" :key="page.id">
        <Track :page="page" />
      </div>
    </BodySection>
  </div>
</template>

<script>
import BodySection from '~/components/layout/BodySection';
import HeroSection from '~/components/layout/HeroSection';
import Track from '~/components/Track';
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';
export default {
  components: {
    BodySection,
    HeroSection,
    Track
  },
  computed: {
    tracking() {
      return this.workspace.pages.filter(
        value => value.trackingType === 'TRACKING_ENABLED'
      ).length;
    }
  },
  mixins: [getWorkspaceBySlug]
};
</script>

<style>
.title {
  top: 200rem;
}
.switch-count {
  border-radius: 50%;
  border: 1px solid #593d3b;
  padding: 22px;
  height: 200px;
  width: 200px;
  margin: auto;
  background-color: #593d3b;
}
.tracked {
  margin: 60px 0 0 30px;
  font-size: 24px;
  color: white;
}

.untracked {
  margin-top: 35px;
  font-size: 48px;
  color: white;
}
</style>
