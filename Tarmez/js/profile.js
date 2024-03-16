// target post by id
let id;
function getId(){
    id = new URLSearchParams(window.location.search)
    id = id.get("postId")
}
getId()

async function getUser(){
    let result = await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    let response = result.data.data
    document.getElementById("postsCount").innerHTML = response.posts_count
    document.getElementById("commentsCount").innerHTML = response.comments_count
    document.querySelector(".name").innerHTML = response.name
    document.querySelector(".userName").innerHTML = response.username
    if(response.email !== null){
        document.querySelector(".email").innerHTML = response.email
    }else{
        document.querySelector(".email").innerHTML = "Not Found Email"
    }
    if(Object.keys(response.profile_image).length !== 0){
        document.getElementById("userAvatar").src = response.profile_image
    }else{
        document.getElementById("userAvatar").src = "images/avatar.jpg"
    }
    document.getElementById("ownerPost").innerHTML = `${response.username}'s Posts`
}
getUser()

async function getPosts(){
    try{
        document.querySelector(".container-loader").classList.remove("loader-hide")
        let result = await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
        document.querySelector(".container-loader").classList.add("loader-hide")
        let posts = result.data.data
        // get avatar
        let avatar = ""
        function checkAvatar(){
            if(Object.keys(post.author.profile_image).length === 0){
                avatar = "images/avatar.jpg"
            }else{
                avatar = post.author.profile_image
            }
        }
        for(post of posts){
            let user = getName()
            let isMyPost = user !== null && post.author.id === user.id
            let deleteBtnContent = ``
            let editBtnContent = ``
            if(isMyPost){
                deleteBtnContent = `<button class="main_posts_post_head_deleteBtn" onclick="deleteBtn('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>`
                editBtnContent = `<button class="main_posts_post_head_editBtn" onclick="editBtn('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>`
            }
            checkAvatar()
            if(Object.keys(post.image).length === 0){
                let content = `
                    <div class="main_posts_post">
                        <div class="main_posts_post_head">
                            <div class="main_posts_post_head_left">
                                <img src="${avatar}" alt="">
                                <h2>${post.author.username}</h2>
                            </div>
                            <div class="main_posts_post_head_right">
                                ${deleteBtnContent}
                                ${editBtnContent}
                            </div>
                        </div>
                        <div class="main_posts_post_content">
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        </div>
                        <div class="main_posts_post_comments" onclick="postDetails(${post.id})">
                            <i class="fa-solid fa-pen"></i>
                            <span>(${post.comments_count})</span>
                            <p>Comments</p>
                            <div id="postTags-${post.id}">
                            </div>
                        </div>
                    </div>
                `
                document.querySelector(".main_posts").innerHTML += content
                getTags()
            }else{
                let content = `
                    <div class="main_posts_post">
                        <div class="main_posts_post_head">
                            <div class="main_posts_post_head_left">
                                <img src="${avatar}" alt="">
                                <h2>${post.author.username}</h2>
                            </div>
                            <div class="main_posts_post_head_right">
                                ${deleteBtnContent}
                                ${editBtnContent}
                            </div>
                        </div>
                        <div class="main_posts_post_img">
                            <img src="${post.image}" alt="">
                            <span>${post.created_at}</span>
                        </div>
                        <div class="main_posts_post_content">
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        </div>
                        <div class="main_posts_post_comments" onclick="postDetails(${post.id})">
                            <i class="fa-solid fa-pen"></i>
                            <span>(${post.comments_count})</span>
                            <p>Comments</p>
                            <div id="postTags-${post.id}">
                            </div>
                        </div>
                    </div>
                `
                document.querySelector(".main_posts").innerHTML += content
                getTags()
            }
        }
    }catch(error){
        console.log(error)
    }
}
getPosts()