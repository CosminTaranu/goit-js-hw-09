function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  const startBtn = document.querySelector('button[data-start]');
  const stopBtn= document.querySelector('button[data-stop]');

  let colorChangeInterval ;

  startBtn.addEventListener ('click', () => {
    startBtn.disabled = true;

    colorChangeInterval = setInterval (() => {
        document.body.style.backgroundColor = getRandomHexColor ();
    }, 1000);
  });

  stopBtn.addEventListener ('click', () =>{
    clearInterval(colorChangeInterval);
    startBtn.disabled = false;
  });
