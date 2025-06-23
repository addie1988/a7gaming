// header_top
const header = document.getElementById("header");
const spacer = document.getElementById("spacer");

if (header && spacer) {
  window.addEventListener("scroll", () => {
    try {
      if (window.scrollY > 90) {
        header.classList.add("fixed");
        spacer.classList.add("active"); // 防止內容跳動
      } else {
        header.classList.remove("fixed");
        spacer.classList.remove("active");
      }
    } catch (error) {
      console.warn("處理滾動事件時發生錯誤:", error);
    }
  });
} else {
  console.warn("找不到 header 或 spacer 元素");
}

// ----------------------------------------------------------------------------------------

// menu 漢堡選單
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    try {
      navMenu.classList.toggle("show");
    } catch (error) {
      console.warn("切換漢堡選單時發生錯誤:", error);
    }
  });
} else {
  console.warn("找不到漢堡選單相關元素");
}

// Close hamburger menu when clicking outside
window.addEventListener("click", (event) => {
  try {
    if (
      hamburger &&
      navMenu &&
      !hamburger.contains(event.target) &&
      !navMenu.contains(event.target)
    ) {
      navMenu.classList.remove("show");
    }
  } catch (error) {
    console.warn("關閉漢堡選單時發生錯誤:", error);
  }
});

// ----------------------------------------------------------------------------------------

// 錨點 scroll
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    try {
      e.preventDefault(); // 防止立即跳轉

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // 可自訂：GA 追蹤、動畫、console log 等
        console.log(`前往 ${targetId}`);

        // 關閉導覽選單
        const navMenu = document.getElementById("nav-menu");
        if (navMenu) {
          navMenu.classList.remove("show");
        }

        // 延遲 300 毫秒後滾動
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    } catch (error) {
      console.warn("處理錨點滾動時發生錯誤:", error);
    }
  });
});

// ----------------------------------------------------------------------------------------

// language 語系
function toggleDropdown(event) {
  try {
    event.preventDefault();
    const menu = document.getElementById("dropdownMenu");
    if (menu) {
      menu.classList.toggle("show");
    }
  } catch (error) {
    console.warn("切換語言下拉選單時發生錯誤:", error);
  }
}

function changeLanguage(langCode) {
  try {
    // 檢查 translations 是否存在
    if (typeof translations === "undefined") {
      console.error("Translations object is not defined.");
      return;
    }

    // 關閉下拉選單
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.classList.remove("show");
    }

    // 更新頂部圖示
    const topIcon = document.getElementById("languageIcon");
    const newIconSrc = `./images/icon_${
      langCode === "zh-CN"
        ? "1"
        : langCode === "en"
        ? "2"
        : langCode === "ja"
        ? "3"
        : "1"
    }.svg`;

    if (topIcon) {
      topIcon.src = newIconSrc;
      topIcon.alt = `icon_${langCode}`;
    }

    // 更新所有具有 data-i18n 的元素
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      try {
        const key = el.getAttribute("data-i18n");
        if (translations[langCode]?.[key]) {
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.value = translations[langCode][key];
          } else {
            el.textContent = translations[langCode][key];
          }
        }
      } catch (error) {
        console.warn("更新元素翻譯時發生錯誤:", error);
      }
    });

    // 更新彈窗內容
    const blocks = document.querySelectorAll(".block");
    blocks.forEach((block) => {
      try {
        const id = block.getAttribute("data-id");
        if (id) {
          const titleKey = `modal.${id}.title`;
          const contentKey = `modal.${id}.content`;
          if (translations[langCode]?.[titleKey]) {
            block.setAttribute("data-title", translations[langCode][titleKey]);
          }
          if (translations[langCode]?.[contentKey]) {
            block.setAttribute(
              "data-content",
              translations[langCode][contentKey]
            );
          }
        }
      } catch (error) {
        console.warn("更新彈窗內容時發生錯誤:", error);
      }
    });

    // 設置 cookie
    try {
      document.cookie = `googtrans=/en/${langCode}; path=/`;
    } catch (error) {
      console.warn("無法設置 cookie:", error);
    }

    // 設置 <html lang="">
    document.documentElement.lang = langCode;
  } catch (error) {
    console.error("切換語言時發生錯誤:", error);
  }
}

// 檢查當前語言並設置對應圖示
function setLanguageIcon() {
  try {
    const topIcon = document.getElementById("languageIcon");
    if (!topIcon) return;

    // 從 cookie 獲取當前語言
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("googtrans="));
    let currentLang = "zh-CN"; // 默認中文

    if (cookie) {
      const langCode = cookie.split("/")[2];
      currentLang = langCode;
    }

    // 設置對應圖示
    const newIconSrc = `./images/icon_${
      currentLang === "zh-CN" ? "1" : currentLang === "en" ? "2" : "1"
    }.svg`;

    topIcon.src = newIconSrc;
    topIcon.alt = `icon_${currentLang}`;

    // 初始化翻譯
    changeLanguage(currentLang);
  } catch (error) {
    console.warn("設置語言圖示時發生錯誤:", error);
    // 使用預設語言
    changeLanguage("zh-CN");
  }
}

// 頁面加載時執行
window.addEventListener("load", setLanguageIcon);

// Close dropdown menus when clicking outside
document.addEventListener("click", (event) => {
  try {
    // Close language dropdown
    const dropdownMenu = document.getElementById("dropdownMenu");
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    if (
      dropdownMenu &&
      dropdownToggle &&
      !dropdownToggle.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("show");
    }

    // Close hamburger menu
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    if (
      hamburger &&
      navMenu &&
      !hamburger.contains(event.target) &&
      !navMenu.contains(event.target)
    ) {
      navMenu.classList.remove("show");
    }

    // Close dropdown content
    if (!event.target.closest(".dropdown-toggle")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        try {
          dropdowns[i].classList.remove("show");
        } catch (error) {
          console.warn("關閉下拉選單時發生錯誤:", error);
        }
      }
    }
  } catch (error) {
    console.warn("處理點擊事件時發生錯誤:", error);
  }
});

// ----------------------------------------------------------------------------------------

//  feature 自動複製圖片以實現無縫跑馬燈
const marqueeTrack = document.getElementById("marqueeTrack");
marqueeTrack.innerHTML += marqueeTrack.innerHTML; // 無縫複製一次

// ----------------------------------------------------------------------------------------

// 交錯跑馬燈
const imageUrls = [
  "./images/games/game_1.jpg",
  "./images/games/game_2.jpg",
  "./images/games/game_3.jpg",
  "./images/games/game_4.jpg",
  "./images/games/game_5.jpg",
  "./images/games/game_6.jpg",
  "./images/games/game_7.jpg",
  "./images/games/game_8.jpg",
  "./images/games/game_9.jpg",
  "./images/games/game_10.jpg",
  "./images/games/game_11.jpg",
  "./images/games/game_12.jpg",
  "./images/games/game_13.jpg",
  "./images/games/game_14.jpg",
  "./images/games/game_15.jpg",
  "./images/games/game_16.jpg",
  "./images/games/game_17.jpg",
  "./images/games/game_18.jpg",
  "./images/games/game_19.jpg",
  "./images/games/game_20.jpg",
  "./images/games/game_21.jpg",
  "./images/games/game_22.jpg",
  "./images/games/game_23.jpg",
];

const container = document.getElementById("container");

if (container) {
  // 清空容器
  container.innerHTML = '';
  
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.className = "marquee-row";

    const track = document.createElement("div");
    track.className = "marquee-track";

    // 偶數行正常播放，奇數行反向播放達到上下交錯效果
    if (i % 2 === 1) {
      track.classList.add("reverse");
    }

    // 為每一行設置不同的動畫速度 - 增加更多變化
    // 基礎速度範圍：30-120 秒，讓每行速度差異更明顯
    const minDuration = 160;
    const maxDuration = 300;
    const speedVariation = minDuration + Math.random() * (maxDuration - minDuration);
    const animationDuration = speedVariation + (i * 3); // 每行額外增加3秒
    
    track.style.animationDuration = `${animationDuration}s`;

    // 增加複製次數確保無縫接軌 - 從5次增加到8次
    // 這樣可以確保動畫循環時有足夠的內容填充
    for (let j = 0; j < 8; j++) {
      imageUrls.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = `Game ${j + 1}`;
        img.loading = "lazy"; // 優化載入性能
        track.appendChild(img);
      });
    }

    row.appendChild(track);
    container.appendChild(row);
  }
} else {
  console.warn("找不到 container 元素");
}

// ----------------------------------------------------------------------------------------

// RWD交錯跑馬燈
const numberOfLines = 5;
const imageWidth = 200;
const imagesPerLine = 10;

// ✅ 可自訂圖片網址
const imageGroups = [
  Array.from(
    { length: imagesPerLine },
    (_, i) => `./images/games_min/games_min_${i + 1}.png`
  ),
  Array.from(
    { length: imagesPerLine },
    (_, i) => `./images/games_min/games_min_${i + 1}.png`
  ),
  Array.from(
    { length: imagesPerLine },
    (_, i) => `./images/games_min/games_min_${i + 1}.png`
  ),
  Array.from(
    { length: imagesPerLine },
    (_, i) => `./images/games_min/games_min_${i + 1}.png`
  ),
  Array.from(
    { length: imagesPerLine },
    (_, i) => `./images/games_min/games_min_${i + 1}.png`
  ),
];

const rwd_container = document.getElementById("marqueeContainer");

if (rwd_container) {
  // 清空容器
  rwd_container.innerHTML = '';
  
  for (let i = 0; i < numberOfLines; i++) {
    const line = document.createElement("div");
    line.className = "marquee-line";

    const track = document.createElement("div");
    track.className = "marquee-track";
    track.classList.add(i % 2 === 0 ? "scroll-left" : "scroll-right");

    // 為每一行設置不同的動畫速度 - 增加更多變化
    // 基礎速度範圍：15-45 秒，讓每行速度差異更明顯
    const minDuration = 15;
    const maxDuration = 45;
    const speedVariation = minDuration + Math.random() * (maxDuration - minDuration);
    const animationDuration = speedVariation + (i * 2); // 每行額外增加2秒
    const animationDelay = -Math.floor(animationDuration / 2);
    track.style.animationDuration = `${animationDuration}s`;
    track.style.animationDelay = `${animationDelay}s`;

    const urls = imageGroups[i % imageGroups.length];

    // 增加複製次數確保無縫接軌 - 從4次增加到6次
    for (let k = 0; k < 6; k++) {
      urls.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = `Game ${k + 1}`;
        img.loading = "lazy"; // 優化載入性能
        track.appendChild(img);
      });
    }

    line.appendChild(track);
    rwd_container.appendChild(line);
  }
} else {
  console.warn("找不到 marqueeContainer 元素");
}

// ----------------------------------------------------------------------------------------

// 動態控制跑馬燈速度
function adjustMarqueeSpeed(speedMultiplier = 1) {
  try {
    // 控制桌面版跑馬燈速度
    const desktopTracks = document.querySelectorAll('.marquee-container .marquee-track');
    desktopTracks.forEach((track, index) => {
      const baseDuration = 75; // 調整基礎動畫時間（30-120的平均值）
      const adjustedDuration = baseDuration / speedMultiplier;
      track.style.animationDuration = `${adjustedDuration}s`;
    });

    // 控制 RWD 跑馬燈速度
    const rwdTracks = document.querySelectorAll('.rwd_marquee-container .marquee-track');
    rwdTracks.forEach((track, index) => {
      const baseDuration = 30 + index * 3; // 調整基礎動畫時間（15-45的範圍）
      const adjustedDuration = baseDuration / speedMultiplier;
      track.style.animationDuration = `${adjustedDuration}s`;
    });

    console.log(`跑馬燈速度已調整為 ${speedMultiplier}x`);
  } catch (error) {
    console.warn("調整跑馬燈速度時發生錯誤:", error);
  }
}

// 優化無縫接軌 - 動態調整動畫
function optimizeSeamlessLoop() {
  try {
    // 確保所有跑馬燈都有足夠的內容來實現無縫接軌
    const allTracks = document.querySelectorAll('.marquee-track');
    
    allTracks.forEach((track) => {
      // 設置動畫屬性以確保無縫循環
      track.style.animationIterationCount = 'infinite';
      track.style.animationTimingFunction = 'linear';
      
      // 確保動畫不會有間隙
      track.style.willChange = 'transform';
    });

    console.log('跑馬燈無縫接軌已優化');
  } catch (error) {
    console.warn("優化無縫接軌時發生錯誤:", error);
  }
}

// 頁面載入完成後初始化跑馬燈控制
window.addEventListener('load', () => {
  // 優化無縫接軌
  optimizeSeamlessLoop();
  
  // 可選：根據設備性能調整速度
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    // 低性能設備降低速度
    adjustMarqueeSpeed(0.8);
  }
});

// 可選：提供全局函數供外部調用
window.marqueeControls = {
  adjustSpeed: adjustMarqueeSpeed,
  optimizeLoop: optimizeSeamlessLoop,
  pause: () => {
    const tracks = document.querySelectorAll('.marquee-track');
    tracks.forEach(track => {
      track.style.animationPlayState = 'paused';
    });
  },
  resume: () => {
    const tracks = document.querySelectorAll('.marquee-track');
    tracks.forEach(track => {
      track.style.animationPlayState = 'running';
    });
  }
};