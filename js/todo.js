let userWorking =JSON.parse(localStorage.getItem("working")) 
let isLive = JSON.parse(sessionStorage.getItem("live"))
let arr = JSON.parse(localStorage.getItem("user")) || []
let userNow = arr.find(obj=>obj.account==userWorking);
let userTask = document.querySelectorAll('.form-control')
function UserTasks(name, description, deadline,status){
    this.name = name,
    this.description = description,
    this.deadline = deadline,
    this.status = status;
}
//check logged 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function showform(){
    document.querySelector('form').style.display = 'flex';
}
function hideForm(){
    document.querySelector('form').style.display = 'none';
    clearForm();
}
function clearForm(){
    for(let i = 0; i < userTask.length-1 ;i++){
        userTask[i].value = ''
    }
}
function updateUser(){
    for(let i = 0; i < arr.length ;i++){
        if(arr[i].account==userWorking){
            arr[i] = userNow
        }
    }
}
function submitInfor(){
    let newTask = new UserTasks(userTask[0].value,userTask[1].value,userTask[2].value,userTask[3].value)
    userNow.taskList.push(newTask)
    updateUser();
    localStorage.setItem("user" , JSON.stringify(arr))
}
function showTask(){
    let tableBody = document.querySelector('tbody')
    let content = ''
    for (let i = 0; i < userNow.taskList.length ; i++){
        content +=(`<tr class="list-item">
        <th scope="row">${i+1}</th>
        <th colspan="2">${userNow.taskList[i].name}</th>
        <td colspan="2">${userNow.taskList[i].description}</td>
        <td class="deadline">${userNow.taskList[i].deadline}</td>
        <td class="status">${userNow.taskList[i].status}</td>
        <td class="edit">
            <div class="btn btn-warning px-5 py-2" onclick="showformEdit(this)">Sửa</div>
            <div class="btn btn-danger px-5 py-2" onclick="removeTask(this)">Xóa</div>
        </td></tr>`)
    }
    tableBody.innerHTML =content
}
showTask()

function showformEdit(task){
    showform();
    let choosedTask = task.parentElement.parentElement.querySelectorAll('th,td')
    userTask[0].value = choosedTask[1].innerHTML
    userTask[1].value = choosedTask[2].innerHTML
    userTask[2].value = choosedTask[3].innerHTML
    userTask[3].value = choosedTask[4].innerHTML
}
function removeTask(task){
    let choosedTask = task.parentElement.parentElement.querySelectorAll('th,td')
    userNow.taskList.splice((choosedTask[0].innerText-1),1)
    updateUser()
    localStorage.setItem("user" , JSON.stringify(arr))
    showTask()
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
      
    },2500)
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