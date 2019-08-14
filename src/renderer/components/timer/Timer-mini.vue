<template>
  <section
    style="display: flex; flex-direction: row; padding-left: 18px; padding-right: 18px; align-items: center"
  >
    <app-audio />
    <app-tray-icon />
    <div style="display: flex; flex-grow: 1">
      <app-timer-dial-mini :minutes="minutes" :timer="timer" :timerActive="timerActive">
        <p class="Dial-time" v-if="!timerStarted">{{ prettyMinutes }}</p>
        <p class="Dial-time" v-else>{{ prettyTime }}</p>
      </app-timer-dial-mini>
    </div>
    <section
      style="display: flex; flex-grow: 2; margin-bottom: 18px; align-items: center; justify-content: space-evenly;"
    >
      <transition name="fade" mode="out-in">
        <div class="Button" v-if="!timerStarted" @click="startTimer" :key="'start'">
          <!-- Play icon -->
          <div class="Button-icon-wrapper">
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
              class="Icon--start"
              style="padding-left: 5px"
            >
              <polygon fill="#F6F2EB" points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        <div
          class="Button"
          v-if="timerStarted && !timerActive"
          @click="resumeTimer"
          :key="'resume'"
        >
          <!-- Resume icon; same one as Play icon -->
          <div class="Button-icon-wrapper">
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
              style="padding-left: 5px"
            >
              <polygon fill="#F6F2EB" points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        <div
          class="Button"
          v-else-if="timerStarted && timerActive"
          @click="pauseTimer"
          :key="'pause'"
        >
          <!-- Pause icon -->
          <div class="Button-icon-wrapper">
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
              class="Icon--pause"
            >
              <rect fill="none" stroke="#F6F2EB" x="6" y="4" width="4" height="16" />
              <rect fill="none" stroke="#F6F2EB" x="14" y="4" width="4" height="16" />
            </svg>
          </div>
        </div>
      </transition>

      <div class="Button" @click="callForReset">
        <div class="Button-icon-wrapper">
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
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        </div>
      </div>

      <div>
        <p>{{ round }} / {{ workRounds }} rounds</p>
      </div>
    </section>

    <app-timer-controller />
  </section>
</template>

<script>
import Timer from '@/utils/timer'
import appAudio from '@/components/Audio'
import appTrayIcon from '@/components/TrayIcon'
import appTimerController from '@/components/timer/Timer-controller'
import appTimerDialMini from '@/components/timer/Timer-dial-mini'
import { EventBus } from '@/utils/event-bus'

export default {
  components: {
    appAudio,
    appTrayIcon,
    appTimerController,
    appTimerDialMini
  },

  props: {
    minutes: {
      type: Number,
      default: 1
    },
    timer: null,
    timerActive: {
      type: Boolean,
      default: false
    },
    timerStarted: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      minutes: this.minutes,
      timer: this.timer,
      timerActive: this.timerActive,
      timerStarted: this.timerStarted
    }
  },

  computed: {
    // store getters
    currentRound() {
      return this.$store.getters.currentRound
    },

    round() {
      return this.$store.getters.round
    },

    workRounds() {
      return this.$store.getters.workRounds
    },

    timeLongBreak() {
      return this.$store.getters.timeLongBreak
    },

    timeShortBreak() {
      return this.$store.getters.timeShortBreak
    },

    timeWork() {
      return this.$store.getters.timeWork
    },

    miniMode() {
      return this.$store.getters.miniMode
    },

    // local
    prettyMinutes() {
      return this.minutes + ':00'
    },

    prettyTime() {
      return `${this.timeRemaining.remainingMinutes}:${this.timeRemaining.remainingSeconds}`
    },

    timeElapsed() {
      if (this.timer.time !== null) {
        const time = this.timer.time
        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60
        return {
          minutes,
          seconds
        }
      }
    },

    timeRemaining() {
      if (this.timer.time !== null) {
        const minutes = this.minutes
        const time = this.timer.time
        const elapsedMinutes = Math.floor(time / 60)
        const elapsedSeconds = time - elapsedMinutes * 60
        const remainingSeconds = this.formatTimeDouble(60 - elapsedSeconds)
        let remainingMinutes = minutes - elapsedMinutes

        if (elapsedSeconds > 0) {
          remainingMinutes -= 1
        }

        return {
          remainingMinutes,
          remainingSeconds
        }
      }
    }
  },

  methods: {
    formatTimeDouble(time) {
      if (time === 60) {
        return '00'
      } else if (time < 10) {
        return `0${time}`
      } else {
        return time
      }
    },

    createTimer(min) {
      this.timer = new Timer(min)
    },

    initTimer() {
      switch (this.currentRound) {
        case 'work':
          this.minutes = this.timeWork
          this.createTimer(this.timeWork)
          break
        case 'short-break':
          this.minutes = this.timeShortBreak
          this.createTimer(this.timeShortBreak)
          break
        case 'long-break':
          this.minutes = this.timeLongBreak
          this.createTimer(this.timeLongBreak)
          break
        default:
          this.createTimer(25)
          break
      }
    },

    pauseTimer() {
      this.timer.pause()
      this.timerActive = !this.timerActive
    },

    resetTimer() {
      this.timer.reset()
      this.timerActive = !this.timerActive
      this.timerStarted = false
    },

    resumeTimer() {
      this.timer.resume()
      this.timerActive = true
    },

    startTimer() {
      this.timer.start()
      this.timerActive = true
      this.timerStarted = true
    },

    callForReset() {
      EventBus.$emit('call-timer-reset')
    }
  },

  mounted() {
    this.initTimer()

    EventBus.$on('timer-init', opts => {
      // clear previous timers
      this.timer.reset()
      this.initTimer()
      if (opts.auto) {
        setTimeout(() => {
          this.startTimer()
        }, 1500)
      } else {
        this.timerActive = false
      }
    })

    EventBus.$on('call-timer-reset', () => {
      this.resetTimer()
    })
  }
}
</script>

<style lang="scss" scoped>
.Button {
  border: 2px solid $colorBlueGrey;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  transition: $transitionDefault;
  width: 50px;
  height: 50px;
  -webkit-app-region: no-drag;
  // &:hover {
  //   background-color: $colorLightNavy;
  //   & .Icon--pause line {
  //     stroke: $colorRed;
  //   }
  //   & .Icon--start polygon {
  //     fill: $colorRed;
  //   }
  // }
}

.Button-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0 10px 0;
}

.Button-icon-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
}

.Dial-time {
  font-family: 'RobotoMono', monospace;
  font-size: 46px;
  margin: 0;
  position: absolute;
  top: 32%;
}

.Timer-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
