"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
try {
    const todoKeyword = (0, core_1.getInput)('todo-keyword');
    const commentStyle = (0, core_1.getInput)('comment-style');
    const token = (0, core_1.getInput)('github-token');
    console.log(`Starting todo action with todo-keyword: ${todoKeyword} and comment-style: ${commentStyle}`);
    (0, core_1.setOutput)('code-snippets', 'hello world');
    //   const payload = JSON.stringify(context.payload, undefined, 2);
    //   console.log(`The event payload: ${payload}`);
}
catch (error) {
    (0, core_1.setFailed)('something went wrong');
}
