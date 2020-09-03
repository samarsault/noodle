import { Node } from "tiptap";

export default class Iframe extends Node {
  get name() {
    return "iframe";
  }

  get schema() {
    return {
      attrs: {
        src: {
          default: null,
        },
      },
      group: "block",
      selectable: false,
      parseDOM: [
        {
          tag: "iframe",
          getAttrs: (dom) => ({
            src: dom.getAttribute("src"),
          }),
        },
      ],
      toDOM: (node) => [
        "iframe",
        {
          src: node.attrs.src,
          frameborder: 0,
          allowfullscreen: "true",
          allow:
            "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
        },
      ],
    };
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
