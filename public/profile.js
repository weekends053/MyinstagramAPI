const addInfo = (res) => {
    const profile = document.querySelector(".profile");
    let html = "";
    html +=`
    <div class="con">
    <div class="left">
    <img class="photo_user" src="${res.profile_image.large}" />
    </div>
    <div class="right">
    <h1 class="username">${res.username}</h1>
    <div class="other">
      ${res.total_photos} <a class="posts">posts</a>
      ${res.followers_count} <a class="followers">followers</a>
      ${res.following_count} <a class="following">following</a>
    </div>
    <h1 class="status">${res.bio}<h1>
    </div>
    </div>
    <span></span>
    `;

    profile.innerHTML = html;
  };
  
  const callAPI = async (username) => {
    try {
      console.log("username --> ", username);
      const response = await fetch("/api/searchUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
  //6. Add images to gallery
      addInfo(res);
    } catch (error) {
      console.log("message error --->", error);
    }
  };

  const addphoto = (res) => {
    const photo = document.querySelector(".photo");
    let html = "";
    res.forEach((element) => {
    html +=`
      <img class="img" src="${element.urls.regular}"/>
    `;
});
    photo.innerHTML = html;
  };
  const callAPIphoto = async (username) => {
    try {
      console.log("username --> ", username);
      const response = await fetch("/api/searchPhoto", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
  //6. Add images to gallery
      addphoto(res);
    } catch (error) {
      console.log("message error --->", error);
    }
  };
  
  

  const main = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.has('username')){
        const username = urlParams.get('username');
        console.log('username -->', username);
        callAPI(username);
        callAPIphoto(username);
    }
    else{
        console.log('Username is missing');
    }
  };
   
  main();
  
  