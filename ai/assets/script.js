// DOM Elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const toast = document.getElementById('toast');

// Embedded API Key (obfuscated)
const apiKey = (() => {
  const parts = [
    'sk-or-v1-f96f6d5852ad86e0c2052c6654bec533',
    '06891b536596fad46f3fef71db541cf6'
  ];
  return parts.join('');
})();

// Initialize
function init() {
  messageInput.focus();
  
  setTimeout(() => {
    addMessage('Hello! I\'m MDAi . How can I assist you today?', 'bot');
  }, 1000);
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// // Functions
// function addMessage(content, sender) {
//   const messageDiv = document.createElement('div');
//   messageDiv.className = `message ${sender}`;
  
//   const avatar = document.createElement('div');
//   avatar.className = 'avatar';
//   avatar.innerHTML = sender === 'bot' ? 
//     // '<i class="fas fa-robot"></i>' : 
//     ' <img src="assets/MDAI.png" class="mdai-logo" alt="MustDesktop AI Logo">' : 
//     '<i class="fas fa-user"></i>';
  
//   const contentDiv = document.createElement('div');
//   contentDiv.className = 'content';
  
//   if (sender === 'bot' && content === '...') {
//     const typingDiv = document.createElement('div');
//     typingDiv.className = 'typing-animation';
//     typingDiv.innerHTML = `
//       <div class="dot"></div>
//       <div class="dot"></div>
//       <div class="dot"></div>
//     `;
//     contentDiv.appendChild(typingDiv);
//   } else {
//     // Check if content contains code blocks
//     if (content.includes('```')) {
//       const formattedContent = formatCodeBlocks(content);
//       contentDiv.innerHTML = formattedContent;
//       // Highlight all code blocks
//       contentDiv.querySelectorAll('pre code').forEach((block) => {
//         hljs.highlightElement(block);
//       });
//     } else {
//       contentDiv.textContent = content;
//     }
//   }
  
//   messageDiv.appendChild(avatar);
//   messageDiv.appendChild(contentDiv);
//   messagesContainer.appendChild(messageDiv);
  
//   messagesContainer.scrollTop = messagesContainer.scrollHeight;
// }

// function formatCodeBlocks(text) {
//   // Replace code blocks with proper HTML
//   return text.replace(/```(\w*)([\s\S]*?)```/g, function(match, language, code) {
//     language = language || 'plaintext';
//     return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
//   });
// }
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = sender === 'bot' ? 
      '<img src="assets/MDAI.png" class="mdai-logo" alt="MustDesktop AI Logo">' : 
      '<i class="fas fa-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    
    if (sender === 'bot' && content === '...') {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'typing-animation';
      typingDiv.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      `;
      contentDiv.appendChild(typingDiv);
    } else {
      // Format the content with paragraphs and code blocks
      const formattedContent = formatMessageContent(content);
      contentDiv.innerHTML = formattedContent;
      
      // Highlight all code blocks
      contentDiv.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  function formatMessageContent(text) {
    // First handle code blocks
    let formatted = text.replace(/```(\w*)([\s\S]*?)```/g, function(match, language, code) {
      language = language || 'plaintext';
      return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
    });
  
    // Then handle paragraphs (double newlines)
    formatted = formatted.replace(/\n\n/g, '</p><p>');
    
    // Then handle single newlines (convert to <br>)
    formatted = formatted.replace(/\n(?!\n)/g, '<br>');
    
    // Wrap in paragraph tags if there's any content
    if (formatted.trim().length > 0 && !formatted.startsWith('<p>')) {
      formatted = `<p>${formatted}</p>`;
    }
  
    return formatted;
  }
function showToast(message, isError = false) {
  toast.textContent = message;
  toast.className = isError ? 'toast error' : 'toast success';
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// async function sendMessage() {
//   const message = messageInput.value.trim();
  
//   if (!message) return;
  
//   addMessage(message, 'user');
//   messageInput.value = '';
//   addMessage('...', 'bot');
  
//   try {
//     messageInput.disabled = true;
//     sendBtn.disabled = true;
    
//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//       },
//       body: JSON.stringify({
//         model: 'deepseek/deepseek-r1:free',
//         messages: [{ role: 'user', content: message }],
//         temperature: 0.7,
//         max_tokens: 1000
//       })
//     });
    
//     if (!response.ok) {
//       throw new Error(`API error: ${response.status}`);
//     }
    
//     const data = await response.json();
//     const botResponse = data.choices[0].message.content;
    
//     messagesContainer.removeChild(messagesContainer.lastChild);
//     addMessage(botResponse, 'bot');
    
//   } catch (error) {
//     console.error('Error:', error);
//     messagesContainer.removeChild(messagesContainer.lastChild);
//     addMessage('Sorry, I encountered an error. Please try again.', 'bot');
//     showToast(`Error: ${error.message}`, true);
//   } finally {
//     messageInput.disabled = false;
//     sendBtn.disabled = false;
//     messageInput.focus();
//   }
// }
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    addMessage(message, 'user');
    messageInput.value = '';
    addMessage('...', 'bot');
    
    try {
      messageInput.disabled = true;
      sendBtn.disabled = true;
      
      // Special case for name questions
    //   if (message.toLowerCase().includes('your name') || 
    //       message.toLowerCase().includes('who are you') ||
    //       message.toLowerCase().includes('whats your name')) {

    //     messagesContainer.removeChild(messagesContainer.lastChild);
    //     addMessage('I am MDAi, an Must Desktop Ai.', 'A i');
    //     return;
    //   }
    if (message.toLowerCase().includes('your name') || 
    message.toLowerCase().includes('who are you') ||
    message.toLowerCase().includes('whats your name')) {
  messagesContainer.removeChild(messagesContainer.lastChild);
  addMessage('I am <strong>MDAi</strong>, an AI assistant created by MustDesktop.', 'bot');
  return;
}
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: message }],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const botResponse = data.choices[0].message.content;
      
      messagesContainer.removeChild(messagesContainer.lastChild);
      addMessage(botResponse, 'bot');
      
    } catch (error) {
      console.error('Error:', error);
      messagesContainer.removeChild(messagesContainer.lastChild);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
      showToast(`Error: ${error.message}`, true);
    } finally {
      messageInput.disabled = false;
      sendBtn.disabled = false;
      messageInput.focus();
    }
  }
// Auto-resize textarea
messageInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

init();