let blogs = [];
fetch("https://front-course-blog-api.vercel.app/api/blogs?limit=30")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.blogs.forEach((blog) => {
            blogs.push(blog);
        });
    })
    .catch((err) => console.error(err));

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch(`https://front-course-blog-api.vercel.app/api/blogs/${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        renderBlog(data);
        //----concat
        if (blogs) {
            const concat = blogs.filter(
                (b) => b.category === data.category && b.id !== data.id
            );
            console.log(concat);
            if (concat.length > 0) {
                $(".swiper-wrapper").html("");
                concat.forEach((b) => renderAlike(b));
                const swiper = new Swiper(".swiper", {
                    // loop: true,
                    slidesPerView: 1,
                    spaceBetween: 16,
                    breakpoints: {
                        992: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                        1300: {
                            slidesPerView: 3,
                            spaceBetween: 4,
                        },
                    },
                    rtl: true,
                    navigation: {
                        nextEl: ".btn-next",
                        prevEl: ".btn-prev",
                    },
                });
            } else {
                $(".slider").html("");
            }
        }
    })
    .catch((err) => console.error(err));

const renderBlog = (blog) => {
    $(".poster-content").html("");
    $(".explain").html("");
    const poster = `
                <h2 class="poster-title">
                    ${blog.title}
                </h2>
    `;
    const exp = `
    <img src="./assets/images/leaf.png" alt="" />
    <h2>${blog.category}</h2>
    <p>${blog.content}--${blog.content}--${blog.content}</p>
    `;

    $(".poster-content").append(poster);
    $(".explain").append(exp);
};

const concat = blogs.filter;

const renderAlike = (blog) => {
    const date = new Date(blog.publishedAt);
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        calendar: "persian",
    };
    const slider = `
                <div class="swiper-slide"> 
                    <div class="blog swiper-b">
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
    $(".swiper-wrapper").append(slider);
};
// const swiper = new Swiper(".swiper", {
//     loop: true,
//     slidesPerView: 3,
//     spaceBetween: 16,
//     // autoplay: {
//     //     delay: 3000,
//     // },
//     rtl: true,
//     navigation: {
//         nextEl: ".btn-next",
//         prevEl: ".btn-prev",
//     },
// });
