/*
 * Butler handles all commands for you
 */
import { Node } from 'tiptap'
import { replaceText } from 'tiptap-commands'
import SuggestionsPlugin from 'tiptap-extensions/src/plugins/Suggestions'

export default class Butler extends Node {

  get name() {
    return 'butler'
  }

  get defaultOptions() {
    return {
      matcher: {
        char: '/',
        allowSpaces: false,
        startOfLine: false,
      },
      butlerClass: 'butler',
      suggestionClass: 'butler-suggestion',
    }
  }

  get schema() {
    return {
      attrs: {
        id: {},
        label: {},
      },
      group: 'inline',
      inline: true,
      selectable: false,
      atom: true,
    }
  }

  commands({ schema }) {
    return attrs => replaceText(null, null, attrs)
  }

  get plugins() {
    return [
      SuggestionsPlugin({
        command: ({ range, attrs, schema }) => replaceText(range, null, attrs),
        appendText: '',
        matcher: this.options.matcher,
        items: this.options.items,
        onEnter: this.options.onEnter,
        onChange: this.options.onChange,
        onExit: this.options.onExit,
        onKeyDown: this.options.onKeyDown,
        onFilter: this.options.onFilter,
        suggestionClass: this.options.suggestionClass,
      }),
    ]
  }

}
