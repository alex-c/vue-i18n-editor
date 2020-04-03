<template>
  <div id="editor">
    <div id="editor-header">
      <div id="editor-title" class="left has-text-primary">I18n Editor</div>
      <div class="right">
        <div class="field has-addons">
          <p class="control">
            <button class="button">
              <span class="icon is-small">
                <i class="fas fa-align-left"></i>
              </span>
              <span>Left</span>
            </button>
          </p>
          <p class="control">
            <button class="button">
              <span class="icon is-small">
                <i class="fas fa-align-center"></i>
              </span>
              <span>Center</span>
            </button>
          </p>
          <p class="control">
            <button class="button is-danger" @click="closeProject">
              <span class="icon is-small">
                <i class="mdi mdi-close" />
              </span>
              <span>Close Project</span>
            </button>
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="columns">
        <div class="column">
          <div v-for="entry in decomposeJson(master)" :key="entry.key">
            {{ entry.value }}
          </div>
        </div>
        <div class="column" v-if="translations.length === 0">
          Empty
        </div>
        <div
          class="column"
          v-for="(translation, i) in translations"
          :key="'translation-' + i"
        >
          Translation!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editor",
  computed: {
    master() {
      return this.$store.state.langs.master;
    },
    translations() {
      return this.$store.state.langs.translations;
    }
  },
  methods: {
    closeProject() {
      this.$store.dispatch("reset");
      this.$router.push("/");
    },
    decomposeJson(json) {
      let data = [];
      Object.entries(json).forEach(([key, value]) => {
        if (typeof value === "string") {
          data.push({ key, value, type: "string" });
        } else if (typeof value === "object") {
          data.push({ key, type: "object", value: this.decomposeJson(value) });
        } else {
          throw new Error("Invalid value!"); // TODO
        }
      });
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
#editor {
  text-align: left;
  padding: 16px;
}

#editor-header {
  overflow: auto;
}

#editor-title {
  font-size: 32px;
  text-shadow: 1px 1px black;
}
</style>
