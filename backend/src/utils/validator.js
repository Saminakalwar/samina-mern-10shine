exports.isValidEmail = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

exports.isValidPassword = (password)=>{
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,16}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;  // more flexible, allow any specia; character
    return passwordRegex.test(password);
}

exports.isNotEmpty = (value)=>{
return value && value.trim()!=="";
}

