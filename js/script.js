let count = 1;

const loadAll = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    // const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`);
    const data = await res.json();
    // console.log(data);
    const allData = data.posts;
    display(allData);
    // showDetails(allData);
    // console.log(allData);
}

const display = (allData) => {
    // console.log(allData)
    const discuss = document.getElementById("discuss-container");

    discuss.innerText = " ";

    allData.forEach(element => {
        // console.log(element.id);
        const div = document.createElement("div");
        const classes = ['border', 'border-[#797DFC]', 'rounded-3xl', 'p-10', 'space-y-3', 'w-full', 'lg:w-[90%]', 'flex-1'];
        div.classList.add(...classes);
        div.innerHTML = `
        <div class="flex gap-8">
            <div class="indicator">
                <span class="indicator-item badge  ${element.isActive?"bg-green-500":"bg-red-500"}"></span>
                <div class="grid w-20 h-20 bg-base-300 place-items-center rounded-xl"><img src="${element.image}" alt="AI Tool" /></div>
            </div>
            <div class="space-y-3">
                <div class="flex gap-6">
                    <p># ${element.category}</p>
                    <p>Author : ${element.author.name}</p>
                </div>
                <div>
                    <h3 class="text-xl font-bold">${element.title}</h3>
                </div>
                <div>
                    <p>It’s one thing to subject yourself to ha Halloween costume mishap because, hey that’s your
                        prerogative</p>
                </div>
                <hr>
                <div class="flex justify-between">
                    <div class="flex gap-5">
                        <p><i class="fa-solid fa-envelope-open-text mr-2"></i>560</p>
                        <p><i class="fa-regular fa-eye mr-2"></i>1,568</p>
                        <p><i class="fa-regular fa-clock mr-2"></i>5 min</p>
                    </div>
                    <div>
                    <button onclick="showDetails('${element.title}',${element.view_count})" class="w-8 h-8 bg-[#10B981] rounded-full"><i class="fa-solid fa-envelope text-white"></i></button>
                    </div>
                </div>
            </div>

        </div>
        
        `;

        discuss.appendChild(div);
    });

    toggleLoading(false);
}

const handelShowDetails = (id) => {
    console.log(id);
}

const showDetails = async (id,view) => {
    const readingContainer = document.getElementById("reading-container");
    // const readingContainer2 = document.getElementById("reading-container2");
    const countNumber = document.getElementById("count");
    // const countNumber2 = document.getElementById("count2");

    const classes = ['flex', 'justify-between','mt-2'];

    const div = document.createElement("div");

        div.classList.add(...classes);

        div.innerHTML = `
        <p>${id}</p>
        <p>${view}</p>
        `;

        readingContainer.appendChild(div);
        // readingContainer2.appendChild(div);
        countNumber.innerHTML = `
            <span>${count}</span>
        `;
        // countNumber2.innerHTML = `
        //     <span>${count}</span>
        // `;
        console.log(countNumber.innerText)
        count++;

}

const latestPost = async()=>{
    const post = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const allPost = await post.json();

    displayLatestPost(allPost)

    // console.log(allPost);
}

const displayLatestPost = (allPost)=>{
    const postContainer = document.getElementById("post-container");

    allPost.forEach(ele=>{
        const div = document.createElement("div");

        const classes = ['card', 'bg-base-100', 'shadow-xl', 'p-5', 'border', 'border-black'];
        div.classList.add(...classes);

        div.innerHTML = `
            <figure><img src="${ele.cover_image}"
            alt="Shoes" /></figure>
            <div class=" ">
                <p><i class="fa-solid fa-calendar-days"></i>${ele.author?.posted_date || 'No publish date'}</p>
                <h4>${ele.title}</h4>
                <p>${ele.description}</p>
                <div class="card-actions">
                    <div>

                    </div>
                    <div>
                        <h4>${ele.author.name}</h4>
                        <p>${ele.author?.designation || 'Unknown'}</p>
                    </div>
                </div>
            </div>

        `;
        
        postContainer.appendChild(div);
    
    });  
}

const searchElement = async(searchValue) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`);
    const data = await res.json();
    // console.log(data);
    const allData = data.posts;
    display(allData);
}

const handelSearch = () =>{
    toggleLoading(true);
    const searchValue = document.getElementById("search-field").value;
    searchElement(searchValue);
    
    console.log(searchValue);
}

const toggleLoading =(isLoading)=>{
    const loadingSpinner = document.getElementById("loading-spinner");
    
    if(isLoading)
    {
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

latestPost()

loadAll()