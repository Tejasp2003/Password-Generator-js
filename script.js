const slider = document.querySelector(".password-length input");
const lengthValue = document.querySelector(".details span");
const generateBtn = document.querySelector(".generate-btn");
const options = document.querySelectorAll(".option input");
const pwdBox= document.querySelector(".input-box input");
const passIndicator= document.querySelector(".pass-indicator");
const copyBtn = document.querySelector(".input-box span");




slider.addEventListener("input", () => {
    lengthValue.innerHTML = slider.value;

})


const characters = { // object of letters, numbers & symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>`"
}

function generatePwd(){
    let staticpwd = "";
    let pwdLength = slider.value;
    randomPwd= "";
    excludeDuplicate=false;
    options.forEach(option => {
        if (option.checked) {
            if(option.id!=="exclude-duplicates" && option.id!=="spaces")
            {
                staticpwd += characters[option.id];
            }
            else if(option.id=== "spaces")
            {
                staticpwd= `  ${staticpwd}  `;
            }
            else
            {
                excludeDuplicate = true;
            }
            
        }
    });
    


for (let i = 0; i < pwdLength; i++) {

    
    let randomChar= staticpwd[Math.floor(Math.random()* staticpwd.length)];
    if(excludeDuplicate)
    {
        !randomPwd.includes(randomChar) || randomChar==" " ? randomPwd += randomChar : i--;
        
    }
    else{
        randomPwd += randomChar;
    }
}

// console.log(randomPwd);
pwdBox.value=randomPwd;
}
const upadatePassIndicator = () => {
    // if slider value is less than 8 then pass "weak" as passIndicator id else if slider 
    // value is less than 16 then pass "medium" as id else pass "strong" as id
    passIndicator.id = slider.value <= 8 ? "weak" : slider.value <= 15 ? "medium" : "strong";
}
const updateSlider = () => {
    // passing slider value as counter text
    lengthValue.innerText = slider.value;
    generatePwd();
    upadatePassIndicator();
}
updateSlider();
const copyPwd= ()=>{
    navigator.clipboard.writeText(pwdBox.value);
    copyBtn.innerText="check";
    setTimeout(()=>{
        copyBtn.innerText="content_copy"
    }, 1700);
}
generateBtn.addEventListener("click", generatePwd);
slider.addEventListener("input", updateSlider);
copyBtn.addEventListener("click", copyPwd);