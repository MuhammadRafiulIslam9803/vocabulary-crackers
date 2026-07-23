const loadVocabularyBtn = () => {
    const url = `https://openapi.programming-hero.com/api/levels/all`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVocabularyBtn(data.data))
}
// id: 101
// lessonName: "Basic Vocabulary"
// level_no: 1

const displayVocabularyBtn = (vocabularyBtn) => {
    const vocabularyContainer = document.getElementById('vocabulary-container-btn');
    vocabularyContainer.innerHTML = '';

    vocabularyBtn.forEach(vocabulary => {
        const div = document.createElement('div');
        div.innerHTML = `
          <button class="btn btn-outline btn-accent"><i
                        class="fa-solid fa-book-open-reader"></i>Lesson ${vocabulary.level_no}</button>
        `
        vocabularyContainer.appendChild(div);
    });


}

loadVocabularyBtn();