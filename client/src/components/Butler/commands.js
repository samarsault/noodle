//
// Commands for Butler
//
import { mutations } from "../../utils/store";

const getYoutubeWatchId = (url) => {
  // eslint-disable-next-line
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

export default (editor) => [
  {
    id: 0,
    name: "Image",
    description: "Insert an image",
    onCommand: function () {
      mutations.toggleUploadBox(true, (data) => {
        editor.commands.image({ src: data[0].url });
      });
    },
  },
  {
    id: 1,
    name: "Equation",
    description: "Math equation expression",
    onCommand: function () {
      editor.commands.math();
    },
  },
  {
    id: 2,
    name: "Code Block",
    description: "C/C++, Javascript, Python",
    onCommand: function () {
      editor.commands.code_block();
    },
  },
  {
    id: 3,
    name: "Upload",
    description: "Document/Slides/Book",
    onCommand: function () {
      mutations.toggleUploadBox(
        true,
        (data) => {
          editor.commands.resource({ src: data[0].url, title: data[0].name });
        },
        "*"
      );
    },
  },
  {
    id: 4,
    name: "Youtube Video",
    description: "Embed using youtube link",
    onCommand: function () {
      const videoURL = prompt("URL:");
      const watchId = getYoutubeWatchId(videoURL);
      const src = `https://www.youtube.com/embed/${watchId}`;
      editor.commands.iframe({ src });
    },
  },
];
