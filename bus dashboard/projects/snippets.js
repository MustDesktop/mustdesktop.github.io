


// Predefined code snippets
const snippets = [
    {
        name: "HTML Boilerplate",
        category: "HTML",
        description: "Basic HTML5 template with meta tags",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`
    },
    {
        name: "CSS Reset",
        category: "CSS",
        description: "Simple CSS reset to remove default margins and padding",
        code: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}`
    },
    {
        name: "Flexbox Center",
        category: "CSS",
        description: "Center an element horizontally and vertically using flexbox",
        code: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}`
    },
    {
        name: "Grid Layout",
        category: "CSS",
        description: "Basic CSS Grid layout with 3 columns",
        code: `.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}`
    },
    {
        name: "Button Styling",
        category: "CSS",
        description: "Modern button styling with hover effects",
        code: `.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4a6bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #3a5bef;
}`
    },
    {
        name: "Fetch API",
        category: "JavaScript",
        description: "Example of using Fetch API to get data from a URL",
        code: `fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Process your data here
    })
    .catch(error => {
        console.error('Error:', error);
    });`
    },
    {
        name: "Event Listener",
        category: "JavaScript",
        description: "Add click event listener to an element",
        code: `document.getElementById('myButton').addEventListener('click', function() {
    // Your code here
    console.log('Button clicked!');
});`
    },
    {
        name: "Toggle Class",
        category: "JavaScript",
        description: "Toggle a CSS class on an element",
        code: `document.getElementById('myElement').classList.toggle('active');`
    },
    {
        name: "Local Storage",
        category: "JavaScript",
        description: "Save and retrieve data from localStorage",
        code: `// Save data
localStorage.setItem('key', 'value');

// Get data
const data = localStorage.getItem('key');

// Remove data
localStorage.removeItem('key');`
    },
    {
        name: "Debounce Function",
        category: "JavaScript",
        description: "Debounce function for limiting how often a function is called",
        code: `function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

// Usage:
window.addEventListener('resize', debounce(function() {
    console.log('Window resized');
}, 250));`
    },
    {
        name: "Modal Dialog",
        category: "HTML/CSS",
        description: "Simple modal dialog with HTML and CSS",
        code: `<!-- HTML -->
<button id="openModal">Open Modal</button>

<div class="modal" id="myModal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Modal Title</h2>
        <p>Modal content goes here.</p>
    </div>
</div>

<!-- CSS -->
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 1000;
}

.modal-content {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    width: 80%;
    max-width: 600px;
    border-radius: 5px;
}

.close {
    float: right;
    font-size: 1.5rem;
    cursor: pointer;
}

<!-- JavaScript -->
document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
});`
    },
    {
        name: "Responsive Navbar",
        category: "HTML/CSS",
        description: "Responsive navigation bar with hamburger menu",
        code: `<!-- HTML -->
<nav class="navbar">
    <div class="logo">Logo</div>
    <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
    <div class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    </div>
</nav>

<!-- CSS -->
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
    color: white;
}

.nav-links {
    display: flex;
    list-style: none;
}

.nav-links li a {
    color: white;
    text-decoration: none;
    padding: 0 1rem;
}

.burger {
    display: none;
    cursor: pointer;
}

.burger div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 5px;
    transition: all 0.3s ease;
}

@media screen and (max-width: 768px) {
    .nav-links {
        position: absolute;
        right: 0;
        top: 60px;
        background-color: #333;
        flex-direction: column;
        width: 50%;
        height: calc(100vh - 60px);
        align-items: center;
        transform: translateX(100%);
        transition: transform 0.5s ease-in;
    }
    
    .nav-links.active {
        transform: translateX(0);
    }
    
    .burger {
        display: block;
    }
}

<!-- JavaScript -->
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Burger animation
    burger.classList.toggle('toggle');
});`
    }
];


