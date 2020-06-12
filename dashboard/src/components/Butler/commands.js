//
// Commands for Butler
//
import { mutations } from "../../utils/store";

const getYoutubeWatchId = (url) => {
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
      const src = prompt("URL:");
      editor.commands.image({ src });
    },
  },
  {
    id: 1,
    name: "Code Block",
    description: "C/C++, Javascript, Python",
    onCommand: function () {
      editor.commands.code_block();
    },
  },
  {
    id: 2,
    name: "Upload",
    description: "Document/Slides/Book",
    onCommand: function () {
      mutations.toggleUploadBox(true, (data) => {
        editor.commands.resource({ src: data[0].url, title: data[0].name });
      });
    },
  },
  {
    id: 3,
    name: "Youtube Video",
    description: "Embed using youtube link",
    onCommand: function () {
      const videoURL = prompt("URL:");
      const src = getYoutubeWatchId(videoURL);
      editor.commands.iframe({ src });
    },
  },
];
