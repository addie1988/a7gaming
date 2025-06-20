// header_top
const header = document.getElementById('header');
const spacer = document.getElementById('spacer');

if (header && spacer) {
  window.addEventListener('scroll', () => {
    try {
      if (window.scrollY > 90) {
        header.classList.add('fixed');
        spacer.classList.add('active'); // 防止內容跳動
      } else {
        header.classList.remove('fixed');
        spacer.classList.remove('active');
      }
    } catch (error) {
      console.warn('處理滾動事件時發生錯誤:', error);
    }
  });
} else {
  console.warn('找不到 header 或 spacer 元素');
}

// ----------------------------------------------------------------------------------------

// menu 漢堡選單
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    try {
      navMenu.classList.toggle('show');
    } catch (error) {
      console.warn('切換漢堡選單時發生錯誤:', error);
    }
  });
} else {
  console.warn('找不到漢堡選單相關元素');
}

// Close hamburger menu when clicking outside
window.addEventListener('click', (event) => {
  try {
    if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('show');
    }
  } catch (error) {
    console.warn('關閉漢堡選單時發生錯誤:', error);
  }
});

// ----------------------------------------------------------------------------------------

// 錨點 scroll
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', (e) => {
    try {
      e.preventDefault(); // 防止立即跳轉
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 可自訂：GA 追蹤、動畫、console log 等
        console.log(`前往 ${targetId}`);
        
        // 關閉導覽選單
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
          navMenu.classList.remove('show');
        }
        
        // 延遲 300 毫秒後滾動
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    } catch (error) {
      console.warn('處理錨點滾動時發生錯誤:', error);
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
    console.warn('切換語言下拉選單時發生錯誤:', error);
  }
}

function changeLanguage(langCode) {
  try {
    // 檢查 translations 是否存在
    if (typeof translations === 'undefined') {
      console.error("Translations object is not defined.");
      return;
    }

    // 關閉下拉選單
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) {
      dropdownMenu.classList.remove('show');
    }

    // 更新頂部圖示
    const topIcon = document.getElementById('languageIcon');
    const newIconSrc = `./images/icon_${langCode === 'zh-CN' ? '1' :
      langCode === 'en' ? '2' :
        langCode === 'ja' ? '3' : '1'
      }.svg`;

    if (topIcon) {
      topIcon.src = newIconSrc;
      topIcon.alt = `icon_${langCode}`;
    }

    // 更新所有具有 data-i18n 的元素
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      try {
        const key = el.getAttribute("data-i18n");
        if (translations[langCode]?.[key]) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.value = translations[langCode][key];
          } else {
            el.textContent = translations[langCode][key];
          }
        }
      } catch (error) {
        console.warn('更新元素翻譯時發生錯誤:', error);
      }
    });

    // 更新彈窗內容
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
      try {
        const id = block.getAttribute('data-id');
        if (id) {
          const titleKey = `modal.${id}.title`;
          const contentKey = `modal.${id}.content`;
          if (translations[langCode]?.[titleKey]) {
            block.setAttribute('data-title', translations[langCode][titleKey]);
          }
          if (translations[langCode]?.[contentKey]) {
            block.setAttribute('data-content', translations[langCode][contentKey]);
          }
        }
      } catch (error) {
        console.warn('更新彈窗內容時發生錯誤:', error);
      }
    });

    // 設置 cookie
    try {
      document.cookie = `googtrans=/en/${langCode}; path=/`;
    } catch (error) {
      console.warn('無法設置 cookie:', error);
    }

    // 設置 <html lang="">
    document.documentElement.lang = langCode;
  } catch (error) {
    console.error('切換語言時發生錯誤:', error);
  }
}

// 檢查當前語言並設置對應圖示
function setLanguageIcon() {
  try {
    const topIcon = document.getElementById('languageIcon');
    if (!topIcon) return;

    // 從 cookie 獲取當前語言
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
    let currentLang = 'zh-CN'; // 默認中文

    if (cookie) {
      const langCode = cookie.split('/')[2];
      currentLang = langCode;
    }

    // 設置對應圖示
    const newIconSrc = `./images/icon_${currentLang === 'zh-CN' ? '1' :
      currentLang === 'en' ? '2' : '1'
      }.svg`;

    topIcon.src = newIconSrc;
    topIcon.alt = `icon_${currentLang}`;

    // 初始化翻譯
    changeLanguage(currentLang);
  } catch (error) {
    console.warn('設置語言圖示時發生錯誤:', error);
    // 使用預設語言
    changeLanguage('zh-CN');
  }
}

// 頁面加載時執行
window.addEventListener('load', setLanguageIcon);

// Close dropdown menus when clicking outside
document.addEventListener('click', (event) => {
  try {
    // Close language dropdown
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownMenu && dropdownToggle && !dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('show');
    }

    // Close hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      navMenu.classList.remove('show');
    }

    // Close dropdown content
    if (!event.target.closest('.dropdown-toggle')) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        try {
          dropdowns[i].classList.remove("show");
        } catch (error) {
          console.warn('關閉下拉選單時發生錯誤:', error);
        }
      }
    }
  } catch (error) {
    console.warn('處理點擊事件時發生錯誤:', error);
  }
});

// ----------------------------------------------------------------------------------------

// 自動複製圖片以實現無縫跑馬燈
const track = document.getElementById('marqueeTrack');
if (track) {
  try {
    // 複製兩次內容以確保無縫接軌
    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent + originalContent;
    
    // 計算動畫持續時間，確保平滑滾動
    const trackWidth = track.scrollWidth;
    const containerWidth = track.parentElement.offsetWidth;
    const duration = (trackWidth / 3) * 0.05; // 根據內容長度調整速度
    
    // 動態設置動畫持續時間
    track.style.animationDuration = `${duration}s`;
  } catch (error) {
    console.warn('設置跑馬燈時發生錯誤:', error);
  }
}


