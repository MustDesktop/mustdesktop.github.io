document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const runBtn = document.getElementById('run-btn');
    const saveBtn = document.getElementById('save-btn');
    const snippetsBtn = document.getElementById('snippets-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const previewFrame = document.getElementById('preview-frame');
    const consoleOutput = document.getElementById('console-output');
    const toggleConsoleBtn = document.getElementById('toggle-console');
    const consoleContainer = document.querySelector('.console-container');
    const resizeButtons = document.querySelectorAll('.resize-btn');
    const resizer = document.getElementById('resizer');
    const newFileBtn = document.getElementById('new-file');
    const newFileSidebarBtn = document.getElementById('new-file-sidebar');
    const uploadFileBtn = document.getElementById('upload-file');
    const fileInput = document.getElementById('file-input');
    const exportProjectBtn = document.getElementById('export-project');
    const fileTree = document.getElementById('file-tree');
    const editorTabs = document.getElementById('editor-tabs');
    const editorContent = document.getElementById('editor-content');
    
    // Modals
    const snippetsModal = document.getElementById('snippets-modal');
    const settingsModal = document.getElementById('settings-modal');
    const newFileModal = document.getElementById('new-file-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Monaco Editor instances
    let monacoEditors = {};
    let activeEditor = null;
    let currentFiles = {};
    
    // Initialize the app
    initApp();
    
    function loadSnippets() {
        const categoriesContainer = document.getElementById('snippets-categories');
        const snippetsList = document.getElementById('snippets-list');
        const snippetTitle = document.getElementById('snippet-title');
        const snippetDescription = document.getElementById('snippet-description');
        const snippetCode = document.getElementById('snippet-code');
        const insertSnippetBtn = document.getElementById('insert-snippet');

        let selectedSnippet = null;

        // Render snippets based on category
        function renderSnippets(category) {
            snippetsList.innerHTML = '';
            const filteredSnippets = category === 'all' ? snippets : snippets.filter(s => s.category === category);

            filteredSnippets.forEach(snippet => {
                const snippetItem = document.createElement('div');
                snippetItem.className = 'snippet-item';
                snippetItem.textContent = snippet.name;
                snippetItem.addEventListener('click', () => {
                    // Update active snippet
                    document.querySelectorAll('.snippet-item').forEach(item => item.classList.remove('active'));
                    snippetItem.classList.add('active');
                    selectedSnippet = snippet;

                    // Update preview
                    snippetTitle.textContent = snippet.name;
                    snippetDescription.textContent = snippet.description;
                    snippetCode.textContent = snippet.code;
                });
                snippetsList.appendChild(snippetItem);
            });

            // Select first snippet if available
            if (filteredSnippets.length > 0) {
                snippetsList.firstChild.click();
            } else {
                snippetTitle.textContent = 'No snippets available';
                snippetDescription.textContent = '';
                snippetCode.textContent = '';
                selectedSnippet = null;
            }
        }

        // Initialize with 'all' category
        renderSnippets('all');

        // Category buttons
        categoriesContainer.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                categoriesContainer.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderSnippets(button.getAttribute('data-category'));
            });
        });

        // Insert snippet
        insertSnippetBtn.addEventListener('click', () => {
            if (selectedSnippet && activeEditor && monacoEditors[activeEditor]) {
                const editor = monacoEditors[activeEditor];
                const position = editor.getPosition();
                editor.executeEdits('', [{
                    range: new monaco.Range(
                        position.lineNumber,
                        position.column,
                        position.lineNumber,
                        position.column
                    ),
                    text: selectedSnippet.code
                }]);
                snippetsModal.classList.remove('active');
            }
        });
    }

    function loadSettings() {
        const fontSizeSlider = document.getElementById('font-size');
        const fontSizeValue = document.getElementById('font-size-value');
        const tabSizeInput = document.getElementById('tab-size');
        const lineNumbersCheckbox = document.getElementById('line-numbers');
        const autoRunCheckbox = document.getElementById('auto-run');
        const saveSettingsBtn = document.getElementById('save-settings');

        // Update font size display
        fontSizeSlider.addEventListener('input', () => {
            fontSizeValue.textContent = `${fontSizeSlider.value}px`;
        });

        // Save settings
        saveSettingsBtn.addEventListener('click', () => {
            Object.values(monacoEditors).forEach(editor => {
                editor.updateOptions({
                    fontSize: parseInt(fontSizeSlider.value),
                    tabSize: parseInt(tabSizeInput.value),
                    lineNumbers: lineNumbersCheckbox.checked ? 'on' : 'off'
                });
            });
            settingsModal.classList.remove('active');
        });
    }

    function initApp() {
        // Initialize Monaco Editor
        initMonaco().then(() => {
            // Create default files
            createFile('index.html', 'html', defaultHTML);
            createFile('style.css', 'css', defaultCSS);
            createFile('script.js', 'js', defaultJS);
            
            // Set active file
            setActiveFile('index.html');
            
            // Run initial code
            runCode();
        }).catch(error => {
            console.error('Failed to initialize Monaco Editor:', error);
            alert('Error loading Monaco Editor. Please check your internet connection or try again later.');
        });
        
        // Load settings
        loadSettings();
        
        // Set up event listeners
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Run code
        runBtn.addEventListener('click', runCode);
        
        // Console toggle
        toggleConsoleBtn.addEventListener('click', function() {
            consoleContainer.classList.toggle('collapsed');
            const icon = toggleConsoleBtn.querySelector('i');
            if (consoleContainer.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
        
        // Preview resize buttons
        resizeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const size = this.getAttribute('data-size');
                
                // Update active button
                resizeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Resize preview
                resizePreview(size);
            });
        });
        
        // Resizer functionality
        setupResizer();
        
        // File tree interactions
        fileTree.addEventListener('click', function(e) {
            const fileItem = e.target.closest('.file-item');
            if (fileItem) {
                const filename = fileItem.getAttribute('data-file');
                setActiveFile(filename);
            }
        });
        
        // Tab interactions
        editorTabs.addEventListener('click', function(e) {
            // Tab click
            const tab = e.target.closest('.tab');
            if (tab) {
                const filename = tab.getAttribute('data-tab');
                setActiveFile(filename);
            }
            
            // Close tab button
            const closeBtn = e.target.closest('.close-tab');
            if (closeBtn) {
                const tab = closeBtn.closest('.tab');
                const filename = tab.getAttribute('data-tab');
                closeFile(filename);
                e.stopPropagation();
            }
        });
        
        // New file buttons
        newFileBtn.addEventListener('click', openNewFileModal);
        newFileSidebarBtn.addEventListener('click', openNewFileModal);
        
        // Upload file
        uploadFileBtn.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', handleFileUpload);
        
        // Export project
        exportProjectBtn.addEventListener('click', exportProject);
        
        // Modals
        snippetsBtn.addEventListener('click', function() {
            snippetsModal.classList.add('active');
            loadSnippets();
        });
        
        settingsBtn.addEventListener('click', function() {
            settingsModal.classList.add('active');
            loadSettings();
        });
        
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.modal').classList.remove('active');
            });
        });
        
        // New file modal
        document.getElementById('create-file').addEventListener('click', createNewFileFromModal);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+Enter to run code
            if (e.ctrlKey && e.key === 'Enter') {
                runCode();
            }
            
            // Ctrl+S to save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                saveCurrentFile();
            }
            
            // Ctrl+N to create new file
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                openNewFileModal();
            }
            
            // Ctrl+Space for snippets
            if (e.ctrlKey && e.key === ' ') {
                e.preventDefault();
                snippetsModal.classList.add('active');
                loadSnippets();
            }
        });
    }
    
    function initMonaco() {
        return new Promise((resolve, reject) => {
            require.config({ 
                paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' },
                'vs/nls': { availableLanguages: { '*': '' } }
            });
            
            require(['vs/editor/editor.main'], function() {
                if (typeof monaco === 'undefined') {
                    reject(new Error('Monaco Editor failed to load'));
                    return;
                }
                window.dispatchEvent(new Event('monaco-loaded'));
                resolve();
            }, function(err) {
                reject(new Error('Failed to load Monaco Editor: ' + err));
            });
        });
    }
    
    function createFile(filename, fileType, content) {
        if (!document.querySelector(`.file-item[data-file="${filename}"]`)) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.setAttribute('data-file', filename);
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-file-code';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = filename;
            
            fileItem.appendChild(icon);
            fileItem.appendChild(nameSpan);
            fileTree.appendChild(fileItem);
        }
        
        if (!monacoEditors[filename]) {
            const editorContainer = document.createElement('div');
            editorContainer.className = 'monaco-editor-container';
            editorContainer.id = `editor-${filename}`;
            editorContainer.style.display = 'none';
            editorContainer.style.width = '100%';
            editorContainer.style.height = '100%';
            editorContent.appendChild(editorContainer);
            
            let language;
            if (filename.endsWith('.html')) language = 'html';
            else if (filename.endsWith('.css')) language = 'css';
            else if (filename.endsWith('.js')) language = 'javascript';
            else language = 'plaintext';
            
            try {
                monacoEditors[filename] = monaco.editor.create(editorContainer, {
                    value: content,
                    language: language,
                    theme: 'vs-dark',
                    automaticLayout: true,
                    minimap: { enabled: false },
                    fontSize: parseInt(document.getElementById('font-size')?.value || 14),
                    tabSize: parseInt(document.getElementById('tab-size')?.value || 2),
                    lineNumbers: document.getElementById('line-numbers')?.checked ? 'on' : 'off',
                    suggest: {
                        snippetsPreventQuickSuggestions: false
                    }
                });
            } catch (error) {
                console.error(`Failed to create editor for ${filename}:`, error);
                alert(`Error creating editor for ${filename}. Please try again.`);
                return;
            }
            
            currentFiles[filename] = {
                type: fileType,
                content: content,
                language: language
            };
            
            monacoEditors[filename].onDidChangeModelContent(() => {
                currentFiles[filename].content = monacoEditors[filename].getValue();
                if (document.getElementById('auto-run')?.checked && ['index.html', 'style.css', 'script.js'].includes(filename)) {
                    runCode();
                }
            });
        }
        
        if (!document.querySelector(`.tab[data-tab="${filename}"]`)) {
            const tab = document.createElement('div');
            tab.className = 'tab';
            tab.setAttribute('data-tab', filename);
            
            const icon = document.createElement('i');
            if (filename.endsWith('.html')) icon.className = 'fab fa-html5';
            else if (filename.endsWith('.css')) icon.className = 'fab fa-css3-alt';
            else if (filename.endsWith('.js')) icon.className = 'fab fa-js';
            else icon.className = 'fas fa-file-code';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = filename;
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-tab';
            closeBtn.innerHTML = '×';
            
            tab.appendChild(icon);
            tab.appendChild(nameSpan);
            tab.appendChild(closeBtn);
            editorTabs.appendChild(tab);
        }
    }
    
    function setActiveFile(filename) {
        document.querySelectorAll('.file-item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-file') === filename);
        });
        
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-tab') === filename);
        });
        
        Object.keys(monacoEditors).forEach(key => {
            const editorElement = document.getElementById(`editor-${key}`);
            if (editorElement) {
                editorElement.style.display = key === filename ? 'block' : 'none';
                if (key === filename && monacoEditors[key]) {
                    monacoEditors[key].layout();
                    monacoEditors[key].focus();
                }
            }
        });
        
        activeEditor = filename;
    }
    
    function closeFile(filename) {
        if (Object.keys(monacoEditors).length <= 1) return;
        
        const tab = document.querySelector(`.tab[data-tab="${filename}"]`);
        if (tab) tab.remove();
        
        if (activeEditor === filename) {
            const remainingFiles = Object.keys(monacoEditors).filter(f => f !== filename);
            setActiveFile(remainingFiles[0]);
        }
        
        if (monacoEditors[filename]) {
            monacoEditors[filename].dispose();
            delete monacoEditors[filename];
        }
        
        const fileItem = document.querySelector(`.file-item[data-file="${filename}"]`);
        if (fileItem) fileItem.remove();
        
        delete currentFiles[filename];
    }
    
    function runCode() {
        const htmlCode = currentFiles['index.html']?.content || '';
        const cssCode = currentFiles['style.css']?.content || '';
        const jsCode = currentFiles['script.js']?.content || '';
        
        consoleOutput.innerHTML = '';
        
        const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        previewDoc.open();
        previewDoc.write(htmlCode);
        previewDoc.close();
        
        setTimeout(() => {
            const styleTag = previewDoc.getElementById('compiled-css');
            const scriptTag = previewDoc.getElementById('compiled-js');
            
            if (styleTag) styleTag.innerHTML = cssCode;
            if (scriptTag) scriptTag.innerHTML = jsCode;
            
            const frameWindow = previewFrame.contentWindow;
            frameWindow.console.log = function(message) {
                consoleOutput.innerHTML += `<div class="console-message">${message}</div>`;
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            };
            
            frameWindow.console.error = function(message) {
                consoleOutput.innerHTML += `<div class="console-error">${message}</div>`;
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            };
            
            try {
                frameWindow.eval(jsCode);
            } catch (error) {
                consoleOutput.innerHTML += `<div class="console-error">${error}</div>`;
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            }
        }, 100);
    }
    
    function resizePreview(size) {
        const previewFrame = document.getElementById('preview-frame');
        previewFrame.style.width = size === 'full' ? '100%' : '100%';
        previewFrame.style.height = size === 'full' ? '100%' : '100%';
        
        if (size === 'small') {
            previewFrame.style.maxWidth = '400px';
            previewFrame.style.margin = '0 auto';
            previewFrame.style.border = '1px solid #ddd';
            previewFrame.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        } else if (size === 'medium') {
            previewFrame.style.maxWidth = '800px';
            previewFrame.style.margin = '0 auto';
            previewFrame.style.border = '1px solid #ddd';
            previewFrame.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        } else if (size === 'large') {
            previewFrame.style.maxWidth = '1200px';
            previewFrame.style.margin = '0 auto';
            previewFrame.style.border = '1px solid #ddd';
            previewFrame.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        } else {
            previewFrame.style.maxWidth = 'none';
            previewFrame.style.margin = '0';
            previewFrame.style.border = 'none';
            previewFrame.style.boxShadow = 'none';
        }
    }
    
    // function setupResizer() {
    //     let isResizing = false;
    //     const mainContainer = document.querySelector('.main-container');
    //     const editorContainer = document.querySelector('.editor-container');
    //     const previewContainer = document.querySelector('.preview-container');
    //     const resizerWidth = resizer.offsetWidth; // Account for resizer width
        
    //     resizer.addEventListener('mousedown', function(e) {
    //         isResizing = true;
    //         document.body.style.cursor = 'col-resize';
    //         e.preventDefault();
    //     });
        
    //     document.addEventListener('mousemove', function(e) {
    //         if (!isResizing) return;
            
    //         const mainRect = mainContainer.getBoundingClientRect();
    //         const sidebarWidth = document.querySelector('.sidebar').offsetWidth;
    //         const mouseX = e.clientX - mainRect.left - sidebarWidth; // Adjust for sidebar
    //         const containerWidth = mainRect.width - sidebarWidth - resizerWidth;
            
    //         // Calculate editor width as a percentage, with min/max constraints
    //         let editorWidthPercent = (mouseX / containerWidth) * 100;
    //         editorWidthPercent = Math.max(20, Math.min(80, editorWidthPercent)); // Min 20%, max 80%
            
    //         // Update widths
    //         editorContainer.style.width = `${editorWidthPercent}%`;
    //         previewContainer.style.width = `calc(${100 - editorWidthPercent}% - ${resizerWidth}px)`;
            
    //         // Force editor layout update
    //         Object.values(monacoEditors).forEach(editor => {
    //             editor.layout();
    //         });
    //     });
        
    //     document.addEventListener('mouseup', function() {
    //         if (isResizing) {
    //             isResizing = false;
    //             document.body.style.cursor = '';
    //         }
    //     });
        // Update the setupResizer function to this:
function setupResizer() {
    let isResizing = false;
    const mainContainer = document.querySelector('.main-container');
    const editorContainer = document.querySelector('.editor-container');
    const previewContainer = document.querySelector('.preview-container');
    const resizer = document.getElementById('resizer');
    
    resizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        
        const containerRect = mainContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const sidebarWidth = document.querySelector('.sidebar').offsetWidth;
        
        // Calculate new width based on mouse position
        let newEditorWidth = e.clientX - containerRect.left - sidebarWidth;
        
        // Apply constraints (min 20%, max 80%)
        const minWidth = containerWidth * 0.2;
        const maxWidth = containerWidth * 0.8;
        newEditorWidth = Math.max(minWidth, Math.min(maxWidth, newEditorWidth));
        
        // Set new widths
        editorContainer.style.width = `${newEditorWidth}px`;
        previewContainer.style.width = `calc(100% - ${sidebarWidth + newEditorWidth}px)`;
        
        // Force editor layout update
        Object.values(monacoEditors).forEach(editor => {
            editor.layout();
        });
    });
    
    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });
    
    // Initialize default sizes
    editorContainer.style.width = '50%';
    previewContainer.style.width = 'calc(50% - 5px)';

        // Prevent text selection during resizing
        document.addEventListener('selectstart', function(e) {
            if (isResizing) e.preventDefault();
        });
    }
    
    function openNewFileModal() {
        document.getElementById('new-filename').value = '';
        document.getElementById('file-type').value = 'html';
        newFileModal.classList.add('active');
    }
    
    function createNewFileFromModal() {
        const filename = document.getElementById('new-filename').value.trim();
        const fileType = document.getElementById('file-type').value;
        
        if (!filename) {
            alert('Please enter a filename');
            return;
        }
        
        let finalFilename = filename;
        if (!filename.includes('.')) {
            if (fileType === 'html') finalFilename += '.html';
            else if (fileType === 'css') finalFilename += '.css';
            else if (fileType === 'js') finalFilename += '.js';
        }
        
        if (currentFiles[finalFilename]) {
            alert('A file with that name already exists');
            return;
        }
        
        createFile(finalFilename, fileType, '');
        setActiveFile(finalFilename);
        
        newFileModal.classList.remove('active');
    }
    
    function handleFileUpload(e) {
        const files = e.target.files;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const content = e.target.result;
                const fileType = file.name.split('.').pop();
                
                createFile(file.name, fileType, content);
                
                if (['html', 'css', 'js'].includes(fileType)) {
                    setActiveFile(file.name);
                }
            };
            
            reader.readAsText(file);
        }
        
        fileInput.value = '';
    }
    
    function exportProject() {
        const zip = new JSZip();
        
        Object.keys(currentFiles).forEach(filename => {
            zip.file(filename, currentFiles[filename].content);
        });
        
        zip.generateAsync({ type: 'blob' }).then(function(content) {
            const a = document.createElement('a');
            const url = URL.createObjectURL(content);
            a.href = url;
            a.download = 'codeplayground-project.zip';
            document.body.appendChild(a);
            a.click();
            
            setTimeout(function() {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 0);
        });
    }
    
    function saveCurrentFile() {
        if (!activeEditor) return;
        
        const content = monacoEditors[activeEditor].getValue();
        currentFiles[activeEditor].content = content;
        
        const a = document.createElement('a');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = activeEditor;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(function() {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
    
    const defaultHTML = `<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
    <style id="compiled-css"></style>
</head>
<body>
    <h1>Hello, Code Craft!</h1>
    <p>Start coding here😉👍...</p>
    <script id="compiled-js"></script>
</body>
</html>`;

    const defaultCSS = `h1 {
    color: #4a6bff;
    text-align: center;
    margin-top: 50px;
        font-family: Arial, Helvetica, sans-serif;

}

p {
    text-align: center;
    color: #666;
    font-size: 1.2rem;
        font-family: Arial, Helvetica, sans-serif;

}`;

    const defaultJS = `console.log('Hello from JavaScript!');

document.querySelector('h1').addEventListener('click', function() {
    this.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
});`;
});


monacoEditors[filename] = monaco.editor.create(editorContainer, {
    value: content,
    language: language,
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: parseInt(document.getElementById('font-size')?.value || 14),
    tabSize: parseInt(document.getElementById('tab-size')?.value || 2),
    lineNumbers: document.getElementById('line-numbers')?.checked ? 'on' : 'off',
    suggest: {
        snippetsPreventQuickSuggestions: false
    },
    snippetSuggestions: 'top', // Show snippets at the top of suggestions
    quickSuggestions: {
        other: true,
        comments: false,
        strings: true
    }
});