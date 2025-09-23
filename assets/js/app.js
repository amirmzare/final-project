jQuery.validator.addMethod(
    "ir_phone",
    function (value, element) {
        return this.optional(element) || /^09\d{9}$/.test(value);
    },
    "شماره موبایل معتبر نیست"
);

const validator = $("#form").validate({
    rules: {
        username: {
            required: true,
            minlength: 3,
        },
        phone: {
            required: true,
            ir_phone: true,
        },
        message: {
            required: true,
            minlength: 10,
        },
    },
    messages: {
        username: {
            required: "لطفاً نام و نام خانوادگی را وارد کنید",
            minlength: "حداقل ۳ کاراکتر لازم است",
        },
        phone: {
            required: "لطفاً شماره تماس را وارد کنید",
            ir_phone: "شماره موبایل معتبر نیست",
        },
        message: {
            required: "لطفاً پیام خود را وارد کنید",
            minlength: "پیام باید حداقل ۱۰ کاراکتر داشته باشد",
        },
    },
    errorPlacement: function (error, element) {
        error.addClass("text-danger mt-2");
        error.insertAfter(element.parent());
    },
});
