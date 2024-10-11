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
    console.log(target_btn.innerText);
    toggleCSSClass(target_btn, 
        document.getElementsByClassName('lang-btn'));    
}

// LOCALIZATION
i18next
.use(i18nextHttpBackend) 
.use(i18nextBrowserLanguageDetector)
.init({
    fallbackLng: 'en', // Default language
    debug: true,
    backend: {
        loadPath: './langs/{{lng}}.json'
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
    console.log(target_btn, btn_id)
    
    if (target_btn) {
        toggleCSSClass(target_btn, document.getElementsByClassName('lang-btn'));
    }
  }