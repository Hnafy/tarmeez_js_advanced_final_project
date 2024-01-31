// get posts and pagination
let page = 0;
let lastPage = 1;
async function getPosts(page = 1){
    try{
        document.querySelector(".container-loader").classList.remove("loader-hide")
        let result = await axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=2&page=${page}`)
        document.querySelector(".container-loader").classList.add("loader-hide")
        let posts = result.data.data
        lastPage = result.data.meta.last_page
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
                            <div class="main_posts_post_head_left" onclick="userClicked(${post.author.id})">
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
                            <div class="main_posts_post_head_left" onclick="userClicked(${post.author.id})">
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

// infinity scroll
window.addEventListener("scroll", function () {
    setTimeout(() => {
        loadMoreList();
    }, 1500);
});
function loadMoreList() {
    let scrollY = window.scrollY;
    let innerHeight = window.innerHeight;
    let offsetHeight = document.body.offsetHeight;
    if(page === 1){
        document.querySelector(".main_posts").innerHTML = ""
    }
    if (scrollY + innerHeight > offsetHeight - 100 && page < lastPage) {
        page +=1
        getPosts(page)
    }
}

// go to profile page user login
function profile(postId){
    // window.localStorage.setItem("scrollY",window.scrollY)
    window.location = `postDetails.html?postId=${postId}`
}

// go to profile page any user
function userClicked(userId){
    window.location = `profile.html?postId=${userId}`
}