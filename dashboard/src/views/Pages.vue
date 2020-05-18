<template>
  <div id="editor-container">
    <button class="primary" @click="save">Save</button>
    <div class="editor">
      <editor-menu-bubble :editor="editor" :keep-in-bounds="true" v-slot="{ commands, isActive, menu }">
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
          >

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
            >
            <span>B</span>
          </button>

            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
              >
              <span>I</span>
            </button>

              <button
                class="menububble__button"
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code"
                >
                <span>&lt;&gt;</span>
              </button>

        </div>
      </editor-menu-bubble>
      <editor-content class="editor__content" :editor="editor" />
    </div>

    <div class="suggestion-list" v-show="showSuggestions" ref="suggestions">
      <template v-if="hasResults">
        <div
          v-for="(command, index) in filteredCommands"
          :key="command.id"
          class="suggestion-list__item"
          :class="{ 'is-selected': currentCommand === index }"
          @click="selectCommand(command)"
        >
          {{ command.name }}
        </div>
      </template>
      <div v-else class="suggestion-list__item is-empty">
        No matching commands
      </div>
    </div>

    <UploadModal v-if="uploadBox.show" course_id="5eb40a8f88c41e30eabb8eda" v-on:close="toggleUploadBox(false, null)"/>
  </div>
</template>

<script>
import { getters, mutations } from '../utils/store';
import tippy, { sticky } from 'tippy.js'
import UploadModal from '../components/Dialogs/Upload.vue';
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
import {
  HardBreak,
  History,
  Heading,
  Code,
  Bold,
  Italic,
  Image,
} from 'tiptap-extensions'
import Butler from './Butler';
import Iframe from './Butler/nodes/iframe';
import Resources from './Butler/nodes/resource';
import ButlerCommands from './Butler/commands';

import axios from 'axios';

export default {
  components: {
    EditorContent,
    EditorMenuBubble,
    UploadModal
  },
  props: {
    onSave: Function
  },
  data() {
    return {
      editor: null,
      course_id: this.$route.params.course_id,
      page_id: this.$route.params.page_id,
      query: null,
      suggestionRange: null,
      filteredCommands: [],
      currentCommand: 0
    }
  },
  computed: {
    hasResults() {
      return this.filteredCommands.length
    },
    showSuggestions() {
      return this.query || this.hasResults
    },
    ...getters
  },
  async mounted() {
    this.editor = new Editor({
      extensions: [
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new Image(),
        new History(),
        new Iframe(),
        new Resources(),
        new Butler({
          // a list of all suggested items
          items: () => ButlerCommands(this.editor),
          // is called when a suggestion starts
          onEnter: ({
            items, query, range, command, virtualNode,
          }) => {
            this.query = query
            this.filteredCommands = items
            this.suggestionRange = range
            this.renderPopup(virtualNode)
          },
          // is called when a suggestion has changed
          onChange: ({
            items, query, range, virtualNode,
          }) => {
            this.query = query
            this.filteredCommands = items
            this.suggestionRange = range
            this.currentCommand = 0
            this.renderPopup(virtualNode)
          },
          // is called when a suggestion is cancelled
          onExit: () => {
            // reset all saved values
            this.query = null
            this.filteredCommands = []
            this.suggestionRange = null
            this.currentCommand = 0
            this.destroyPopup()
          },
          // is called on every keyDown event while a suggestion is active
          onKeyDown: ({ event }) => {
            if (event.key === 'ArrowUp') {
              this.upHandler()
              return true
            }
            if (event.key === 'ArrowDown') {
              this.downHandler()
              return true
            }
            if (event.key === 'Enter') {
              this.enterHandler()
              return true
            }
            return false
          },
        }),
        new Code(),
        new Bold(),
        new Italic(),
      ],
      content: `
          <h2>
            Welcome!
          </h2>
          <p>
           You can add content about your course, essays, materials, youtube videos, links etc. using this page. Click on the left to add a page, top to save and you are good to go!
          </p>
          <p>
            It is powered by <strong>Butler</strong>, who's always at your service. Type '/' to call butler.
          </p>
        `,
    })

    if (this.page_id) {
      const page = (await axios.get(`/api/courses/${this.course_id}/pages/${this.page_id}`)).data;
      this.editor.setContent(JSON.parse(page.doc));
    }
  },
  methods: {
    ...mutations,
    async save() {
      const docData = this.editor.getJSON();
      const resp = await axios.post(`/admin/courses/${this.course_id}/page/save`, {
        _id: this.page_id,
        doc: docData
      });
      if (resp.success)
        alert('Success!')
    },
    // Deletes residue of "/<textw" 
    deleteCommand() {
      let tr = this.editor.view.state.tr;
      tr.delete(this.suggestionRange.from, this.suggestionRange.to);
      this.editor.view.dispatch(tr);
    },
    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler() {
      this.currentCommand = ((this.currentCommand + this.filteredCommands.length) - 1) % this.filteredCommands.length
    },
    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler() {
      this.currentCommand = (this.currentCommand + 1) % this.filteredCommands.length
    },
    enterHandler() {
      const command = this.filteredCommands[this.currentCommand]
      if (command) {
        this.selectCommand(command)
      }
    },
    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectCommand(command) {
      // Order important here
      // If delete is called after, it deletes the new node as well.
      this.deleteCommand();
      command.onCommand();
      //this.destroyPopup();
      this.editor.focus()
    },
    // renders a popup with suggestions
    // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
    renderPopup(node) {
      if (this.popup) {
        return
      }
      // ref: https://atomiks.github.io/tippyjs/v6/all-props/
      this.popup = tippy('#app', {
        getReferenceClientRect: node.getBoundingClientRect,
        appendTo: () => document.body,
        interactive: true,
        sticky: true, // make sure position of tippy is updated when content changes
        plugins: [sticky],
        content: this.$refs.suggestions,
        trigger: 'mouseenter', // manual
        showOnCreate: true,
        theme: 'dark',
        placement: 'top-start',
        inertia: true,
        duration: [400, 200],
      })
    },
    destroyPopup() {
      if (this.popup) {
        this.popup[0].destroy()
        this.popup = null
      }
    },
  },
  beforeDestroy() {
    this.destroyPopup()
  },
}
</script>

<style lang="scss">
$color-black: #111;
$color-white: #fff;
.ProseMirror {
  outline: none;
}
.butler {
  background: rgba($color-black, 0.1);
  color: rgba($color-black, 0.6);
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 2px;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}
.butler-suggestion {
  color: rgba($color-black, 0.6);
}
.suggestion-list {
  background-color: $color-white;
  font-size: 1rem;
  min-width: 200px;
  &__no-results {
    padding: 0.5rem 0.75rem;
  }
  &__item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
    &.is-selected,
    &:hover {
      background-color: #eee;
    }
    &.is-empty {
      opacity: 0.5;
    }
  }
}
.tippy-box[data-theme~=light] {
  padding: 0;
  font-size: 1rem;
  text-align: inherit;
  color: $color-black;
}
#editor-container {
  position: relative;
  max-width: 800px;
  margin: 20px auto;
}
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: $color-black;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba($color-white, 0.1);
    }

    &.is-active {
      background-color: rgba($color-white, 0.2);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: $color-white;
  }
}</style>
