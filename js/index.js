const accountValidate = /^[a-zA-Z0-9]{6,20}$/
//user constructor
function User(account, password, taskList){
  this.account = account;
  this.password = password;
  this.taskList = taskList;
}
//set default localStorage
var usertest = new User('hello','iam','vanhoc');
let isName = false;
let isPassword =false;
let isPasswordConfirm = false;
var arr = [];
var arrToCheckEmpty = JSON.parse(localStorage.getItem('user'))
if(arrToCheckEmpty == null){
  localStorage.setItem('user' , JSON.stringify([usertest]))
  localStorage.setItem('logged' , JSON.stringify(false))
}
arr = JSON.parse(localStorage.getItem('user'))
let logged = JSON.parse(localStorage.getItem('logged'))

//validate
function checkName(name){
  if(!accountValidate.test(name.value) && name.value != ''){
    name.parentElement.classList.add('invalid')
    name.parentElement.classList.remove('valid')
    isName = false
  }else if(name.value != ''){
    name.parentElement.classList.add('valid')
    name.parentElement.classList.remove('invalid')
    isName = true
  }else{
    name.parentElement.classList.remove('invalid')
    name.parentElement.classList.remove('valid')
    isName = false
  }
}

function checkPassword(password){
  if(password.value.trim().length < 8 && password.value != ''){
    password.parentElement.classList.add('invalid')
    password.parentElement.classList.remove('valid')
    isPassword = false
  }else if(password.value != ''){
    password.parentElement.classList.add('valid')
    password.parentElement.classList.remove('invalid')
    isPassword = true
  }else{
    password.parentElement.classList.remove('invalid')
    password.parentElement.classList.remove('valid')
    isPassword = false
  }
}
function checkPasswordConfirm(passwordConfirm){
  let password = document.querySelector('.password-input-signup')
  console.log(passwordConfirm.value.trim() == password.value.trim())
  if(passwordConfirm.value.trim() != password.value.trim() && passwordConfirm.value.trim() != ''){
    passwordConfirm.parentElement.classList.add('invalid')
    passwordConfirm.parentElement.classList.remove('valid')
    isPasswordConfirm = false
  }else if(passwordConfirm.value != ''){
    passwordConfirm.parentElement.classList.add('valid')
    passwordConfirm.parentElement.classList.remove('invalid')
    isPasswordConfirm = true
  }else{
    passwordConfirm.parentElement.classList.remove('invalid')
    passwordConfirm.parentElement.classList.remove('valid')
    isPasswordConfirm = false
  }
}
function checkNameExist(name){
  for(let i = 0; i < arr.length ;i++){
    if(name == arr[i].account){
      return true;
    }
  }
  return false;
}
function checkAccountExists(name,password){
  for(let i = 0; i < arr.length ;i++){
    if(name == arr[i].account && password == arr[i].password){
      return true;
    }
  }
  return false;
}
//action
function showSignup(){
  document.querySelector('.login').classList.add('login-box-hide')
  document.querySelector('.signup').classList.add('signup-box-show')
}
function showRetake(){
  document.querySelector('.login').classList.add('login-box-hide')
  document.querySelector('.retake').classList.add('retake-box-show')
}
function returnLogin(){
  document.querySelector('.login').classList.remove('login-box-hide')
  document.querySelector('.retake').classList.remove('retake-box-show')
}
function returnLoginSignup(){
  document.querySelector('.login').classList.remove('login-box-hide')
  document.querySelector('.signup').classList.remove('signup-box-show')
}


//action with localStorage

//sign up
function submitAccount(){
  let userInfor = document.querySelectorAll('.signup .login-input input')
  if(isName && isPassword && isPasswordConfirm){
    if(!checkNameExist(userInfor[0].value)){
      showSuccess('Đăng ký');
      var users = new User(userInfor[0].value,userInfor[1].value,[])
      arr.push(users)
      localStorage.setItem("user" , JSON.stringify(arr))
    }else{
      //"đã" hoặc "không"
      showNameExited('đã')
    }
  }else{
    showfailFormat()
  }
}
//login
function submitLogin(){
  let userInfor = document.querySelectorAll('.login .login-input input')
  if(isName && isPassword){
    if(checkNameExist(userInfor[0].value)){
      if(checkAccountExists(userInfor[0].value,userInfor[1].value)){
        showSuccess('Đăng nhập');
        logged = true
        localStorage.setItem("logged" , JSON.stringify(logged))
      }else{
        showPasswordfail()
      }
    }else{
      //"đã" hoặc "không"
      showNameExited('không')
    }
  }else{
    showfailFormat()
  }
}
//retake password
function retakePassword(){
  let userInfor = document.querySelector('.retake .login-input input')
  if(isName){
    if(checkNameExist(userInfor.value)){
      showSuccess('Lấy lại mật khẩu');
      
    }else{
      //"đã" hoặc "không"
      showNameExited('không')
    }
  }else{
    showfailFormat()
  }
}
//alert box
function showSuccess(typeBox){
  let success = document.querySelector('.login-success')
  let successDivInner = document.querySelector('.login-success div')
  successDivInner.innerHTML = `<p>${typeBox} thành công <i class="fas fa-check-circle"></i></p>`
  success.style.display = 'flex';
  setTimeout(function(){
    success.style.display = 'none';
    successDivInner.innerHTML = '';
  },2500)
}
function showNameExited(existOrNot){
  let fail = document.querySelector('.login-fail')
  let failDivInner = document.querySelector('.login-fail div')
  failDivInner.innerHTML = `<p>Tên tài khoản ${existOrNot} tồn tại <i class="fas fa-exclamation-triangle"></i></p>`
  fail.style.display = 'flex';
  setTimeout(function(){
    fail.style.display = 'none';
    failDivInner.innerHTML = '';
  },2500)
}

function showfailFormat(){
  let fail = document.querySelector('.login-fail')
  let failDivInner = document.querySelector('.login-fail div')
  failDivInner.innerHTML = `<p>Vui lòng kiểm tra lại định dạng nhập vào <i class="fas fa-exclamation-triangle"></i></p>`
  fail.style.display = 'flex';
  setTimeout(function(){
    fail.style.display = 'none';
    failDivInner.innerHTML = '';
  },2500)
}

function showPasswordfail(){
  let fail = document.querySelector('.login-fail')
  let failDivInner = document.querySelector('.login-fail div')
  failDivInner.innerHTML = `<p>Mật khẩu không chính xác <i class="fas fa-exclamation-triangle"></i></p>`
  fail.style.display = 'flex';
  setTimeout(function(){
    fail.style.display = 'none';
    failDivInner.innerHTML = '';
  },2500)
}
