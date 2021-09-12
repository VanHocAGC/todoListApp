let userWorking =JSON.parse(localStorage.getItem("working")) 
let isLive = JSON.parse(sessionStorage.getItem("live"))
let arr = JSON.parse(localStorage.getItem("user")) || []
let userNow = arr.filter(obj=>obj.account==userWorking)[0];
//check logged 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function showform(){
    document.querySelector('form').style.display = 'flex';
}
function hideForm(){
    document.querySelector('form').style.display = 'none';
}

async function checkLogged(){
    if(!isLive){
        showfailFormat("Vui lòng đăng nhập")
        await sleep(1000);
        window.location.replace("http://127.0.0.1:5500/login.html")
    }else{
        showSuccess(`Xin chào ${userWorking}`)
        document.querySelector('.user-infor').innerHTML =`<p>${userWorking}</p> <img src="./image/undraw_profile_pic_ic5t.svg" alt="user infor"><button onclick="showLogout()"><i class="fas fa-chevron-down"></i></button>`
    }
}


document.querySelector('form').addEventListener('submit' , function(e) {
     e.preventDefault()

})

//logout
function showLogout(){
    let logoutButton = document.querySelector('.user-infor-box h5')
    if(logoutButton.style.display == 'none'){
        logoutButton.style.display = 'block'
    }else{
        logoutButton.style.display = 'none'
    }
}
async function logout(){
    showSuccess(`Đăng xuất thành công`);
    sessionStorage.setItem('live', 'false')
    await sleep(1000);
    window.location.replace("http://127.0.0.1:5500/login.html")
}
function showSuccess(typeBox){
    let success = document.querySelector('.login-success')
    let successDivInner = document.querySelector('.login-success div')
    successDivInner.innerHTML = `<p>${typeBox} <i class="fas fa-check-circle"></i></p>`
    success.style.display = 'flex';
    setTimeout(function(){
      success.style.display = 'none';
      successDivInner.innerHTML = '';
      
    },200)
}
function showfailFormat(content){
    let fail = document.querySelector('.login-fail')
    let failDivInner = document.querySelector('.login-fail div')
    failDivInner.innerHTML = `<p>${content} <i class="fas fa-exclamation-triangle"></i></p>`
    fail.style.display = 'flex';
    setTimeout(function(){
        fail.style.display = 'none';
        failDivInner.innerHTML = '';
    },2500)
}