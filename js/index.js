
document.addEventListener("DOMContentLoaded", setUpPage)
function setUpPage() {
    let nameSubmission = document.getElementsByName("submit")
    document.addEventListener("click", getUserNameResults)  
}

function getUserNameResults(e) {
    e.preventDefault()
        if(e.target.name === "submit"){
        let userName = document.getElementById("search").value.toLowerCase()
        fetchResults(userName)
        fetchRepos(userName)
        stashSearchResults(userName)
    }
}

function fetchResults(input){
        fetch(`https://api.github.com/users/${input}`)
        .then(response => response.json())
        .then(data => createUserInfo(data))      
}
function fetchRepos(input){
    fetch(`https://api.github.com/users/${input}/repos`)
    .then(response => response.json())
    .then(data => createRepos(data))      
}


function createUserInfo(arr){
    console.log(arr);
    let userInfo = document.getElementById("user_info")
    userInfo.innerHTML = ""

    let searched_user = document.createElement("p")
    searched_user.innerHTML = ""
    searched_user.innerHTML = arr.login
    userInfo.appendChild(searched_user)

    let profile_link = document.createElement("p")
    profile_link.innerHTML = ""
    profile_link.innerHTML = arr.html_url
    userInfo.appendChild(profile_link)

    let img = document.createElement("img")
    profile_link.innerHTML = ""
    img.src = arr.avatar_url
    userInfo.appendChild(img)
  
}

function createRepos(arr) {
    let userRepoList = document.getElementById("repos-list")
    userRepoList.innerHTML = ""
    // console.log(arr);  
    arr.forEach(function(element) {
        let repoName = document.createElement("li")
        repoName.innerHTML = element.full_name
        userRepoList.append(repoName)
        // console.log(element);
      });
}


function stashSearchResults(input) {
    const repoList = document.getElementById("search-results")
    let searchedUserName = document.createElement("li")
    searchedUserName.innerHTML = input
    repoList.appendChild(searchedUserName)
    repoList.addEventListener("click", searchedNames)
}
// let nameList = document.querySelector("#search-results")
// console.log(nameList);

function searchedNames(){
    let newInput = event.target.innerHTML;
    fetchResults(newInput)
    fetchRepos(newInput)
    //
}


