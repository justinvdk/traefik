<template>
  <q-header class="shadow-1">
    <section class="app-section bg-primary text-white">
      <div class="app-section-wrap app-boxed app-boxed-xl">
        <q-toolbar class="row no-wrap items-center">
          <div class="q-pr-md logo">
            <img alt="logo" src="~assets/logo.svg">
            <q-btn v-if="version" type="a" href="https://github.com/traefik/traefik/" target="_blank" stretch flat no-caps :label="version" class="btn-menu version" />
          </div>
          <q-tabs align="left" inline-label indicator-color="transparent" active-color="white" stretch>
            <q-route-tab to="/" icon="eva-home-outline" no-caps label="Dashboard" />
            <q-route-tab to="/http" icon="eva-globe-outline" no-caps label="HTTP" />
            <q-route-tab to="/tcp" icon="eva-globe-2-outline" no-caps label="TCP" />
            <q-route-tab to="/udp" icon="eva-globe-2-outline" no-caps label="UDP" />
          </q-tabs>
          <div class="right-menu">
            <q-tabs>
              <q-btn @click="$q.dark.toggle()" stretch flat no-caps icon="invert_colors" :label="`${$q.dark.isActive ? 'Light' : 'Dark'} theme`" class="btn-menu" />
              <q-btn stretch flat icon="eva-question-mark-circle-outline">
                <q-menu anchor="bottom left" auto-close>
                  <q-item>
                    <q-btn type="a" :href="`https://doc.traefik.io/traefik/${parsedVersion}`" target="_blank" flat color="accent" align="left" icon="eva-book-open-outline" no-caps label="Documentation" class="btn-submenu full-width"/>
                  </q-item>
                  <q-separator />
                  <q-item>
                    <q-btn type="a" href="https://github.com/traefik/traefik/" target="_blank" flat color="accent" align="left" icon="eva-github-outline" no-caps label="Github repository" class="btn-submenu full-width"/>
                  </q-item>
                </q-menu>
              </q-btn>
            </q-tabs>
          </div>
        </q-toolbar>
      </div>
    </section>

    <section class="app-section text-black sub-nav" :class="{ 'bg-white': !$q.dark.isActive }">
      <div class="app-section-wrap app-boxed app-boxed-xl">
        <slot />
      </div>
    </section>
  </q-header>
</template>

<script>
import config from '../../../package'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters('core', { coreVersion: 'version' }),
    version () {
      if (!this.coreVersion.Version) return null
      return /^(v?\d+\.\d+)/.test(this.coreVersion.Version)
        ? this.coreVersion.Version
        : this.coreVersion.Version.substring(0, 7)
    },
    parsedVersion () {
      if (!this.version) {
        return 'master'
      }
      if (this.version === 'dev') {
        return 'master'
      }
      const matches = this.version.match(/^(v?\d+\.\d+)/)
      return matches ? 'v' + matches[1] : 'master'
    },
    name () {
      return config.productName
    }
  },
  methods: {
    ...mapActions('core', { getVersion: 'getVersion' }),
    getHubLogoSrc (isDarkMode) {
      return isDarkMode
        ? 'statics/hub-logo-horizontal-dark.png'
        : 'statics/hub-logo-horizontal-clear.png'
    }
  },
  created () {
    this.getVersion()
  }
}
</script>

<style scoped lang="scss">
  @import "../../css/sass/variables";

  .q-toolbar {
    min-height: 64px;
  }

  .body--dark {
    .sub-nav {
      background-color: #0e204c;
    }
  }

  .q-item--dark {
    background: var(--q-color-dark);
  }

  .logo {
    display: flex;
    align-items: center;

    img {
      height: 24px;
      margin-right: 10px;
    }

    .version {
      min-height: inherit;
      line-height:  inherit;
      padding: 0 4px;
    }
  }

  .q-tabs {
    color: rgba( $app-text-white, .4 );
    /deep/ .q-tabs__content {
      .q-tab__content{
        min-width: 100%;
        .q-tab__label {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }

  .right-menu {
    flex: 1;
    height: 64px;
    display: flex;
    justify-content: flex-end;
  }

  .btn-menu {
    color: rgba( $app-text-white, .4 );
    font-size: 16px;
    font-weight: 600;
  }

  .btn-hub {
    color: #dedede;
    background: #5f6572;
  }

  .q-item {
    padding: 0;
  }

  .btn-submenu {
    font-weight: 700;
    align-items: flex-start;
  }

  .tooltip {
    display: inline-block;

    .content {
      display: flex;
      align-items: center;
      visibility: hidden;
      font-size: 16px;
      padding: 20px;
      border-radius: 16px;
      background-color: #fff;
      box-shadow: 0 0 6px rgba(0,0,0,0.16), 0 0 6px rgba(0,0,0,0.23);

      /* Position the tooltip text */
      position: absolute;
      z-index: 1;
      top: 90%;
      left: -5%;

      /* Fade in tooltip */
      opacity: 0;
      transition: opacity 0.3s;

      &::after {
        content: "";
        position: absolute;
        top: -10px;
        left: 22%;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 10px solid #fff;
      }

      p {
        align-self: baseline;
        color: var(--q-color-primary);
        font-weight: bold;
        margin: 0 20px 0 0;
        max-width: 180px;
      }

      img {
        margin: 0 20px;
      }
    }

    &.is-dark-mode .content {
      background-color: #262626;
      box-shadow: 0 0 6px rgba(10,18,36,0.16), 0 0 6px rgba(10,18,36,0.23);

      &::after {
        border-bottom: 10px solid #262626;
      }

      p {
        color: #fff;
      }
    }

    &:hover .content {
      visibility: visible;
      opacity: 1;
    }
  }

</style>
