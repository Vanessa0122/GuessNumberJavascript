function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function submitNumberForm(event) {
  event.preventDefault();
  window.attempts++;

  const numberTextInput = document.querySelector('#numberTextInput');
  const submittedNumber = Number(numberTextInput.value);

  if (!numberTextInput.value || isNaN(numberTextInput.value)) {
    window.alert('Please enter a number.');
    return;
  }

  if (submittedNumber === window.randomNumber) {
    updateUIWithStatus('win');
  } else {
    updateUIWithStatus('lose');
  }
}

function updateUIWithStatus(status) {
  const topBorder = document.querySelector('.feedback-divider:first-child');
  const bottomBorder = document.querySelector('.feedback-divider:last-child');
  const statusText = document.querySelector('.feedback-text .status');
  const attempts = document.querySelector('.attempts');
  let feedbackText = '';

  topBorder.classList.remove('hide', 'win', 'lose');
  bottomBorder.classList.remove('hide', 'win', 'lose');
  statusText.classList.remove('hide', 'win', 'lose');
  attempts.classList.remove('hide');

  if (status === 'win') {
    feedbackText = 'You Win!';
  } else {
    feedbackText = 'Try Again!';
  }

  topBorder.classList.add(status);
  bottomBorder.classList.add(status);
  statusText.classList.add(status);

  statusText.textContent = feedbackText;

  attempts.textContent = `You tried ${window.attempts} time${window.attempts === 1 ? '' : 's'}`;
}

function restartGame() {
  const min = 1;
  const max = 5;
  window.randomNumber = randomIntFromInterval(min, max);
  window.attempts = 0;

  const inputLabel = document.querySelector('span.input-label');
  const labelText = inputLabel.textContent;
  inputLabel.textContent = labelText.replace('{x}', min).replace('{y}', max);

  const topBorder = document.querySelector('.feedback-divider:first-child');
  const bottomBorder = document.querySelector('.feedback-divider:last-child');
  const statusText = document.querySelector('.feedback-text .status');
  const attempts = document.querySelector('.attempts');

  topBorder.classList.add('hide');
  bottomBorder.classList.add('hide');
  statusText.classList.add('hide');
  attempts.classList.add('hide');
}

document.addEventListener('DOMContentLoaded', restartGame);
document.querySelector('#taskForm').addEventListener('submit', submitNumberForm);
document.querySelector('#taskForm').addEventListener('reset', restartGame);
