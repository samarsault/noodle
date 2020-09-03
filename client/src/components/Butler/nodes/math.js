import { Node } from "tiptap";
import Katex from "./Katex.vue";

export default class MathNode extends Node {
  get name() {
    return "math";
  }

  get schema() {
    return {
      // here you have to specify all values that can be stored in this node
      attrs: {
        value: {
          default: null,
        },
      },
      group: "block",
      draggable: true,
      // parseDOM and toDOM is still required to make copy and paste work
      parseDOM: [
        {
          tag: "math",
          getAttrs: (dom) => ({
            value: dom.getAttribute("value"),
          }),
        },
      ],
      toDOM: (node) => [
        "math",
        {
          value: node.attrs.value,
        },
      ],
    };
  }

  // return a vue component
  // this can be an object or an imported component
  get view() {
    return Katex;
  }
  commands({ type }) {
    return (attrs) => (state, dispatch) => {
      const { selection } = state;
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos;
      const node = type.create(attrs);
      const transaction = state.tr.insert(position, node);
      dispatch(transaction);
    };
  }
}
