<template>
  <div id="editor">
    <!-- Editor Header -->
    <div id="editor-header">
      <div id="editor-title" class="left has-text-primary">I18n Editor</div>
      <div class="right">
        <div class="field has-addons">
          <p class="control">
            <label class="file-label">
              <input class="file-input" type="file" name="master" @change="fileInputValueChanged" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="mdi mdi-18px mdi-translate"></i>
                </span>
                <span class="file-label">Load Translation</span>
              </span>
            </label>
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

    <!-- Editor Content-->
    <div id="editor-content">
      <!-- Language Headers -->
      <div class="columns" id="language-headers">
        <div class="column" style="display: flex;">
          <div style="margin-right: 16px;">Keys</div>
          <div style="flex-grow: 1;margin-top: 4px;">
            <input class="input is-small" type="text" placeholder="Filter..." v-model="keyFilter" />
          </div>
        </div>
        <div class="column" v-if="master != null">Master `{{master.name}}`</div>
        <div class="column" v-for="(translation, i) in translations" :key="'translation-' + i">
          Translation `{{translation.name}}`
          <div class="right">
            <button
              class="button is-small is-danger"
              style="margin-top: 4px;"
              @click="closeTranslation(translation.name)"
            >
              <span class="icon is-small">
                <i class="mdi mdi-close" />
              </span>
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Language Contents -->
      <div class="columns" v-for="key in keys" :key="key">
        <div class="column key-column">{{ key }}</div>
        <div class="column" v-if="master != null">
          <input class="input is-small" type="text" :placeholder="key" v-model="master.values[key]" />
        </div>
        <div class="column" v-for="(translation, i) in translations" :key="'translation-' + i">
          <input
            class="input is-small"
            type="text"
            :placeholder="key"
            v-model="translation.values[key]"
            :class="{'is-danger': translation.values[key] == null}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const fs = require("fs");
const path = require("path");

export default {
  name: "editor",
  data() {
    return {
      keyFilter: ""
    };
  },
  computed: {
    keys() {
      return this.$store.state.langs.keys.filter(key =>
        key.startsWith(this.keyFilter)
      );
    },
    master() {
      return this.$store.state.langs.master;
    },
    translations() {
      return this.$store.state.langs.translations;
    }
  },
  methods: {
    fileInputValueChanged(event) {
      if (event.srcElement.files[0] !== undefined) {
        this.loadTranslation(event.srcElement.files[0].path, function() {
          event.srcElement.value = null;
        });
      }
    },
    loadTranslation(filePath, callback) {
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
            this.$store.dispatch("addTranslation", { lang, name });
            callback();
          }
        }
      });
    },
    closeProject() {
      this.$store.dispatch("reset");
      this.$router.push("/");
    },
    closeTranslation(name) {
      this.$store.dispatch("removeTranslation", name);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/colors.scss";

#editor {
  text-align: left;
  padding: 16px;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  overflow: auto;
}

#editor-header {
  overflow: auto;
}

#editor-title {
  font-size: 32px;
  text-shadow: 1px 1px black;
}

#editor-content {
  padding-top: 16px;
  font-family: "Source Code Pro", monospace;
  font-size: 16px;
}

.file-cta {
  border-radius: 4px 0px 0px 4px;
}

.column {
  padding: 0px 8px;
  margin: 2px 0px;
}

#language-headers {
  font-size: 24px;
}

.input {
  background-color: $color-darker;
  border-color: $color-darker;
  &::placeholder {
    color: gray;
  }
}
</style>
