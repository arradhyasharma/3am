const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function playAudioClick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700 + Math.random() * 300, ctx.currentTime);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
  }
}

function runScramble(targetText, outputElement) {
  if (!outputElement || !targetText) return;
  
  let iteration = 0;
  clearInterval(outputElement.timer);

  const cleanText = targetText.toString().toUpperCase();

  outputElement.timer = setInterval(() => {
    outputElement.innerText = cleanText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return cleanText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    playAudioClick();

    if (iteration >= cleanText.length) {
      clearInterval(outputElement.timer);
    }

    iteration += 1 / 3;
  }, 30);
}

/* =====================SCRAMBLER======================= */
const scrambleInput = document.getElementById('scramble-input');
const scrambleBtn = document.getElementById('scramble-btn');
const scrambleOutput = document.getElementById('scramble-output');

if (scrambleBtn && scrambleInput && scrambleOutput) {
  scrambleBtn.addEventListener('click', () => {
    const text = scrambleInput.value.trim();
    if (text) runScramble(text, scrambleOutput);
  });

  scrambleInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && scrambleInput.value.trim()) {
      runScramble(scrambleInput.value.trim(), scrambleOutput);
    }
  });
}

/* ===============DECIDER============== */
const optionInput = document.getElementById('option-input');
const addBtn = document.getElementById('add-btn');
const optionsListEl = document.getElementById('options-list');
const decideBtn = document.getElementById('decide-btn');
const decideOutput = document.getElementById('decide-output');

if (optionsListEl) {
  let options = JSON.parse(localStorage.getItem('cyber_options')) || ["PIZZA", "BURGER", "SUSHI"];

  function renderList() {
    localStorage.setItem('cyber_options', JSON.stringify(options));
    optionsListEl.innerHTML = '';
    options.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'option-item';
      li.innerHTML = `
        <span>${item}</span>
        <span class="delete-btn" onclick="removeItem(${idx})">✕</span>
      `;
      optionsListEl.appendChild(li);
    });
  }

  window.removeItem = function(index) {
    options.splice(index, 1);
    renderList();
  };

  if (addBtn && optionInput) {
    addBtn.addEventListener('click', () => {
      const val = optionInput.value.trim().toUpperCase();
      if (val) {
        options.push(val);
        optionInput.value = '';
        renderList();
      }
    });
    
    optionInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const val = optionInput.value.trim().toUpperCase();
        if (val) {
          options.push(val);
          optionInput.value = '';
          renderList();
        }
      }
    });
  }

  if (decideBtn && decideOutput) {
    decideBtn.addEventListener('click', () => {
      if (options.length === 0) {
        decideOutput.innerText = "NO DATA";
        return;
      }
      const picked = options[Math.floor(Math.random() * options.length)];
      runScramble(picked, decideOutput);
    });
  }

  renderList();
}
