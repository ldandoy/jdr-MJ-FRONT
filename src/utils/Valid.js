export const validRegister = (userRegister) => {
    const { name, account, password, cf_password } = userRegister;
    const errors = [];
  
    if(!name){
        errors.push("Please add your name.")
    }else if(name.length > 20){
        errors.push("Your name is up to 20 chars long.")
    }
  
    if(!account){
        errors.push("Please add your email or phone number.")
    }else if(!validPhone(account) && !validateEmail(account)){
        errors.push("Email or phone number format is incorrect.")
    }
  
    const msg = checkPassword(password, cf_password)
    if(msg) errors.push(msg)
  
    return {
        errMsg: errors,
        errLength: errors.length
    }
}

export const checkPassword = (password, cf_password) => {
    if (password.length < 6) {
        return ("Le mot de passe doit avoir au moins 6 caractères.")
    } else if (password !== cf_password) {
        return ("Le mot de passe n'a pas été confirmé.")
    }
}

export function validPhone(phone) {
    const re = /^[+]/g
    return re.test(phone)
}

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}