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
        <div class="flex gap-8 flex-col lg:flex-row">
            <div class="indicator">
                <span class="indicator-item badge  ${element.isActive?"bg-green-500":"bg-red-500"}"></span>
                <div class="grid w-20 h-20 bg-base-300 place-items-center"><img class="rounded-2xl" src="${element.image}" alt="AI Tool" /></div>
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
                <div class="flex justify-between items-center">
                    <div class="flex gap-5">
                        <p><i class="fa-solid fa-envelope-open-text mr-2"></i>${element.comment_count}</p>
                        <p><i class="fa-regular fa-eye mr-2"></i>${element.view_count}</p>
                        <p><i class="fa-regular fa-clock mr-2"></i>${element.posted_time} min</p>
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

const showDetails = async (title,view) => {
    const readingContainer = document.getElementById("reading-container");
    // const readingContainer2 = document.getElementById("reading-container2");
    const countNumber = document.getElementById("count");
    // const countNumber2 = document.getElementById("count2");

    const classes = ['flex','gap-3', 'justify-between','mt-2','bg-white','p-5','rounded-xl'];

    const div = document.createElement("div");

        div.classList.add(...classes);

        div.innerHTML = `
                <p>${title}</p>
                <p class="flex justify-center items-center"><i class="fa-regular fa-eye mr-1"></i>${view}</p>
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

        const classes = ['card', 'bg-base-100', 'shadow-xl', 'p-6', 'border', 'border-[#858181]'];
        div.classList.add(...classes);

        div.innerHTML = `
            <figure><img src="${ele.cover_image}"
            alt="Shoes" /></figure>
            <div class=" space-y-3 mt-5">
                <p><i class="fa-solid fa-calendar-days mr-2 text-[#858181]"></i>${ele.author?.posted_date || 'No publish date'}</p>
                <h4 class="font-extrabold ">${ele.title}</h4>
                <p class="text-[#858181]">${ele.description}</p>
                <div class="card-actions">
                    <div>

                    </div>
                    <div class="flex gap-2 mt-4">
                        <div class="w-[45px] h-[45px] rounded-2xl">
                            <img class="rounded-full" src="${ele.profile_image}" alt="AI Tool" />
                        </div>
                        <div>
                            <h4 class="font-bold">${ele.author.name}</h4>
                            <p class="text-[#858181]">${ele.author?.designation || 'Unknown'}</p>
                        </div>
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
        loadingSpinner.classList.remove('hidden');
        
        
    }else{
        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
        }, 2000);
    }
}

latestPost()

loadAll()