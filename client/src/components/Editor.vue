<template>
  <div id="editor-container" :class="{ editing: edit == true }">
    <div class="editor">
      <editor-menu-bar
        v-if="edit"
        :editor="editor"
        v-slot="{ commands, isActive, getMarkAttrs }"
      >
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <IconBold title="Bold Text" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <IconItalic />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <IconUnderline />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <IconCode />
          </button>

          <!-- <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <IconPara />
          </button> -->

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.link() }"
            @click="showLinkMenu(commands, getMarkAttrs('link'))"
          >
            <IconLink />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <IconList />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <IconListNumber />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <IconBlockquote />
          </button>
          <button
            style="margin-left: auto; margin-right: 20px;"
            class="menubar__button"
            @click="showCommands = true"
          >
            <IconPlus />
          </button>
        </div>
      </editor-menu-bar>
      <editor-content class="editor__content" :editor="editor" />
    </div>

    <UploadModal
      v-if="uploadBox.show"
      :course_id="course_id"
      v-on:close="toggleUploadBox(false, null)"
    />
    <SelectItem
      title="Insert item"
      v-if="showCommands"
      :items="commands"
      @select="selectCommand"
      @close="showCommands = false"
    />
  </div>
</template>
<script>
import { getters, mutations } from "../utils/store";
import UploadModal from "./Dialogs/Upload.vue";
import SelectItem from "./SelectItem";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  HardBreak,
  History,
  Heading,
  Code,
  CodeBlockHighlight,
  Bold,
  Italic,
  Underline,
  Image,
  BulletList,
  OrderedList,
  ListItem,
  Placeholder,
  Blockquote,
  Link,
} from "tiptap-extensions";
import Iframe from "./Butler/nodes/iframe";
import Math from "./Butler/nodes/math";
import Resources from "./Butler/nodes/resource";
import ButlerCommands from "./Butler/commands";

// Syntax
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";
import xml from "highlight.js/lib/languages/xml";
import clike from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";

// menu icons
import IconBold from "vue-material-design-icons/FormatBold";
import IconItalic from "vue-material-design-icons/FormatItalic";
import IconUnderline from "vue-material-design-icons/FormatUnderline";
import IconList from "vue-material-design-icons/FormatListBulleted";
import IconListNumber from "vue-material-design-icons/FormatListNumbered";
import IconCode from "vue-material-design-icons/CodeBraces";
import IconBlockquote from "vue-material-design-icons/FormatQuoteClose";
import IconPlus from "vue-material-design-icons/Plus";
import IconLink from "vue-material-design-icons/Link";

export default {
  // Implment v-model
  props: ["value", "edit"],
  components: {
    // Tiptap
    EditorContent,
    EditorMenuBar,
    // Utilities
    UploadModal,
    SelectItem,
    // Icons
    IconBold,
    IconItalic,
    IconUnderline,
    IconList,
    IconListNumber,
    IconCode,
    IconBlockquote,
    IconPlus,
    IconLink,
  },
  data() {
    return {
      editor: null,
      emitAfterOnUpdate: false,
      commands: [],
      showCommands: false,
      course_id: "",
    };
  },
  computed: {
    ...getters,
  },
  watch: {
    value(val) {
      // so cursor doesn't jump to start on typing
      if (this.emitAfterOnUpdate) {
        this.emitAfterOnUpdate = false;
        return;
      }
      if (this.editor) this.editor.setContent(val);
    },
    edit() {
      this.editor.setOptions({
        editable: this.edit,
      });
    },
  },
  mounted() {
    this.course_id = this.$attrs.course_id;
    this.editor = new Editor({
      extensions: [
        new HardBreak(),
        new Blockquote(),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new Link(),
        new Heading({ levels: [1, 2, 3] }),
        new Image(),
        new CodeBlockHighlight({
          languages: { javascript, css, xml, python, java, clike },
        }),
        new History(),
        new Iframe(),
        new Resources(),
        new Placeholder({
          emptyEditorClass: "is-editor-empty",
          emptyNodeClass: "is-empty",
          emptyNodeText: "Write here...",
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
        new Code(),
        new Bold(),
        new Italic(),
        new Underline(),
        new Math(),
      ],
      onUpdate: ({ getHTML }) => {
        this.emitAfterOnUpdate = true;
        this.$emit("input", getHTML());
      },
      editable: this.edit ? true : false,
    });
    this.editor.setContent(this.value);
    this.commands = ButlerCommands(this.editor);
  },
  methods: {
    ...mutations,
    selectCommand({ onCommand }) {
      // Run selected commands
      onCommand();
      this.editor.focus();
    },
    showLinkMenu(commands, attrs) {
      const link = prompt("Add Link", attrs.href);
      commands.link({ href: link });
    },
  },
};
</script>
<style lang="scss">
// This style can't be scoped as ProseMirror
// is not a native Vue component
@import "./nord.css";

$color-black: #111;
$color-white: #fff;

.ProseMirror:focus {
  outline: none;
}
code {
  background: #eee;
  color: indianred;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
  font-family: Monaco, Consolas, "Roboto Mono", monospace;
}

pre {
  color: #fff;
  &::before {
    content: attr(data-language);
    text-transform: uppercase;
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 0.6rem;
  }
  code {
    display: block;
    padding: 1em;
    border-radius: 4px;
  }
}
blockquote {
  border-left: 5px solid $color-black;
  margin: 20px 0;
  padding: 8px 0 8px 25px;
  font-style: italic;
}

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
}

#editor-container {
  position: relative;
  margin: 10px 0;
  iframe {
    width: 720px;
    height: 405px;
    @media screen and (max-width: 1220px) {
      width: 100%;
    }
    @media screen and (max-width: 640px) {
      width: 100%;
      height: 340px;
    }
  }
}

.editing {
  background-color: #fff;
  border: 1px solid rgba($color-black, 0.1);
  border-radius: 4px;
  // padding: 6px 13px;
  .editor__content {
    padding: 0 1rem;
  }
}

.menubar {
  display: flex;
  // margin-bottom: 1rem;
  // transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  border-bottom: 1px solid rgba($color-black, 0.1);
  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-black;
    margin: 0.5rem;
    margin-right: 0.2rem;
    padding: 0.3rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: rgba($color-black, 0.05);
    }

    &.is-active {
      background-color: rgba($color-black, 0.09);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}
</style>
