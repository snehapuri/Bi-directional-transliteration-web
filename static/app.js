var sourceLang, targetLang, textInput
function EngToLangForm() {
  document.getElementById("source-lang-div").style.display = "none";
  document.getElementById("target-lang-div").style.display = "block";
  sourceLang = "en";
  document.getElementById("input-form").style.display = "block";
  document.querySelectorAll(".choice-btn").forEach(function(button) {
  button.style.display = "none";
  });
}
function LangToEngForm() {
  document.getElementById("source-lang-div").style.display = "block";
  document.getElementById("target-lang-div").style.display = "none";
  targetLang = "en";
  document.getElementById("input-form").style.display = "block";
  document.querySelectorAll(".choice-btn").forEach(function(button) {
    button.style.display = "none";
    });
}
function getinp(event) {
  event.preventDefault();
  if (sourceLang=='en') {
  targetLang = document.getElementById("target-lang").value;
  textInput = document.getElementById("text-input").value;
  }
  else if (targetLang=='en') {
    sourceLang = document.getElementById("source-lang").value;
    textInput = document.getElementById("text-input").value;
  }
  fetch('http://127.0.0.1:5000/transliterate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sourceLang: sourceLang,
      targetLang: targetLang,
      textInput: textInput
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    document.getElementById("transliterated-text").innerHTML = data.transliteratedText;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}