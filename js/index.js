$(document).ready(function(){
    $('.autoplay').slick({
      slidesToShow:6,
      slidesToScroll:1,
      autoplay:true,
      arrows:false,
      infinite: true,
      autoplaySpeed:2000,
      responsive: [
        {
          breakpoint: 1160,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 994,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
      ]
    });
});
 
const nameValidate = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýÝ\s]+$/
const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneValidate = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
var isName = false;
var isEmail = false;
var isPhone = false;
var isPassword = false;
var isPaswordConfirm = false;
var formElement = document.querySelectorAll('.form-item input,textarea,select')
var arr = [];

var arrToCheckEmpty = JSON.parse(localStorage.getItem('customer'))
if(arrToCheckEmpty == null){
  localStorage.setItem('customer' , JSON.stringify([1]))
}
arr = JSON.parse(localStorage.getItem('customer'))

//show loading
function loadpage(){
  let loading = document.querySelector('.submit-loading')
  loading.style.display = 'flex'
  setTimeout(function() {
      loading.style.display = 'none'
  },2000)
}
function showSuccess(){
  let succes = document.querySelector('.succes')
    succes.style.display = 'flex'
    setTimeout(function() {
      succes.style.display = 'none'
    },4000)
}
function showfail(){
  let fail = document.querySelector('.fail')
    fail.style.display = 'flex'
    setTimeout(function() {
      fail.style.display = 'none'
    },4000)
}

//validate
function checkName(name){
  if(!nameValidate.test(name.value) && name.value != ''){
    name.parentElement.classList.add('invalid')
    isName = false
  }else{
    name.parentElement.classList.remove('invalid')
    isName = true
  }
}
function checkEmail(emailParameter){
  if(!emailValidate.test(emailParameter.value)&& emailParameter.value != ''){
    emailParameter.parentElement.classList.add('invalid')
    isEmail = false
  }else{
    emailParameter.parentElement.classList.remove('invalid')
    isEmail = true
  }
}
function checkPhone(phone){
  if(!phoneValidate.test(phone.value) && phone.value !=''){
    phone.parentElement.classList.add('invalid')
    isPhone = false
  }else{
    phone.parentElement.classList.remove('invalid')
    isPhone = true
  }
}
function checkpass(password){
  if(password.value.length<8 && password.value !=''){
    password.parentElement.classList.add('invalid')
    isPassword = false
  }else{
    password.parentElement.classList.remove('invalid')
    isPassword = true
  }
}
function checkEmpty(something){
   return something.value==''?true:false
}
function checkpw(passwordConfirm){
  let password = document.querySelector('.pass')
  if(password.value!=passwordConfirm.value&& passwordConfirm.value.length!=0){
    passwordConfirm.parentElement.classList.add('invalid')
    isPaswordConfirm = false
  }else{
    passwordConfirm.parentElement.classList.remove('invalid')
    isPaswordConfirm = true
  }
}
function checkEmailExist(emailParameter){
  for(let item = 0 ; item < arr.length ; item++){
    if(arr[item].email == emailParameter){
      return true;
    }
  }
  return false;
}

//add to localStorage

function addToStorage(){
  arr = JSON.parse(localStorage.getItem('customer'))
  let name1 = formElement[0].value
  let email1 = formElement[1].value
  let phone1 = formElement[2].value
  let brand1 = formElement[3].value
  let product1 = formElement[4].value
  let link1 = formElement[5].value
  let account1 = formElement[6].value
  let password1 = formElement[7].value
  let repassword1 = formElement[8].value
  let customer = {
    name:name1,
    email:email1,
    phone:phone1,
    brand:brand1,
    product:product1,
    link:link1,
    account:account1,
    password:password1,
    repassword:repassword1,
  }
  loadpage()
  if(!checkEmailExist(email1) &&isName &&isEmail &&isPhone &&isPassword &&isPaswordConfirm){
    showSuccess()
    arr.push(customer)
    localStorage.setItem('customer' , JSON.stringify(arr))
    for(var i = 0 ; i < formElement.length ; i++){
      formElement[i].value = ''
    }
  }else{
    showfail()
  }
}


function saveFunc(){
  let formElement = document.querySelectorAll('.form-item input,textarea,select')
  checkName(formElement[0]);
  checkEmail(formElement[1]);
  checkPhone(formElement[2]);
  checkpass(formElement[7]);
  checkpw(formElement[8]);
  function checkEmailchangedValid(){
    for(var i = 1 ; i < arr.length;i++){
      if(arr[i].email == formElement[1].value && i!=x){
        return false
      }
    }
    return true;
  }
  if(isName &&isEmail &&isPhone &&isPassword &&isPaswordConfirm && checkEmailchangedValid()){
    loadpage();
    arr[x].name = formElement[0].value
    arr[x].email = formElement[1].value
    arr[x].phone = formElement[2].value
    arr[x].brand = formElement[3].value
    arr[x].product = formElement[4].value
    arr[x].link = formElement[5].value
    arr[x].account = formElement[6].value
    arr[x].password = formElement[7].value
    arr[x].repassword = formElement[8].value
    localStorage.setItem('customer' , JSON.stringify(arr))
    location.reload();
    showSuccess()
  }else{
    loadpage();
    showfail();
  }
}

