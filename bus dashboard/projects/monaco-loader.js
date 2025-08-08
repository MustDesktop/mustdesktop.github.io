


// Configure Monaco Editor loader
window.MonacoEnvironment = {
    getWorkerUrl: function(moduleId, label) {
        if (label === 'json') {
            return 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/language/json/json.worker.js';
        }
        if (label === 'css') {
            return 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/language/css/css.worker.js';
        }
        if (label === 'html') {
            return 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/language/html/html.worker.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/language/typescript/ts.worker.js';
        }
        return 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/editor/editor.worker.js';
    }
};

// Register when Monaco is loaded
window.addEventListener('monaco-loaded', function() {
    if (typeof registerMonacoSnippets === 'function') {
        registerMonacoSnippets();
    }
});

// Add custom snippets for Monaco
function registerCustomSnippets() {
    monaco.languages.registerCompletionItemProvider('html', {
        provideCompletionItems: function(model, position) {
            return {
                suggestions: htmlSnippets.map(snippet => ({
                    label: snippet.name,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    documentation: snippet.description,
                    insertText: snippet.code,
                    range: new monaco.Range(
                        position.lineNumber,
                        position.column,
                        position.lineNumber,
                        position.column
                    )
                }))
            };
        }
    });

    monaco.languages.registerCompletionItemProvider('css', {
        provideCompletionItems: function(model, position) {
            return {
                suggestions: cssSnippets.map(snippet => ({
                    label: snippet.name,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    documentation: snippet.description,
                    insertText: snippet.code,
                    range: new monaco.Range(
                        position.lineNumber,
                        position.column,
                        position.lineNumber,
                        position.column
                    )
                }))
            };
        }
    });

    monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: function(model, position) {
            return {
                suggestions: jsSnippets.map(snippet => ({
                    label: snippet.name,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    documentation: snippet.description,
                    insertText: snippet.code,
                    range: new monaco.Range(
                        position.lineNumber,
                        position.column,
                        position.lineNumber,
                        position.column
                    )
                }))
            };
        }
    });
}

// Filter snippets by language
const htmlSnippets = snippets.filter(s => s.category === 'HTML');
const cssSnippets = snippets.filter(s => s.category === 'CSS');
const jsSnippets = snippets.filter(s => s.category === 'JavaScript');

// Register snippets when Monaco is loaded
if (window.monaco) {
    registerCustomSnippets();
} else {
    window.addEventListener('monaco-loaded', registerCustomSnippets);
}