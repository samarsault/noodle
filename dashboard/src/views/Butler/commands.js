//
// Commands for Butler
//
import { getters, mutations } from '../../utils/store';

const getYoutubeWatchId = (url) => {
	const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[7].length === 11 ? match[7] : false;
};

export default (editor) => [
	{
		id: 0,
		name: 'Image',
		onCommand() {
			const src = prompt('URL:');
			editor.commands.image({ src });
		},
	},
	{
		id: 1,
		name: 'Code Block',
		onCommand() {
			editor.commands.code_block();
		},
	},
	{
		id: 2,
		name: 'Upload',
		onCommand() {
			mutations.toggleUploadBox(true, (data) => {
				editor.commands.resource({ src: data[0].url, title: data[0].name });
			});
		},
	},
	{
		id: 3,
		name: 'Youtube Video',
		onCommand() {
			const videoURL = prompt('URL:');
			const src = getYoutubeWatchId(videoURL);
			editor.commands.iframe({ src });
		},
	},
];
