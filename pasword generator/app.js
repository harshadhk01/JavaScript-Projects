let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowerCase = document.getElementById("lowerCase");
let upperCase = document.getElementById("upperCase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("Symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");

//Showing inputSlider value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", () => {
  sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener("click", () => {
  passBox.value = generatePassword();
});

let lowerChar = "abcdefghijklmnopqrstuvwxyz";
let upperChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumber = "0123456789";
let allSymbols = "`!@#$%^&*";

//Function to Generate Password
function generatePassword() {
  let genPassword = "";
  let allChars = "";

  allChars += lowerCase.checked ? lowerChar : "";
  allChars += upperCase.checked ? upperChar : "";
  allChars += numbers.checked ? allNumber : "";
  allChars += symbols.checked ? allSymbols : "";

  if (allChars == "" || allChars.length == 0) {
    return genPassword;
  }

  let i = 1;
  while (i <= inputSlider.value) {
    genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    i++;
  }
  return genPassword;
}

copyIcon.addEventListener("click", () => {
  if (passBox.value != "" || passBox.value.length >= 1) {
    navigator.clipboard.writeText(passBox.value);
    copyIcon.innerText = "check";
    copyIcon.title = "Password Copied";
    setTimeout(()=>{
      copyIcon.innerHTML = "content_copy";
      copyIcon.title = "";
    },2000)
  }
});
