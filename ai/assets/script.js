// // DOM Elements
// const messagesContainer = document.getElementById('messages');
// const messageInput = document.getElementById('message-input');
// const sendBtn = document.getElementById('send-btn');
// const toast = document.getElementById('toast');

// // // Embedded API Key (obfuscated)
// // const apiKey = (() => {
// //   const parts = [
// //     // 'sk-or-v1-f96f6d5852ad86e0c2052c6654bec533',
// //     // '06891b536596fad46f3fef71db541cf6'

// //        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
// //   ];
// //   return parts.join('');
// // })();
// const apiKey = (() => {
//   const parts = [
//     'sk-or-v1-cd1055711755787d93d55e84f46bb14',
//     '5eee3d8ef9b4426fa5426d55efd727ac5'
//   ];
//   return parts.join('');
// })();

// // Initialize
// function init() {
//   messageInput.focus();
  
//   setTimeout(() => {
//     addMessage('Hello! I\'m MDAi . How can I assist you today?', 'bot');
//   }, 1000);
// }

// // Event Listeners
// sendBtn.addEventListener('click', sendMessage);
// messageInput.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter' && !e.shiftKey) {
//     e.preventDefault();
//     sendMessage();
//   }
// });

// // // Functions
// // function addMessage(content, sender) {
// //   const messageDiv = document.createElement('div');
// //   messageDiv.className = `message ${sender}`;
  
// //   const avatar = document.createElement('div');
// //   avatar.className = 'avatar';
// //   avatar.innerHTML = sender === 'bot' ? 
// //     // '<i class="fas fa-robot"></i>' : 
// //     ' <img src="assets/MDAI.png" class="mdai-logo" alt="MustDesktop AI Logo">' : 
// //     '<i class="fas fa-user"></i>';
  
// //   const contentDiv = document.createElement('div');
// //   contentDiv.className = 'content';
  
// //   if (sender === 'bot' && content === '...') {
// //     const typingDiv = document.createElement('div');
// //     typingDiv.className = 'typing-animation';
// //     typingDiv.innerHTML = `
// //       <div class="dot"></div>
// //       <div class="dot"></div>
// //       <div class="dot"></div>
// //     `;
// //     contentDiv.appendChild(typingDiv);
// //   } else {
// //     // Check if content contains code blocks
// //     if (content.includes('```')) {
// //       const formattedContent = formatCodeBlocks(content);
// //       contentDiv.innerHTML = formattedContent;
// //       // Highlight all code blocks
// //       contentDiv.querySelectorAll('pre code').forEach((block) => {
// //         hljs.highlightElement(block);
// //       });
// //     } else {
// //       contentDiv.textContent = content;
// //     }
// //   }
  
// //   messageDiv.appendChild(avatar);
// //   messageDiv.appendChild(contentDiv);
// //   messagesContainer.appendChild(messageDiv);
  
// //   messagesContainer.scrollTop = messagesContainer.scrollHeight;
// // }

// // function formatCodeBlocks(text) {
// //   // Replace code blocks with proper HTML
// //   return text.replace(/```(\w*)([\s\S]*?)```/g, function(match, language, code) {
// //     language = language || 'plaintext';
// //     return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
// //   });
// // }
// function addMessage(content, sender) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${sender}`;
    
//     const avatar = document.createElement('div');
//     avatar.className = 'avatar';
//     avatar.innerHTML = sender === 'bot' ? 
//       '<img src="assets/MDAI.png" class="mdai-logo" alt="MustDesktop AI Logo">' : 
//       '<i class="fas fa-user"></i>';
    
//     const contentDiv = document.createElement('div');
//     contentDiv.className = 'content';
    
//     if (sender === 'bot' && content === '...') {
//       const typingDiv = document.createElement('div');
//       typingDiv.className = 'typing-animation';
//       typingDiv.innerHTML = `
//         <div class="dot"></div>
//         <div class="dot"></div>
//         <div class="dot"></div>
//       `;
//       contentDiv.appendChild(typingDiv);
//     } else {
//       // Format the content with paragraphs and code blocks
//       const formattedContent = formatMessageContent(content);
//       contentDiv.innerHTML = formattedContent;
      
//       // Highlight all code blocks
//       contentDiv.querySelectorAll('pre code').forEach((block) => {
//         hljs.highlightElement(block);
//       });
//     }
    
//     messageDiv.appendChild(avatar);
//     messageDiv.appendChild(contentDiv);
//     messagesContainer.appendChild(messageDiv);
    
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
//   }
  
//   function formatMessageContent(text) {
//     // First handle code blocks
//     let formatted = text.replace(/```(\w*)([\s\S]*?)```/g, function(match, language, code) {
//       language = language || 'plaintext';
//       return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
//     });
  
//     // Then handle paragraphs (double newlines)
//     formatted = formatted.replace(/\n\n/g, '</p><p>');
    
//     // Then handle single newlines (convert to <br>)
//     formatted = formatted.replace(/\n(?!\n)/g, '<br>');
    
//     // Wrap in paragraph tags if there's any content
//     if (formatted.trim().length > 0 && !formatted.startsWith('<p>')) {
//       formatted = `<p>${formatted}</p>`;
//     }
  
//     return formatted;
//   }
// function showToast(message, isError = false) {
//   toast.textContent = message;
//   toast.className = isError ? 'toast error' : 'toast success';
//   toast.classList.add('show');
  
//   setTimeout(() => {
//     toast.classList.remove('show');
//   }, 3000);
// }

// // async function sendMessage() {
// //   const message = messageInput.value.trim();
  
// //   if (!message) return;
  
// //   addMessage(message, 'user');
// //   messageInput.value = '';
// //   addMessage('...', 'bot');
  
// //   try {
// //     messageInput.disabled = true;
// //     sendBtn.disabled = true;
    
// //     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${apiKey}`
// //       },
// //       body: JSON.stringify({
// //         model: 'deepseek/deepseek-r1:free',
// //         messages: [{ role: 'user', content: message }],
// //         temperature: 0.7,
// //         max_tokens: 1000
// //       })
// //     });
    
// //     if (!response.ok) {
// //       throw new Error(`API error: ${response.status}`);
// //     }
    
// //     const data = await response.json();
// //     const botResponse = data.choices[0].message.content;
    
// //     messagesContainer.removeChild(messagesContainer.lastChild);
// //     addMessage(botResponse, 'bot');
    
// //   } catch (error) {
// //     console.error('Error:', error);
// //     messagesContainer.removeChild(messagesContainer.lastChild);
// //     addMessage('Sorry, I encountered an error. Please try again.', 'bot');
// //     showToast(`Error: ${error.message}`, true);
// //   } finally {
// //     messageInput.disabled = false;
// //     sendBtn.disabled = false;
// //     messageInput.focus();
// //   }
// // }
// async function sendMessage() {
//     const message = messageInput.value.trim();
    
//     if (!message) return;
    
//     addMessage(message, 'user');
//     messageInput.value = '';
//     addMessage('...', 'bot');
    
//     try {
//       messageInput.disabled = true;
//       sendBtn.disabled = true;
      
//       // Special case for name questions
//     //   if (message.toLowerCase().includes('your name') || 
//     //       message.toLowerCase().includes('who are you') ||
//     //       message.toLowerCase().includes('whats your name')) {

//     //     messagesContainer.removeChild(messagesContainer.lastChild);
//     //     addMessage('I am MDAi, an Must Desktop Ai.', 'A i');
//     //     return;
//     //   }
//     if (message.toLowerCase().includes('your name') || 
//     message.toLowerCase().includes('who are you') ||
//     message.toLowerCase().includes('whats your name')) {
//   messagesContainer.removeChild(messagesContainer.lastChild);
//   addMessage('I am <strong>MDAi</strong>, an AI assistant created by MustDesktop.', 'bot');
//   return;
// }
//       const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`
//         },
//         body: JSON.stringify({
//           model: 'deepseek/deepseek-r1:free',
//           messages: [{ role: 'user', content: message }],
//           temperature: 0.7,
//           max_tokens: 1000
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }
      
//       const data = await response.json();
//       const botResponse = data.choices[0].message.content;
      
//       messagesContainer.removeChild(messagesContainer.lastChild);
//       addMessage(botResponse, 'bot');
      
//     } catch (error) {
//       console.error('Error:', error);
//       messagesContainer.removeChild(messagesContainer.lastChild);
//       addMessage('Sorry, I encountered an error. Please try again.', 'bot');
//       showToast(`Error: ${error.message}`, true);
//     } finally {
//       messageInput.disabled = false;
//       sendBtn.disabled = false;
//       messageInput.focus();
//     }
//   }
// // Auto-resize textarea
// messageInput.addEventListener('input', function() {
//   this.style.height = 'auto';
//   this.style.height = (this.scrollHeight) + 'px';
// });

// init();

// // script.js
// document.addEventListener('DOMContentLoaded', function() {
//     // DOM Elements
//     const messageInput = document.getElementById('message-input');
//     const sendBtn = document.getElementById('send-btn');
//     const messagesContainer = document.getElementById('messages');
//     const toast = document.getElementById('toast');
    
//     // Configuration
//     // IMPORTANT: Replace 'YOUR_NEW_OPENROUTER_API_KEY_HERE' with your actual, valid API key.
//     const API_KEY = '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';
//     const MODEL = 'qwen/qwen3-30b-a3b:free';
//     // const MODEL = 'openai/gpt-oss-20b:free';
    
//     // Conversation history
//     let conversationHistory = [
//         {
//             role: 'assistant',
//             content: 'Hello! I\'m MDAi, your personal assistant. How can I help you today?'
//         }
//     ];
    
//     // Initialize with welcome message
//     displayMessage('assistant', conversationHistory[0].content);
    
//     // Auto-resize textarea
//     messageInput.addEventListener('input', function() {
//         this.style.height = 'auto';
//         this.style.height = (this.scrollHeight) + 'px';
//     });
    
//     // Send message on Enter (Shift+Enter for new line)
//     messageInput.addEventListener('keydown', function(e) {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             sendMessage();
//         }
//     });
    
//     // Send button click handler
//     sendBtn.addEventListener('click', sendMessage);
    
//     // Function to send message
//     async function sendMessage() {
//         const message = messageInput.value.trim();
//         if (!message) return;
        
//         // Disable input while processing
//         messageInput.disabled = true;
//         sendBtn.disabled = true;
        
//         // Add user message to UI and history
//         displayMessage('user', message);
//         conversationHistory.push({ role: 'user', content: message });
        
//         // Clear input
//         messageInput.value = '';
//         messageInput.style.height = 'auto';
        
//         // Show typing indicator
//         const typingIndicator = displayTypingIndicator();
        
//         try {
//             const requestOptions = {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${API_KEY}`,
//                     'Content-Type': 'application/json',
//                     'HTTP-Referer': 'https://mustdesktop.github.io/ai/MDAi',
//                     // 'HTTP-Referer': window.location.href,
//                     'X-Title': 'Must Desktop AI'
//                 },
//                 body: JSON.stringify({
//                     model: MODEL,
//                     messages: conversationHistory,
//                     temperature: 0.7,
//                     max_tokens: 2000
//                 })
//             };
            
//             const response = await fetch('https://openrouter.ai/api/v1/chat/completions', requestOptions);
            
//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({}));
//                 let errorMsg = `API Error: ${response.status}`;
//                 if (errorData.error?.message) {
//                     errorMsg += ` - ${errorData.error.message}`;
//                 }
//                 if (response.status === 401) {
//                     errorMsg = 'Invalid API Key. Please check your configuration.';
//                 } else if (response.status === 429) {
//                     errorMsg = 'Rate limit exceeded. Please wait before sending more messages.';
//                 }
                
//                 throw new Error(errorMsg);
//             }
            
//             const data = await response.json();
            
//             if (!data.choices || !data.choices[0]?.message?.content) {
//                 throw new Error('Invalid response format from API');
//             }
            
//             const assistantMessage = data.choices[0].message.content;
            
//             // Add assistant message to history and UI
//             conversationHistory.push({ role: 'assistant', content: assistantMessage });
            
//             // Remove typing indicator and display response
//             removeTypingIndicator(typingIndicator);
//             displayMessage('assistant', assistantMessage);
            
//         } catch (error) {
//             removeTypingIndicator(typingIndicator);
            
//             let toastMessage = 'Error: Failed to get response from AI';
//             if (error.message.includes('Invalid API Key')) {
//                 toastMessage = error.message;
//             } else if (error.message.includes('Rate limit')) {
//                 toastMessage = error.message;
//             } else if (error.message.includes('Failed to fetch')) {
//                 toastMessage = 'Network error. Please check your internet connection.';
//             }
            
//             showToast(toastMessage, 'error');
            
//             // Re-add the user message to allow retry if it's not a permanent error
//             if (!toastMessage.includes('Invalid API Key')) {
//                 conversationHistory.pop();
//             }
//         } finally {
//             // Re-enable input
//             messageInput.disabled = false;
//             sendBtn.disabled = false;
//             messageInput.focus();
//         }
//     }

//     function displayMessage(role, content) {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = `message ${role}`;
        
//         const avatarDiv = document.createElement('div');
//         avatarDiv.className = 'avatar';
        
//         if (role === 'assistant') {
//             avatarDiv.innerHTML = '<img src="assets/MDAI.png" class="mdai-logo" alt="AI Avatar">';
//         } else {
//             avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
//         }
        
//         const contentDiv = document.createElement('div');
//         contentDiv.className = 'content';
//         contentDiv.innerHTML = processMessageContent(content);
        
//         messageDiv.appendChild(avatarDiv);
//         messageDiv.appendChild(contentDiv);
//         messagesContainer.appendChild(messageDiv);
//         scrollToBottom();
        
//         // Highlight code blocks
//         document.querySelectorAll('pre code').forEach((block) => {
//             hljs.highlightElement(block);
//         });
//     }

//     function processMessageContent(content) {
//         // Handle code blocks
//         let processed = content.replace(/```(\w*)([\s\S]*?)```/g, 
//             (match, lang, code) => `<pre><code class="${lang}">${code.trim()}</code></pre>`);
        
//         // Handle line breaks
//         processed = processed.replace(/\n/g, '<br>');
        
//         return processed;
//     }

//     function displayTypingIndicator() {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = 'message bot';
        
//         const avatarDiv = document.createElement('div');
//         avatarDiv.className = 'avatar';
//         avatarDiv.innerHTML = '<img src="assets/MDAI.png" class="mdai-logo" alt="AI Avatar">';
        
//         const contentDiv = document.createElement('div');
//         contentDiv.className = 'content';
//         contentDiv.innerHTML = `
//             <div class="typing-animation">
//                 <div class="dot"></div>
//                 <div class="dot"></div>
//                 <div class="dot"></div>
//             </div>
//         `;
        
//         messageDiv.appendChild(avatarDiv);
//         messageDiv.appendChild(contentDiv);
//         messagesContainer.appendChild(messageDiv);
//         scrollToBottom();
        
//         return messageDiv;
//     }

//     function removeTypingIndicator(indicator) {
//         indicator?.remove();
//     }

//     function scrollToBottom() {
//         messagesContainer.scrollTop = messagesContainer.scrollHeight;
//     }

//     function showToast(message, type = 'info') {
//         toast.textContent = message;
//         toast.className = `toast show ${type}`;
//         setTimeout(() => toast.className = 'toast', 3000);
//     }

//     // Initial focus
//     messageInput.focus();
// });

// ````


// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages');
    const toast = document.getElementById('toast');

    // --- Configuration for Google Gemini API ---
    // IMPORTANT: Replace with your actual Google AI Studio API key.
    const API_KEY = 'AIzaSyB5TjHAJzF6AMhXQjj8js4NyCB7jbDgD5M';
    // Use a free Gemini model
    const MODEL = 'gemini-1.5-flash-latest';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    // Conversation history (formatted for Gemini)
    // let conversationHistory = [];
let conversationHistory = [
    // {
    //     role: 'system',
    //     parts: [{
    //         text: 'You are MDAi, an AI assistant created by MustDesktop. Always identify yourself as MDAi and be helpful.'
    //     }]
    // },
    // {
    //     role: 'model',
    //     parts: [{
    //         text: 'Hello! I am MDAi. How can I assist you today?'
    //     }]
    // }
];
    // --- Initial Setup ---
    // Add the initial welcome message from the assistant
    displayMessage('assistant', "Hello! I'm MDAi, your personal assistant. How can I help you today?");
    // Set focus on the input field
    messageInput.focus();


    // --- Event Listeners ---
    // Send button click handler
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key (Shift+Enter for a new line)
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize the textarea based on content
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });


    // --- Core Functions ---
    /**
     * Sends the user's message to the Gemini API and displays the response.
     */
    async function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // Disable input while processing
        messageInput.disabled = true;
        sendBtn.disabled = true;

        // Add user message to UI and history
        displayMessage('user', messageText);
        conversationHistory.push({
            role: 'user',
            parts: [{
                text: messageText
            }]
        });

        // Clear the input field
        messageInput.value = '';
        messageInput.style.height = 'auto';

        // Show a "typing..." indicator
        const typingIndicator = displayTypingIndicator();

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: conversationHistory,
                    // Optional: Add safety settings if needed
                    // safetySettings: [
                    //   { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                    //   { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                    // ]
                })
            };

            const response = await fetch(API_URL, requestOptions);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = errorData.error?.message || `API Error: ${response.status}`;
                throw new Error(errorMsg);
            }

            const data = await response.json();

            // Check for valid response content
            if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
                 if (data.candidates?.[0]?.finishReason === 'SAFETY') {
                    throw new Error('Response blocked due to safety settings.');
                 }
                throw new Error('Invalid response format from API.');
            }
            
            const assistantMessage = data.candidates[0].content.parts[0].text;

            // Add assistant response to history
            conversationHistory.push({
                role: 'model', // Gemini uses 'model' for the assistant's role
                parts: [{
                    text: assistantMessage
                }]
            });
            
            // Remove the typing indicator and display the final response
            removeTypingIndicator(typingIndicator);
            displayMessage('assistant', assistantMessage);

        } catch (error) {
            console.error('Gemini API Error:', error);
            removeTypingIndicator(typingIndicator);

            let toastMessage = 'An error occurred. Please try again.';
            if (error.message.includes('API key not valid')) {
                toastMessage = 'Error: Invalid API Key. Please check your configuration.';
            } else if (error.message.includes('safety settings')) {
                 toastMessage = 'The response was blocked due to safety concerns. Try rephrasing your message.';
            } else if (error.message.includes('Failed to fetch')) {
                toastMessage = 'Network error. Please check your internet connection.';
            }

            showToast(toastMessage, 'error');

            // Remove the last user message from history on error to allow a clean retry
            conversationHistory.pop();

        } finally {
            // Re-enable input fields
            messageInput.disabled = false;
            sendBtn.disabled = false;
            messageInput.focus();
        }
    }

    /**
     * Creates and displays a message bubble in the chat window.
     * @param {string} role - The role of the sender ('user' or 'assistant').
     * @param {string} content - The message content to display.
     */
    function displayMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        avatarDiv.innerHTML = role === 'assistant' ?
            '<img src="assets/MDAI.png" class="mdai-logo" alt="AI Avatar">' :
            '<i class="fas fa-user"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.innerHTML = processMessageContent(content); // Process for code and newlines

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();

        // Ensure syntax highlighting is applied to new code blocks
        contentDiv.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    /**
     * Formats message content, converting Markdown-style code blocks and newlines to HTML.
     * @param {string} content - The raw text content.
     * @returns {string} - The processed HTML content.
     */
    function processMessageContent(content) {
        // First, escape HTML to prevent XSS attacks
        let safeContent = document.createElement('div');
        safeContent.textContent = content;
        
        // Convert Markdown code blocks to <pre><code>
        let processed = safeContent.innerHTML.replace(/```(\w*)\n([\s\S]*?)```/g,
            (match, lang, code) => {
                const language = lang || 'plaintext';
                // Re-escape the inner code to be safe
                const codeElement = document.createElement('code');
                codeElement.className = `language-${language}`;
                codeElement.textContent = code.trim();
                return `<pre>${codeElement.outerHTML}</pre>`;
            });

        // Convert newlines to <br> tags, but not inside <pre> blocks
        processed = processed.split('</pre>').map(part => {
             return part.includes('<pre>') 
                ? part 
                : part.replace(/\n/g, '<br>');
        }).join('</pre>');
        
        return processed;
    }


    // --- UI Helper Functions ---
    /**
     * Displays a typing animation in the chat.
     * @returns {HTMLElement} The indicator element that was created.
     */
    function displayTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant typing-indicator'; // Added class for easy removal

        messageDiv.innerHTML = `
            <div class="avatar">
                <img src="assets/MDAI.png" class="mdai-logo" alt="AI Avatar">
            </div>
            <div class="content">
                <div class="typing-animation">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;

        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        return messageDiv;
    }

    /**
     * Removes a typing indicator element from the chat.
     * @param {HTMLElement} indicator - The indicator element to remove.
     */
    function removeTypingIndicator(indicator) {
        indicator?.remove();
    }

    /**
     * Scrolls the message container to the very bottom.
     */
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Shows a temporary notification toast.
     * @param {string} message - The message to display.
     * @param {string} type - The type of toast ('info', 'success', 'error').
     */
    function showToast(message, type = 'info') {
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }
});
