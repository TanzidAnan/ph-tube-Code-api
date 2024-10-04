// console.log(215)
function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60
    return `${hour}Hour ${minute} minute ${remainingSecond} second ago`
}
const removeActiveClass =() =>{
    const buttons =document.getElementsByClassName('category-btn');
    // console.log(buttons)
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}  
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

const loadCategoryVideos =(id) =>{
    alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeBtn =document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch(error => console.log(error))
}
const loadDetalis =async (videoId) =>{
    console.log(videoId);
    const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data = await res.json();
    displayDetalis(data.video)
}
const displayDetalis =(video) =>{
    console.log(video);
    const detailContent =document.getElementById('modal-content');
    detailContent.innerHTML = `
    <img src=${video.thumbnail} alt="">
    <p>${video.description}</p>
    `

    document.getElementById('showModalData').click()
}

const cardDamo =
{
    "category_id": "1003",
    "video_id": "aaaj",
    "thumbnail": "https://i.ibb.co/xgWL3vQ/kid-gorgeous.jpg",
    "title": "Kid Gorgeous",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/xsfkwN2/john.jpg",
            "profile_name": "John Mulaney",
            "verified": true
        }
    ],
    "others": {
        "views": "241K",
        "posted_date": ""
    },
    "description": "John Mulaney's 'Kid Gorgeous' has captured the hearts of many with 241K views. As a verified comedian, John delivers a masterclass in stand-up with clever anecdotes, quick wit, and relatable humor. This performance is a laugh-filled adventure through his unique take on life, politics, and pop culture."

}
const displayVideos = (videos) => {
    // console.log(videos)
    const vidoesContainer = document.getElementById('videos');
    vidoesContainer.innerHTML ="";
    if(videos.length ===0){
        vidoesContainer.innerHTML =`
        <div class="min-h-[400px] flex flex-col gap-5 justify-center items-center">
             <img src="../Logo.png" alt="">
             <h2>Content Hear in this </h2>
        </div>
        `;
        return;
    }
    videos.forEach(video => {
        // console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML = `
         <figure class="h-[200px] relative">
         <img src=${video.thumbnail}
         alt="Shoes" class="w-full h-full  object-cover" />
         ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white text-sm">${getTimeString(video.others.posted_date)}</span>`
            }
         
         </figure>
        <div class="px-0 py-2 flex gap-2">
          <div>
          <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
          </div>
          <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
            <p class="text-gray-400">${video.authors[0].profile_name}</p> 
          ${video.authors[0].verified === true ? `<img class="bg-red-300 rounded-full" src="https://img.icons8.com/?size=24&id=5y6kuxvatiu0&format=png" alt="">` : ""}
        </div>
        
        <p><button onclick="loadDetalis('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
    </div>
      </div>
      </div>
        
        `
        vidoesContainer.appendChild(card)
    })
}

const displayCategories = (categories) => {
    const categoryContiner = document.getElementById('categorys')
    // console.log(data)
    categories.forEach(item => {
        // console.log(item)
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =`
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>
        `
        categoryContiner.append(buttonContainer)
    })
}


loadCategories()
loadVideos()