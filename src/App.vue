<template>
  <div id="app">
    <Screen 
      @lastScores="showLastScores" 
      @bestScores="showBestScores"></Screen>
    <div class="popups">
      <Overlay :class="{show: showLatest}" @close="showLatest = false">
        <lastScores 
          :scores="$root.scores.lasts" slot="body"></lastScores>
      </Overlay>

      <Overlay :class="{show: showBest}"  @close="showBest = false">
        <bestScores 
          :scores="$root.scores.highest" slot="body"></bestScores>
      </Overlay>
    </div>
  </div>
</template>

<style scoped>

  .popups > * {
    opacity: 0;
    display: none;
    transition: opacity ease 0.4s;
  }

  .show {
    display: block;
    opacity: 1;
  }
</style>

<script>
import Screen from "./components/Screen";
import Overlay from "./components/Overlay";
import lastScores from "./components/lastScores";
import bestScores from "./components/bestScores";

export default {
  name: "app",
  components: {
    Screen,
    Overlay,
    lastScores,
    bestScores
  },
  data () {
    return {
      showLatest: false,
      showBest: false
    }
  },
  methods: {
    showLastScores () {
      this.showLatest = true;
    },
    showBestScores () {
      this.showBest = true;
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
