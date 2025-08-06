const phone = document.getElementById('phone')
const email = document.getElementById('email')
const Password = document.getElementById('password')

//valider user detail

function validatephone(){
    const phonenumber = phone.value
    const isValid = /^\d{10}$/.test(phonenumber)
    if(!isValid){
       alert("Phone number must be exactly 10 digits and numeric.");
       return false;
    }

    return true;
}

function validateEmail(){
    const Email = email.value;
    const isValid = /^\w+@\w+\.\w+$/.test(Email)
    if(!isValid){
        alert("Email must contain @ and can have alphabet ranging [a-z] and [A-Z] and [0-9] also.");
       return false;
    }
    return true;
}

function validatepassword(){
    const password = Password.value
    const isvalid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
    if(!isvalid){
        alert('Password Must Contains at least:1 uppercase letter, 1 lowercase letter, 1 number, 1 special character')
        return false
    }
    return true
}


//save the details of user in local storage

const registerform= document.getElementById('register-form')
registerform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const phoneValue = document.getElementById("phone").value;
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
     
    if(validateEmail() && validatepassword() && validatephone()){
        const user = {
            phone : phoneValue,
            email:emailValue,
            password:passwordValue
        };
        localStorage.setItem("user",JSON.stringify(user));
        alert("registration successfull")
    }
})