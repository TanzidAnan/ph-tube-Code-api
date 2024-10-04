// console.log(215)

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
    const vidoesContainer = document.getElementById('videos')
    videos.forEach(video => {
        console.log(video);
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML = `
         <figure>
         <img src=${video.thumbnail}
         alt="Shoes" />
         </figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
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
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;
        categoryContiner.append(button)
    })
}


loadCategories()
loadVideos()