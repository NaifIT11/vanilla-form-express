const alertMessage = document.querySelector("div[role='alert']");

//helper function to show alert
const showAlert = (textContent) => {
    alertMessage.textContent = textContent;
    alertMessage.classList.add("open");
    setTimeout(() => {
        alertMessage.classList.remove("open")
    } , 2000);
}

//helper function for the state of button textContent
const showLoading = (state) => {
    const submitButton = document.querySelector("button[type='submit']")
    const loadingSVG = document.querySelector("button[type='submit'] > svg");
    if(state){
        loadingSVG.style.display = 'block';
        submitButton.disabled = true
    }else{
        loadingSVG.style.display = 'none';
        submitButton.disabled = false
    }
}


//form//
const form = document.querySelector(".form");
const email = document.querySelector("input[type='email']");
const password = document.querySelector("input[type='password']");


let data = {}
email.addEventListener("change" , () => {
    data = {
        ...data,
        [email] : email.value
    }
})

password.addEventListener("change" , () => {
    data = {
        ...data,
        [password] : password.value
    }
})

console.log(data);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const sendData = async() => {
        showLoading(true);
        try {
            const res = await fetch("/api/auth" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const response = await res.json();
            if(response.err){
                showAlert(response.message);
                showLoading(false)
            }else{
                showAlert(response.message);
                showLoading(false)
            }
        } catch (error) {
            showAlert(error.message);
            showLoading(false)
            console.error(error);
        }finally{
            showLoading(false);
        }
    };
    sendData();
});