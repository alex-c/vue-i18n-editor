<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "vue-i18n-editor"
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
@import "./style/colors.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  overflow-y: hidden;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  text-align: center;
}

#app {
  background-color: $color-vue-dark;
  color: white;
  width: 100vw;
  height: 100vh;
}

.left {
  float: left;
}

.right {
  float: right;
}
</style>
