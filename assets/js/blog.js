// ------- get All blog -----------------
let blogs = [];
let filterBlog = [];
const perPage = 9; // تعداد بلاگ در هر صفحه
let currentPage = 1;
const getAll = () => {
    fetch("https://front-course-blog-api.vercel.app/api/blogs?limit=30")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            blogs = data.blogs;
            filterBlog = blogs;
            renderPage(currentPage);
            renderPagination();
        })
        .catch((err) => console.error(err));
};
getAll();

// گرفتن داده‌ها از API

// نمایش بلاگ‌ها برای صفحه مشخص
function renderPage(page) {
    const container = $(".blog-container").html("");

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageBlogs = filterBlog.slice(start, end);

    renderBlog(pageBlogs);
}
// رندر دکمه‌های صفحه‌بندی
function renderPagination() {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filterBlog.length / perPage);

    // دکمه قبلی
    const prevBtn = document.createElement("button");
    prevBtn.classList.add("pagination-arrow");
    prevBtn.innerHTML += '<i class="fa-solid fa-arrow-right fa-sm"></i>';
    prevBtn.innerHTML += "قبلی";
    prevBtn.disabled = currentPage === 1; // غیرفعال اگه صفحه اولی
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
            renderPagination();
            window.scrollTo({ top: 400, behavior: "smooth" });
        }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("pagination-btn");
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            renderPage(currentPage);
            renderPagination();
            // 👇 بعد از تغییر صفحه، اسکرول به بالا
            window.scrollTo({ top: 400, behavior: "smooth" });
        });
        pagination.appendChild(btn);
    }
    // دکمه بعدی
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("pagination-arrow");
    nextBtn.innerHTML += "بعدی";
    nextBtn.innerHTML += '<i class="fa-solid fa-arrow-left fa-sm"></i>';
    nextBtn.disabled = currentPage === totalPages; // غیرفعال اگه آخرین صفحه‌ای
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
            renderPagination();
            window.scrollTo({ top: 400, behavior: "smooth" });
        }
    });
    pagination.appendChild(nextBtn);
}

const renderBlog = (blogs) => {
    $(".blog-container").html("");
    blogs.forEach((blog) => {
        const date = new Date(blog.publishedAt);
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            calendar: "persian",
        };
        const khabar = `
                <div class="col-lg-4 col-md-6 col-sm-10 col-12">
                    <div class="blog">
                        <img src="./assets/images/blog1.png" alt="" />
                        <div class="blog-title">
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-circle-exclamation" style="color: #1c644e"></i>
                                ${blog.category}
                            </div>
                            <div class="share d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-share-nodes" style="color: #237d61;"></i>
                            </div>
                        </div>
                        <div class="sec2">
                            <p class="sec2-p1"> ${blog.title}</p>
                            <p class="sec2-p2 p-blog">
                              ${blog.content}
                            </p>
                        </div>
                        <div class="date-holder">
                            <span class="date">
                                <i
                                    class="fa-solid fa-calendar-days"
                                    style="color: #7b7b7b"
                                ></i>
                                ${new Intl.DateTimeFormat(
                                    "fa-IR",
                                    options
                                ).format(date)}
                            </span>
                            <span class="date">
                                <i
                                    class="fa-solid fa-eye"
                                    style="color: #7b7b7b"
                                ></i>
                                ${blog.readTime}
                            </span>
                        </div>
                        <a href="./details.html?id=${blog.id}" target="_blank">
                        <button class="btn-all blog-btn">
                            <i class="fa-solid fa-plus"></i>
                            <span> مشاهده بیشتر</span>
                        </button>
                        </a>
                    </div>
                </div>
    `;
        $(".blog-container").append(khabar);
    });
};

const getCategories = () => {
    const categories = [];
    fetch("https://front-course-blog-api.vercel.app/api/categories")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            data.forEach((d) => {
                categories.push(d.name);
                renderCategory(d.name);
            });
        });
    // console.log(categories);
};
getCategories();

const renderCategory = (name) => {
    const cat = `
    <div class="cat">${name}</div>
    `;
    $(".category").append(cat);
};

$(".category").on("click", ".cat", async (event) => {
    const cat = $(event.target);
    $(".cat").removeClass("selected");
    cat.addClass("selected");

    if (cat.text() === "همه") {
        filterBlog = blogs;
    } else {
        filterBlog = blogs.filter((blog) => blog.category === cat.text());
    }
    currentPage = 1;
    renderPage(currentPage);
    renderPagination();
});
