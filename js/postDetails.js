// target post by id
let id;
function getId(){
    id = new URLSearchParams(window.location.search)
    id = id.get("postId")
}
getId()

// get post and comment
async function getPost(){
    try{
        document.querySelector(".container-loader").classList.remove("loader-hide")
        let result = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        document.querySelector(".container-loader").classList.add("loader-hide")
        let post = result.data.data
        // get avatar
        let avatar = ""
        function checkAvatar(){
            if(Object.keys(post.author.profile_image).length === 0){
                avatar = "images/avatar.jpg"
            }else{
                avatar = post.author.profile_image
            }
        }
        checkAvatar()
        // check user login or logout
        let sendComment = ``
        if(window.localStorage.length === 2){
            sendComment = `
                <div class="main_posts_post_sendComment">
                    <input type="text" placeholder="Send A Comment .." id="newCommentInput">
                    <button onclick="createNewComment()">Send</button>
                </div>
            `
        }
        let content = `
            <div class="main_posts_post" style="cursor: default;">
                <div class="main_posts_post_head">
                    <div class="main_posts_post_head_left">
                        <img src="${avatar}" alt="">
                        <h2>${post.author.username}</h2>
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
                <div class="main_posts_post_comments">
                    <i class="fa-solid fa-pen"></i>
                    <span>(${post.comments_count})</span>
                    <p>Comments</p>
                    <div id="postTags">
                    </div>
                </div>
                <div class="main_posts_post_users-comments">
                </div>
                ${sendComment}
            </div>
        `
        if(Object.keys(post.image).length === 0){
            document.querySelector(".main_posts").innerHTML = content
            document.querySelector(".main_posts_post_img").innerHTML = ""
            // get tags
            document.getElementById(`postTags`).innerHTML = ""
            let postTagsContent = ``
            if(post.tags.length >= 1){
                for(tag of post.tags){
                    postTagsContent =`
                        <b>${tag.name}</b>
                    `
                    document.getElementById(`postTags`).innerHTML += postTagsContent
                }
            }else{
                postTagsContent =`
                    <b>No Tags</b>
                `
                document.getElementById(`postTags`).innerHTML = postTagsContent
            }
        }else{
            document.querySelector(".main_posts").innerHTML = content
            // get tags
            document.getElementById(`postTags`).innerHTML = ""
            let postTagsContent = ``
            if(post.tags.length >= 1){
                for(tag of post.tags){
                    postTagsContent =`
                        <b>${tag.name}</b>
                    `
                    document.getElementById(`postTags`).innerHTML += postTagsContent
                }
            }else{
                postTagsContent =`
                    <b>No Tags</b>
                `
                document.getElementById(`postTags`).innerHTML = postTagsContent
            }
        }
        
        if(post.comments.length < 1){
            document.querySelector(".main_posts_post_users-comments").innerHTML = "No Comments"
        }else{
            for(comment of post.comments){
                let avatarComment = ""
                function checkAvatarComment(){
                    if(Object.keys(comment.author.profile_image).length === 0){
                        avatarComment = "images/avatar.jpg"
                    }else{
                        avatarComment = comment.author.profile_image
                    }
                }
                checkAvatarComment()
                let comments = `
                    <div class="main_posts_post_users-comments_comment">
                        <div class="main_posts_post_users-comments_comment_header">
                            <img src="${avatarComment}" alt="avatar">
                            <h2>${comment.author.name}</h2>
                        </div>
                        <div class="main_posts_post_users-comments_comment_body">
                            <p>${comment.body}</p>
                        </div>
                    </div>
                `
                document.querySelector(".main_posts_post_users-comments").innerHTML += comments
            }
        }
    }catch(error){
        console.log(error)
    }
}
getPost()

// create new comment
async function createNewComment(){
    let commentBody = document.getElementById("newCommentInput").value
    let params = {
        "body" : commentBody
    }
    let token = window.localStorage.getItem("token")
    try{
        document.querySelector(".container-loader").classList.remove("loader-hide")
        let response = await axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,params,{
            headers : {
                "authorization" : `Bearer ${token}`
            }
        })
        document.querySelector(".container-loader").classList.add("loader-hide")
        myAlert("New Comment Has Been Created","#22bb33")
        getPost()
    }catch(error){
        let message = error.response.data.message
        myAlert(message,"#bb2124")
    }
}