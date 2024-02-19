const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const previewImg = document.querySelector(".preview-img img");
const beforeEditImg = document.querySelector(".before-edit-img img");
const resetFilterBtn = document.querySelector(".reset-filter");
const chooseImgBtn = document.querySelector("#chooseImageBtn");
const saveImgBtn = document.querySelector(".save-img");

let brightness = 100,
    grayscale = 0,
    blackNWhite = 0;
let sepia = 0,
    saturate = 100,
    hueRotate = 0;
let blurValue = 0,
    opacityValue = 100,
    contrastValue = 100,
    saturationValue = 100;
let redValue = 100,
    greenValue = 100,
    blueValue = 100;
let rotate = 0,
    flipHorizontal = 1,
    flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = function () {
        const imageData = reader.result;
        previewImg.src = imageData;
        beforeEditImg.src = imageData; // Update before-edited image
        previewImg.addEventListener("load", () => {
            resetFilterBtn.click();
            document.querySelector(".container").classList.remove("disable");
        });
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};

const applyFilter = () => {
    previewImg.style.filter = `brightness(${brightness}%) grayscale(${grayscale}%) sepia(${sepia}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg) blur(${blurValue}px) contrast(${contrastValue}%) opacity(${opacityValue}%) saturate(${saturationValue}%)`;

    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
};

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if (option.id === "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        } else if (option.id === "black-n-white") {
            filterSlider.max = "100";
            filterSlider.value = blackNWhite;
            filterValue.innerText = `${blackNWhite}%`;
        } else if (option.id === "sepia") {
            filterSlider.max = "100";
            filterSlider.value = sepia;
            filterValue.innerText = `${sepia}%`;
        } else if (option.id === "saturate") {
            filterSlider.max = "200";
            filterSlider.value = saturate;
            filterValue.innerText = `${saturate}%`;
        } // Add more conditions for other filters
        applyFilter();
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");
    if (selectedFilter.id === "brightness") {
        brightness = parseInt(filterSlider.value);
    } else if (selectedFilter.id === "grayscale") {
        grayscale = parseInt(filterSlider.value);
    } else if (selectedFilter.id === "black-n-white") {
        blackNWhite = parseInt(filterSlider.value);
    } else if (selectedFilter.id === "sepia") {
        sepia = parseInt(filterSlider.value);
    } else if (selectedFilter.id === "saturate") {
        saturate = parseInt(filterSlider.value);
    } // Add more conditions for other filters
    applyFilter();
};

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90;
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = 100;
    grayscale = 0;
    blackNWhite = 0;
    sepia = 0;
    saturate = 100;
    hueRotate = 0;
    blurValue = 0;
    opacityValue = 100;
    contrastValue = 100;
    saturationValue = 100;
    redValue = 100;
    greenValue = 100;
    blueValue = 100;
    filterOptions.forEach(option => {
        if (option.id === "black-n-white") {
            filterValue.innerText = `0%`; // Reset the filter value display
        }
    });
    filterOptions[0].click(); // Activate the default filter option
    filterSlider.value = 0; // Reset slider value
    applyFilter(); // Apply the reset filters
};

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) grayscale(${grayscale}%) sepia(${sepia}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg) blur(${blurValue}px) contrast(${contrastValue}%) opacity(${opacityValue}%) saturate(${saturationValue}%) invert(${100 - redValue}%) sepia(${100 - greenValue}%) saturate(${100 - blueValue}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
};

filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
