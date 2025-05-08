# Splendor

A full stack end-to-end implementation of the board game Splendor

**Code Structure Overview**

```
.
├── backend
│   ├── psychache
│   ├── app
│   ├── cards.py              # stores all card data
│   ├── key.json
│   └── run_multiplayer.py    # holds all game logic and socket functionality
├── splendor                  # frontend folder
│   ├── mocks
│   ├── public                # holds all images
│   ├── src                   # holds all tests, pages, and components
│   │   ├── tests
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   └── socket
│   └── ReadMe.md
```



**To Run:**

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)
- [Python 3.9+](https://www.python.org/)
- pip (Python package manager)


1. Clone the Repository
    ```bash
    git clone https://github.com/splendorSWE/Splendor.git
    cd Splendor

2. Run the Backend:
    - you need the following installations:
        ```bash
        pip3 install flask
        pip3 install flask\_cors
        pip3 install flask\_socketio

    - in a Python terminal run the following lines:
        ```bash
        python3 backend/run_multiplayer.py

3. Run the frontend:
    - in a zsh terminal run the following lines:
        ```bash
        cd splendor
        npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
