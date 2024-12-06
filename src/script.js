window.onload = e => {
    handle_ytvk();
}

function toggleCSSClass(target_btn, other_btns, cssclass='btn-pressed') {    
    for (let i=0; i<other_btns.length; i++) {
        other_btns[i].classList.remove(cssclass)
    }
    target_btn.classList.add(cssclass);
}

function toggleLyrics(id='', target_btn=undefined) {
    const lyrics = document.getElementById('lyric-panel');
    const childs = lyrics.children;
        
    for (let i = 0; i < childs.length; i++) {
        childs[i].hidden = true;
    }

    target_div = document.getElementById(id);
    target_div.removeAttribute('hidden');

    toggleCSSClass(target_btn, 
        document.getElementById("button-panel").children);
}



function toggleLang(lang, target_btn=undefined) {
    changeLanguage(lang);
    
    toggleCSSClass(target_btn, 
        document.getElementsByClassName('lang-btn'));    
    // hide/show widgets
    toggleWidgets(lang);
}

// LOCALIZATION
i18next
.use(i18nextHttpBackend) 
.use(i18nextBrowserLanguageDetector)
.init({
    fallbackLng: 'en', // Default language
    debug: false,
    backend: {
        loadPath: './src/langs/{{lng}}.json'
    }   
    
}, function(err, t) {
    updateContent(t);      
    updateLanguageButton();
});

function updateContent(t) {
    // Loop through translation keys and update elements with matching IDs
    const translationKeys = Object.keys(i18next.store.data[i18next.language].translation);
    translationKeys.forEach(function (key) {
      const element = document.getElementById(key);
      if (element) {
        element.innerText = t(key); // Set the translated text
      }
    });
}

function changeLanguage(lang) {
    i18next.changeLanguage(lang, function(err, t) {
        updateContent(t);
    });
}

function updateLanguageButton() {
    // Find the correct button ID based on the selected language
    const lang = i18next.language.split('-')[0]
    const btn_id = `btn-${lang}`;
    const target_btn = document.getElementById(btn_id);
    
    if (target_btn) {
        toggleCSSClass(target_btn, document.getElementsByClassName('lang-btn'));
    }

    // hide/show widgets
    toggleWidgets(lang);
}

function toggleWidgets(lang) {
    switch(lang) {
        case 'ru':
            
            showHide('ru-hide', 'en-hide');
            break;
        default:
            
            showHide('en-hide', 'ru-hide');
    }
}

const showHide = (hideClassName, showClassName) => {
    let elemnts = document.getElementsByClassName(hideClassName);
    for (let i = 0; i<elemnts.length; i++) {
        elemnts[i].hidden = true;
    }
    elemnts = document.getElementsByClassName(showClassName);
    for (let i = 0; i<elemnts.length; i++) {
        elemnts[i].removeAttribute('hidden');
    }
}


// YT vs VK Handle
const handle_ytvk = () => {
    const youtubeURL = "https://www.youtube.com/embed/RASxSpqv3fI?si=emBhprqWtOJDWAER";
    const alternateURL = "https://vk.com/video_ext.php?oid=55859077&id=456240136&hd=2&hash=1f55786e33e276bd"; 
    const iframe = document.getElementById("video");

    async function checkYouTubeAccess() {
        try {
            const response = await fetch("https://www.youtube.com/favicon.ico", { mode: 'no-cors' });
            // If fetch succeeds, YouTube is accessible
            // iframe.src = youtubeURL;
            
            // pass
        } catch (error) {
            // If fetch fails, fallback to alternate source
            iframe.src = alternateURL;
        }
    }

    checkYouTubeAccess();
}

