const loadAll = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    // console.log(data);
    const allData = data.posts;
    display(allData);
    // showDetails(allData);
    console.log(allData);
}

const display = (allData) => {
    // console.log(allData)
    const discuss = document.getElementById("discuss-container");

    allData.forEach(element => {
        // console.log(element.id);
        const div = document.createElement("div");
        const classes = ['border', 'border-[#797DFC]', 'rounded-3xl', 'p-10', 'space-y-3', 'w-full', 'lg:w-[90%]', 'flex-1'];
        div.classList.add(...classes);
        div.innerHTML = `
        <div class="flex gap-8">
            <div class="indicator">
                <span class="indicator-item badge badge-secondary"></span>
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
                    <button onclick="showDetails(${element.id})" class="w-8 h-8 bg-[#10B981] rounded-full"><i class="fa-solid fa-envelope text-white"></i></button>
                    </div>
                </div>
            </div>

        </div>
        
        `;

        discuss.appendChild(div);
    });
}

const handelShowDetails = (id) => {
    console.log(id);
}

const showDetails = async (id) => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts?category/${id}');
    const data = await res.json();
    const postDetails = data.posts;
    console.log(postDetails);
    const readingContainer = document.getElementById("reading-container");

    const p1 = document.createElement("p");
        const p2 = document.createElement("p");

        p1.innerHTML = `<p>${postDetails.title}</p>`;
        p2.innerHTML = `<p>${postDetails.view_count}</p>`;

        readingContainer.appendChild(p1);
        readingContainer.appendChild(p2);

}

loadAll()