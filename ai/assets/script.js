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
//     'sk-or-v1-92774a9ece75d94573fd4a307d8d6b0',
//     '5ff2372ad2c595a45821314f098856e7b'
//     // 'sk-or-v1-087891a8aa3bf60fcd14b98182b82a4',
//     // '4325a64bef1d784e7e12ff70e5d3cf40e'
//     // 'sk-or-v1-cd1055711755787d93d55e84f46bb14',
//     // '5eee3d8ef9b4426fa5426d55efd727ac5'
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
//           model: 'openai/gpt-oss-20b:free',
//           // model: 'deepseek/deepseek-r1:free',
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


// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages');
    const toast = document.getElementById('toast');
    
    // Configuration
    // IMPORTANT: Replace 'YOUR_NEW_OPENROUTER_API_KEY_HERE' with your actual, valid API key.
    const API_KEY = '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';
    const MODEL = 'openai/gpt-oss-20b:free';
    // const MODEL = 'openai/gpt-oss-20b:free';
    
    // Conversation history
    let conversationHistory = [
        {
            role: 'assistant',
            content: 'Hello! I\'m MDAi, your personal assistant. How can I help you today?'
        }
    ];
    
    // Initialize with welcome message
    displayMessage('assistant', conversationHistory[0].content);
    
    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Send message on Enter (Shift+Enter for new line)
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send button click handler
    sendBtn.addEventListener('click', sendMessage);
    
    // Function to send message
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        // Disable input while processing
        messageInput.disabled = true;
        sendBtn.disabled = true;
        
        // Add user message to UI and history
        displayMessage('user', message);
        conversationHistory.push({ role: 'user', content: message });
        
        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Show typing indicator
        const typingIndicator = displayTypingIndicator();
        
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Must Desktop AI'
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: conversationHistory,
                    temperature: 0.7,
                    max_tokens: 2000
                })
            };
            
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', requestOptions);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                let errorMsg = `API Error: ${response.status}`;
                if (errorData.error?.message) {
                    errorMsg += ` - ${errorData.error.message}`;
                }
                if (response.status === 401) {
                    errorMsg = 'Invalid API Key. Please check your configuration.';
                } else if (response.status === 429) {
                    errorMsg = 'Rate limit exceeded. Please wait before sending more messages.';
                }
                
                throw new Error(errorMsg);
            }
            
            const data = await response.json();
            
            if (!data.choices || !data.choices[0]?.message?.content) {
                throw new Error('Invalid response format from API');
            }
            
            const assistantMessage = data.choices[0].message.content;
            
            // Add assistant message to history and UI
            conversationHistory.push({ role: 'assistant', content: assistantMessage });
            
            // Remove typing indicator and display response
            removeTypingIndicator(typingIndicator);
            displayMessage('assistant', assistantMessage);
            
        } catch (error) {
            removeTypingIndicator(typingIndicator);
            
            let toastMessage = 'Error: Failed to get response from AI';
            if (error.message.includes('Invalid API Key')) {
                toastMessage = error.message;
            } else if (error.message.includes('Rate limit')) {
                toastMessage = error.message;
            } else if (error.message.includes('Failed to fetch')) {
                toastMessage = 'Network error. Please check your internet connection.';
            }
            
            showToast(toastMessage, 'error');
            
            // Re-add the user message to allow retry if it's not a permanent error
            if (!toastMessage.includes('Invalid API Key')) {
                conversationHistory.pop();
            }
        } finally {
            // Re-enable input
            messageInput.disabled = false;
            sendBtn.disabled = false;
            messageInput.focus();
        }
    }

    function displayMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        
        if (role === 'assistant') {
            avatarDiv.innerHTML = '<img src="assets/MDAI.png" class="mdai-logo" alt="AI Avatar">';
        } else {
            avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.innerHTML = processMessageContent(content);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        
        // Highlight code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    function processMessageContent(content) {
        // Handle code blocks
        let processed = content.replace(/```(\w*)([\s\S]*?)```/g, 
            (match, lang, code) => `<pre><code class="${lang}">${code.trim()}</code></pre>`);
        
        // Handle line breaks
        processed = processed.replace(/\n/g, '<br>');
        
        return processed;
    }

    function displayTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        avatarDiv.innerHTML = '<img src="assets/MDAI.png" class="mdai-logo" alt="AI Avatar">';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.innerHTML = `
            <div class="typing-animation">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        
        return messageDiv;
    }

    function removeTypingIndicator(indicator) {
        indicator?.remove();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showToast(message, type = 'info') {
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => toast.className = 'toast', 3000);
    }

    // Initial focus
    messageInput.focus();
});





