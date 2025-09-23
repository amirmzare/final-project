const swiper = new Swiper(".swiper", {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 20,
    breakpoints: {
        768: {
            slidesPerView: 5,
        },
        992: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 8,
        },
    },
    // autoplay: {
    //     delay: 3000,
    // },
    rtl: true,
    navigation: {
        nextEl: ".btn-next",
        prevEl: ".btn-prev",
    },
});
