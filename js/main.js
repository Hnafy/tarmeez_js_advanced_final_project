let loginModal = document.getElementById("loginModal")
let sweatAlert = document.querySelector(".alert")
let logout = document.getElementById("logout")
let addBtn = document.getElementById("addBtn")
let sendComment = document.querySelector(".main_posts_post_sendComment")
let avatarHeader = document.getElementById("avatarHeader")

// login button on header
let login = document.getElementById("login")
login.addEventListener("click",logModel)
function logModel(){
    let box = document.getElementById("logBox")
    box.classList.add("active-box")
    loginModal.classList.add("active-modal")
    document.getElementById("logModalOut").onclick = function(){
        loginModal.classList.remove("active-modal")
        box.classList.remove("active-box")
    }
}

// register button on header
let register = document.getElementById("register")
register.addEventListener("click",regModel)
function regModel(){
    let box = document.getElementById("regBox")
    box.classList.add("active-box")
    registerModal.classList.add("active-modal")
    document.getElementById("regModalOut").onclick = function(){
        registerModal.classList.remove("active-modal")
        box.classList.remove("active-box")
    }
}

// eye on input password
let eyeIconLog = document.getElementById("eyeIconLog")
eyeIconLog.addEventListener("click",eyeLogPass)
function eyeLogPass(){
    if(!eyeIconLog.classList.contains("active")){
        eyeIconLog.classList.remove("fa-eye-slash")
        eyeIconLog.classList.add("fa-eye")
        eyeIconLog.classList.add("active")
        document.getElementById("passwordLogin").setAttribute("type","text")
    }else{
        eyeIconLog.classList.add("fa-eye-slash")
        eyeIconLog.classList.remove("fa-eye")
        eyeIconLog.classList.remove("active")
        document.getElementById("passwordLogin").setAttribute("type","password")
    }
}

let eyeIconReg = document.getElementById("eyeIconReg")
eyeIconReg.addEventListener("click",eyeRegPass)
function eyeRegPass(){
    if(!eyeIconReg.classList.contains("active")){
        eyeIconReg.classList.remove("fa-eye-slash")
        eyeIconReg.classList.add("fa-eye")
        eyeIconReg.classList.add("active")
        document.getElementById("passwordRegister").setAttribute("type","text")
    }else{
        eyeIconReg.classList.add("fa-eye-slash")
        eyeIconReg.classList.remove("fa-eye")
        eyeIconReg.classList.remove("active")
        document.getElementById("passwordRegister").setAttribute("type","password")
    }
}

// alert
function myAlert(text,bgColor){
    sweatAlert.innerHTML = text
    sweatAlert.style.backgroundColor = bgColor
    sweatAlert.classList.add("alert-active")
    setTimeout(() => {
        sweatAlert.classList.remove("alert-active")
    }, 2000);
}

// submit button on login header
let loginSubmit = document.getElementById("loginSubmit")
loginSubmit.addEventListener("click",submitLogin)
function submitLogin(){
    let userNameInput = document.getElementById("userNameLogin")
    let passwordInput = document.getElementById("passwordLogin")
    let paramsPass = {
        "username" : userNameInput.value,
        "password" : passwordInput.value
    };
    async function success(){
        try{
            document.querySelector(".container-loader").classList.remove("loader-hide")
            let successPass = await axios.post("https://tarmeezacademy.com/api/v1/login",paramsPass)
            document.querySelector(".container-loader").classList.add("loader-hide")
            window.localStorage.setItem("token",successPass.data.token)
            window.localStorage.setItem("user",JSON.stringify(successPass.data.user))
            sign()
            myAlert("Login done ..","#22bb33")
            loginModal.classList.remove("active-modal")
        }catch{
            myAlert("you didn't register ..","#bb2124")
        }
    }
    success()
    document.querySelector(".main_posts_post_sendComment").classList.remove("main_posts_post_sendComment-hide")
}
// submit button on register header
let registerSubmit = document.getElementById("registerSubmit")
registerSubmit.addEventListener("click",submitRegister)
function submitRegister(){
    let userNameInput = document.getElementById("userNameRegister")
    let passwordInput = document.getElementById("passwordRegister")
    let nameInput = document.getElementById("nameRegiser")
    let emailInput = document.getElementById("emailRegiser")
    let avatarUser = document.getElementById("avatarUser")
    let formData = new FormData()
    formData.append("username",userNameInput.value)
    formData.append("password",passwordInput.value)
    formData.append("image",avatarUser.files[0])
    formData.append("name",nameInput.value)
    formData.append("email",emailInput.value)
    async function success(){
        try{
            document.querySelector(".container-loader").classList.remove("loader-hide")
            let successPass = await axios.post("https://tarmeezacademy.com/api/v1/register",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            document.querySelector(".container-loader").classList.add("loader-hide")
            window.localStorage.setItem("token",successPass.data.token)
            window.localStorage.setItem("user",JSON.stringify(successPass.data.user))
            sign()
            myAlert("New User Registered ..","#22bb33")
            registerModal.classList.remove("active-modal")
        }catch{
            myAlert("this account is exist ..","#bb2124")
        }
    }
    success()
}

// check user login or logout
if(window.localStorage.length === 2){
    sign()
}else{
    document.getElementById("avatarHeader").classList.add("avatar-active")
}

logout.addEventListener("click",logOut)
function logOut(){
    myAlert("loged Out ..","#bb2124")
    login.classList.remove("sign-hidden")
    register.classList.remove("sign-hidden")
    logout.classList.add("logout-hidden")
    window.localStorage.clear()
    if(addBtn !== null){
        addBtn.classList.remove("new-post-active")
    }
    document.getElementById("avatarHeader").classList.add("avatar-active")
    document.getElementById("name").innerHTML = ""
    document.querySelector(".main_posts_post_sendComment").classList.add("main_posts_post_sendComment-hide")
}
function sign(){
    document.querySelector(".box").classList.remove("active-box")
    login.classList.add("sign-hidden")
    register.classList.add("sign-hidden")
    logout.classList.remove("logout-hidden")
    if(addBtn !== null){
        addBtn.classList.add("new-post-active")
    }
    avatarHeader.classList.remove("avatar-active")
    let name = getName()
    document.getElementById("name").innerHTML = `@${name.username}`
    let avatar = getAvatarHeader()
    avatarHeader.setAttribute("src",avatar)
}

function getName(){
    let name = null
    let storageUser = localStorage.getItem("user")
    if(storageUser !== null){
        name = JSON.parse(storageUser)
    }
    return name
}
function getAvatarHeader(){
    let avatar = "images/avatar.jpg"
    let storageUser = localStorage.getItem("user")
    if(storageUser !== null){
        if(Object.keys(JSON.parse(storageUser).profile_image).length !== 0){
            avatar = JSON.parse(storageUser).profile_image
        }
    }
    return avatar
}

// modal create post
let box = document.getElementById("createBox")
if(addBtn !== null){
    addBtn.addEventListener("click",createPost)
}
function createPost(){
    document.getElementById("box_head").innerHTML = "Create Post"
    document.getElementById("titleInput").value = ""
    document.getElementById("bodyInput").innerHTML = ""
    document.getElementById("createSubmit").value = "Create"
    box.classList.add("active-box")
    createModal.classList.add("active-modal")
    document.getElementById("createModalOut").onclick = function(){
        createModal.classList.remove("active-modal")
        box.classList.remove("active-box")
    }
}

// show update modal
function editBtn(postObj){
    let post = JSON.parse(decodeURIComponent(postObj))
    document.getElementById("box_head").innerHTML = "Update Post"
    document.getElementById("titleInput").value = post.title
    document.getElementById("bodyInput").innerHTML = post.body
    document.getElementById("postIdInput").value = post.id
    document.getElementById("createSubmit").value = "Update"
    box.classList.add("active-box")
    createModal.classList.add("active-modal")
    document.getElementById("createModalOut").onclick = function(){
        createModal.classList.remove("active-modal")
        box.classList.remove("active-box")
    }
}

let idPostDelete;
// delete post
let deleteModal = document.getElementById("deleteModal")
function deleteBtn(postObj){
    let box = document.getElementById("deleteBox")
    idPostDelete = JSON.parse(decodeURIComponent(postObj)).id
    box.classList.add("active-box")
    deleteModal.classList.add("active-modal")
    document.getElementById("deleteModalOut").onclick = function(){
        deleteModal.classList.remove("active-modal")
        box.classList.remove("active-box")
    }
}

// submit button on create post
let createSubmit = document.getElementById("createSubmit")
if(createSubmit !== null){
    createSubmit.addEventListener("click",submitCreate)
}
function submitCreate(){
    let title = document.getElementById("titleInput")
    let body = document.getElementById("bodyInput")
    let image = document.getElementById("imageInput")
    let token = localStorage.getItem("token")
    // create or edit
    let postId = document.getElementById("postIdInput").value
    let isCreate = postId === null || postId === ""
    // params
    let formData = new FormData()
    formData.append("title",title.value)
    formData.append("body",body.value)
    formData.append("image",image.files[0])
    let url = ""
    if(isCreate){
        url = `https://tarmeezacademy.com/api/v1/posts`
    }else{
        // change put to post
        formData.append("_method","put")
        url = `https://tarmeezacademy.com/api/v1/posts/${postId}`
    }
    async function success(){
        try{
            let successPass = await axios.post(url,formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "authorization":`Bearer ${token}`
                }
            })
            myAlert("New Post Has Been Created","#22bb33")
            createModal.classList.remove("active-modal")
            document.querySelector(".main_posts").innerHTML = ""
            getPosts()
        }catch(error){
            let message = error.response.data.message
            myAlert(message,"#bb2124")
        }
    }
    success()
}

// submit button on delete modal
if(document.getElementById("deleteSubmit") !== null){
    document.getElementById("deleteSubmit").addEventListener("click",submitDelete)
}
function submitDelete(){
    async function success(){
        try{
            let token = localStorage.getItem("token")
            let successPass = await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${idPostDelete}`,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "authorization":`Bearer ${token}`
                }
            })
            myAlert("Post Deleted ..","#22bb33")
            deleteModal.classList.remove("active-modal")
            document.querySelector(".main_posts").innerHTML = ""
            getPosts()
        }catch(error){
            myAlert(error,"#bb2124")
        }
    }
    success()
}

// get tags post
function getTags(){
    document.getElementById(`postTags-${post.id}`).innerHTML = ""
    let postTagsContent = ``
    if(post.tags.length >= 1){
        for(tag of post.tags){
            postTagsContent =`
                <b>${tag.name}</b>
            `
            document.getElementById(`postTags-${post.id}`).innerHTML += postTagsContent
        }
    }else{
        postTagsContent =`
            <b>No Tags</b>
        `
        document.getElementById(`postTags-${post.id}`).innerHTML = postTagsContent
    }
}

// go to postDetails page
function postDetails(postId){
    // window.localStorage.setItem("scrollY",window.scrollY)
    window.location = `postDetails.html?postId=${postId}`
}

// back to main page
document.querySelector(".header_pages_logo").onclick = () =>{
    // window.scrollTo(0,localStorage.getItem("scrollY"))
    window.location = "index.html"
}

// go profile page with id user has been login
function profileClicked(){
    let userId = getName()
    window.location = `profile.html?postId=${userId.id}`
}