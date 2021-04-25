<template>
  <div>
    <HeroSection :shapes="shapes">
      <nuxt-link :to="`/${workspace.slug}/settings`" class="workspace-name">
        <h1>{{workspace.name}}</h1>
        <font-awesome-icon class="workspace-settings" icon="cog" />
      </nuxt-link>
      <time class="date" :datetime="`${now.month}-${now.date}`">
        {{now.month}}.{{now.date}}
      </time>
      <div class="workspace-switcher label" role="listbox" tabindex="0">
        <span>Switch workspace</span>
        <font-awesome-icon class="caret" icon="caret-down" />
      </div>
      <Glance class="glance" title="This Week" :figures="figures" />
      <EditorButton class="editor-button" :messages="messages"></EditorButton>
    </HeroSection>
    <BodySection>
      <HomeCard title="Grant Access to Google" subtitle="Follow us">
        <p>
          In order to retrieve performance information about your posts, you
          will need to grant Editori access to your Google Account.
        </p>
        <button class="connect-google" @click="connectGoogle">
          Connect Your Google Account
        </button>
      </HomeCard>
    </BodySection>
  </div>
</template>

<script>
import HeroSection from '~/components/layout/HeroSection';
import BodySection from '~/components/layout/BodySection';
import EditorButton from '~/components/EditorButton';
import Glance from '~/components/Glance';
import HomeCard from '~/components/cards/HomeCard';
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';

const currentTime = new Date();

function pad(value, totalDigits) {
  const valueString = value.toString();
  const existingDigits = valueString.length;
  let prefix = '';
  for (let i = 0; i < totalDigits - existingDigits; i++) {
    prefix += '0';
  }

  return prefix + valueString;
}

export default {
  components: { HeroSection, BodySection, EditorButton, Glance, HomeCard },
  async asyncData(ctx) {
    const response = await ctx.$axios.get('/connections/google', {
      params: {
        'workspace': ctx.route.params.workspace,
      }
    });

    return {
      googleOauthUrl: response.data,
    }
  },
  data() {
    return {
      shapes: [
        { type: 'circle', x: -141, y: -281, size: 724, color: '#fffefd' },
      ]
    }
  },
  computed: {
    figures() {
      return [
        { value: '40k', caption: 'Total traffic' },
        { value: '$700', caption: 'Total income' },
        { value: '$300', caption: 'Total spend' },
      ]
    },
    messages() {
      return new Array(22);
    },
    now() {
      const month = pad(currentTime.getMonth() + 1, 2);
      const date = pad(currentTime.getDate(), 2);

      return {
        month,
        date
      }
    },
  },
  mixins: [getWorkspaceBySlug],
  methods: {
    connectGoogle() {
      window.location.href = this.googleOauthUrl;
    }
  },
  mounted() {
    console.log('redirect URL', this.googleOauthUrl)
  }
}
</script>

<style scoped>
  .date {
    color: #f5eee8aa;
    font-size: 144rem;
    font-weight: 900;
    font-family: var(--display-font);
    left: 0rem;
    top: 150rem;
    z-index: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .workspace-name {
    color: inherit;
    left: 100rem;
    top: 240rem;
    z-index: 2;
  }
  .workspace-name h1 {
    display: inline-block;
    font-size: 70rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .workspace-settings {
    width: 24rem;
    height: 24rem;
    vertical-align: top;
    opacity: 0.33;
    transition: opacity 300ms ease;
  }
  .workspace-name:hover .workspace-settings {
    opacity: 1;
  }
  .workspace-switcher {
    cursor: pointer;
    font-size: 18rem;
    left: 100rem;
    top: 360rem;
    text-transform: uppercase;
    outline-offset: 10rem;
  }
  .workspace-switcher .caret {
    height: 18rem; 
  }
  .glance {
    left: 150rem;
    top: 493rem;
  }
  .editor-button {
    left: 900rem;
    top: 300rem;
  }
  .connect-google {
    margin-top: 30px;
  }
</style>
