# Cyber Suite // Decider & Text Decoder

A sleek, cyberpunk-themed web application built with vanilla HTML, CSS, and JavaScript. The project consists of two core interactive tools designed with a futuristic dark-mode aesthetic, micro-interactions, and Web Audio feedback.

## Features

### 1. Text Decoder (`index.html`)
- Real-time string decryption/scramble animation.
- Custom Web Audio API sound synthesis on character decode (no external audio files required).
- Minimalist terminal UI with scanline overlays.

### 2. Decision Matrix (`decider.html`)
- Input memory buffer for managing choices (add, remove, and render).
- LocalStorage persistence to keep choices saved across session reloads.
- Randomized decision engine featuring the cyberpunk scramble transition on output.

## File Structure

```text
cyber-app/
├── index.html     # Text Scrambler page
├── decider.html   # Decision Matrix page
├── style.css      # Shared styling & dark theme variables
└── script.js     # Shared application logic & audio synthesizer
