import { createApp } from "vue";

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';

import statePlug from "./state";
import { router } from "./router";
import App from "./App.vue";

function init(app) {
	app.use(statePlug);	
	VMdEditor.use(githubTheme, {
		Hljs: hljs,
	});
	VMdEditor.lang.use('en-US', enUS); // because it's chineese by default lol
	app.use(VMdEditor);
	app.use(router);
	app.mount("#app");
}

init(createApp(App));

