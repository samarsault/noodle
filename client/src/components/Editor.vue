<template>
  <div id="editor-container" :class="{ editing: edit == true }">
    <div class="editor">
      <editor-menu-bar
        v-if="edit"
        :editor="editor"
        v-slot="{ commands, isActive }"
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
          <icon name="paragraph" />
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
          <button class="menubar__button" @click="showCommands = true">
            Insert
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
      title="Insert"
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
} from "tiptap-extensions";
import Iframe from "./Butler/nodes/iframe";
import Resources from "./Butler/nodes/resource";
import ButlerCommands from "./Butler/commands";

// Syntax
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";
import xml from "highlight.js/lib/languages/xml";
import clike from "highlight.js/lib/languages/c-like";
import java from "highlight.js/lib/languages/java";

// menu icons
import IconBold from "vue-material-design-icons/FormatBold";
import IconItalic from "vue-material-design-icons/FormatItalic";
import IconUnderline from "vue-material-design-icons/FormatUnderline";
import IconList from "vue-material-design-icons/FormatListBulleted";
import IconListNumber from "vue-material-design-icons/FormatListNumbered";
import IconCode from "vue-material-design-icons/CodeBraces";
import IconBlockquote from "vue-material-design-icons/FormatQuoteClose";

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
        new Heading({ levels: [1, 2, 3] }),
        new Image(),
        new CodeBlockHighlight({
          options: {
            languages: { javascript, css, xml, python, java, clike },
          },
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
  padding: 5px 10px;
  border-radius: 4px;
  font-family: Monaco, Consolas, "Roboto Mono", "Ubuntu Monospaced";
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
.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
}

#editor-container {
  position: relative;
  padding: 6px 13px;
  margin: 10px 0;
}

.editing {
  background-color: #fff;
  border: 1px solid #ccc;
}

.menubar {
  display: flex;
  margin-bottom: 1rem;
  // transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba($color-black, 0.05);
    }

    &.is-active {
      background-color: rgba($color-black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}
</style>
