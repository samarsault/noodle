import { Node } from "tiptap";
import ResourceView from "./Resource.vue";

export default class ResourceNode extends Node {
  get name() {
    return "resource";
  }

  get schema() {
    return {
      // here you have to specify all values that can be stored in this node
      attrs: {
        src: {
          default: null,
        },
        title: {
          default: "Untitled",
        },
      },
      group: "block",
      draggable: true,
      // parseDOM and toDOM is still required to make copy and paste work
      parseDOM: [
        {
          tag: "resource",
          getAttrs: (dom) => ({
            src: dom.getAttribute("src"),
            title: dom.getAttribute("title"),
          }),
        },
      ],
      toDOM: (node) => [
        "resource",
        {
          src: node.attrs.src,
          title: node.attrs.title,
        },
      ],
    };
  }

  // return a vue component
  // this can be an object or an imported component
  get view() {
    return ResourceView;
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
