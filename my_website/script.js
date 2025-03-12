// 背景图片轮播
const slideshow = document.querySelector('.background-slideshow');
const slides = document.querySelectorAll('.background-slideshow .slide');
let currentIndex = 0;

function showNextSlide() {
    // 隐藏当前幻灯片
    slides[currentIndex].classList.remove('active');
    
    // 计算下一张幻灯片的索引
    currentIndex = (currentIndex + 1) % slides.length;
    
    // 显示下一张幻灯片
    slides[currentIndex].classList.add('active');
}

// 每5秒切换一次
setInterval(showNextSlide, 5000);

// 图片懒加载
document.addEventListener("DOMContentLoaded", function() {
    const lazyloadImages = document.querySelectorAll(".lazyload");
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazyload");
                img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    });

    lazyloadImages.forEach(function(img) {
        imageObserver.observe(img);
    });
});

// 灯箱功能
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        lightbox.style.display = 'block';
        lightboxImg.src = this.src;
        lightboxCaption.textContent = this.alt;
        
        // 添加加载动画
        lightboxImg.classList.remove('loaded');
        lightboxImg.onload = function() {
            lightboxImg.classList.add('loaded');
        };
    });
});

closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', function(e) {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});
