<template>
  <nav class="Titlebar">
    <!-- menu -->
    <div
      v-if="!this.miniMode"
      class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--single"
      style="position: absolute;"
      @click="toggleDrawer"
    >
      <div class="Menu-wrapper" :class="drawerOpen ? 'is-collapsed' : ''">
        <div class="Menu-line"></div>
        <div class="Menu-line"></div>
      </div>
    </div>

    <h1 class="Title" :style="switchRight">Pomotroid</h1>

    <div class="Icon-group" style="position: absolute; top: 0; right: 0;">
      <div
        class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--double--left"
        style="padding-left: 18px"
        @click="winMinimize"
      >
        <!-- minimize -->
        <!-- <div class="Icon-wrapper"> -->
        <svg
          version="1.2"
          baseProfile="tiny"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 14 2"
          xml:space="preserve"
          width="15px"
          height="20px"
          class="Icon Icon--minimize"
        >
          <line
            fill="none"
            stroke="#F6F2EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-miterlimit="10"
            x1="1"
            y1="1"
            x2="13"
            y2="1"
          />
        </svg>
        <!-- </div> -->
      </div>

      <!-- Resize icon -->
      <div
        class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--double--right"
        style="padding-right: 5px"
        @click="winMiniMode"
      >
        <template v-if="!this.miniMode">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#F6F2EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="Icon Icon--miniMode"
          >
            <polyline points="4 14 10 14 10 20" />
            <polyline points="20 10 14 10 14 4" />
            <line stroke="#F6F2EB" x1="14" y1="10" x2="21" y2="3" />
            <line stroke="#F6F2EB" x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F6F2EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="Icon Icon--minimize"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </template>
      </div>

      <div
        class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--double--right"
        style="padding-right: 18px"
        @click="winClose"
      >
        <!-- close -->
        <!-- <div class="Icon-wrapper"> -->
        <svg
          version="1.2"
          baseProfile="tiny"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 12.6 12.6"
          xml:space="preserve"
          height="15px"
          class="Icon Icon--close"
        >
          <line
            fill="none"
            stroke="#F6F2EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-miterlimit="10"
            x1="1"
            y1="1"
            x2="11.6"
            y2="11.6"
          />
          <line
            fill="none"
            stroke="#F6F2EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-miterlimit="10"
            x1="11.6"
            y1="1"
            x2="1"
            y2="11.6"
          />
        </svg>
        <!-- </div> -->
      </div>
    </div>
  </nav>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  data() {
    return {
      miniMode: false
    }
  },
  computed: {
    drawerOpen() {
      return this.$store.getters.drawerOpen
    },

    minToTray() {
      return this.$store.getters.minToTray
    },

    switchRight() {
      if (this.miniMode) {
        return {
          paddingRight: '72%'
        }
      } else {
        return {}
      }
    }
  },

  methods: {
    toggleDrawer() {
      this.$store.dispatch('toggleDrawer')
    },

    winClose() {
      ipcRenderer.send('window-close')
    },

    winMinimize() {
      ipcRenderer.send('window-minimize', this.minToTray)
    },

    winMiniMode() {
      ipcRenderer.send('window-miniMode', this.miniMode)
      this.miniMode = !this.miniMode
    }
  }
}
</script>

<style lang="scss" scoped>
.Icon--close,
.Icon--minimize,
.Icon--miniMode {
  & line {
    stroke: $colorBlueGrey;
    transition: $transitionDefault;
  }
}

.Menu-line {
  background-color: $colorBlueGrey;
  display: inline-block;
  transition: $transitionDefault;
  width: 20px;
  height: 2px;
  &:last-child {
    width: 10px;
  }
}

.Menu-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
  &.is-collapsed {
    & .Menu-line:first-child {
      transform: rotate(-45deg);
      width: 12px;
    }
    & .Menu-line:last-child {
      transform: rotate(45deg);
      width: 12px;
    }
  }
}

.Title {
  color: $colorGreen;
  font-size: 1rem;
  font-weight: 200;
  padding-top: 18px;
}

.Titlebar {
  letter-spacing: 0.05em;
  margin-bottom: 18px;
  position: relative;
  text-align: center;
  height: 50px;
  -webkit-app-region: drag;
}

.Icon-wrapper--titlebar {
  -webkit-app-region: no-drag;
  &:hover .Menu-line {
    background-color: $colorRed;
  }
  &:hover .Icon--close line,
  &:hover .Icon--minimize line,
  &:hover .Icon--miniMode line {
    stroke: $colorRed;
  }
}
</style>
