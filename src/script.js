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