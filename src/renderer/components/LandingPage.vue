<template>
  <div id="landing-page">
    <main>
      <div id="title">
        Welcome to to the
        <span class="has-text-primary">I18n Editor</span>!
      </div>
      <div id="intro">Please select a master language file to get started:</div>
      <div class="file is-centered is-primary">
        <label class="file-label">
          <input class="file-input" type="file" name="master" @change="fileInputValueChanged" />
          <span class="file-cta">
            <span class="file-icon">
              <i class="mdi mdi-18px mdi-translate"></i>
            </span>
            <span class="file-label">Select Master</span>
          </span>
        </label>
      </div>
      <div class="notification is-danger" v-if="error != null">
        <button class="delete" @click="error = null" />
        {{ error }}
      </div>
    </main>
  </div>
</template>

<script>
const fs = require("fs");
const path = require("path");

export default {
  name: "landing-page",
  data() {
    return {
      error: null
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    fileInputValueChanged(event) {
      if (event.srcElement.files[0] !== undefined) {
        this.loadMaster(event.srcElement.files[0].path);
      }
    },
    loadMaster(filePath) {
      fs.readFile(filePath, (error, data) => {
        if (error) {
          console.error(error);
          this.error = this.$t("files.readError");
        } else {
          let lang = null;
          try {
            lang = JSON.parse(data);
          } catch (parseError) {
            console.error(parseError);
            this.error = this.$t("files.parseError");
          }
          if (lang != null) {
            const fileName = path.basename(filePath);
            const name = fileName.substring(0, fileName.lastIndexOf("."));
            this.$store.dispatch("setMaster", { lang, name });
            this.$router.push({ path: "/editor" });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
}

main {
  width: 600px;
}

#title {
  font-size: 32px;
  text-shadow: 1px 1px black;
}

.file {
  margin: 16px 0px;
}

.notification {
  text-align: left;
}
</style>
