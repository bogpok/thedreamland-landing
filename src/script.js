function toggleLyrics(id='', target_btn=undefined) {
    const lyrics = document.getElementById('lyric-panel');
    const childs = lyrics.children;
        
    for (let i = 0; i < childs.length; i++) {
        childs[i].hidden = true;
    }

    target_div = document.getElementById(id);
    target_div.removeAttribute('hidden');

    other_btns = document.getElementById("button-panel").children;
    for (let i=0; i<other_btns.length; i++) {
        other_btns[i].classList.remove('btn-pressed')
    }

    target_btn.classList.add('btn-pressed');
}

// LOCALIZATION
i18next
.use(i18nextHttpBackend) 
.use(i18nextBrowserLanguageDetector)
.init({
    fallbackLng: 'en', // Default languageб
    debug: true,
    backend: {
        loadPath: './langs/{{lng}}.json'
    }   
    
}, function(err, t) {
    updateContent(t);
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