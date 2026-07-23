
// for load vocabulary btn
// when browser load then show all vocabulary

const loadVocabularyBtn = () => {
    const url = `https://openapi.programming-hero.com/api/levels/all`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayVocabularyBtn(data.data))
}
// id: 101
// lessonName: "Basic Vocabulary"
// level_no: 1

// btn show korar function


const displayVocabularyBtn = (vocabularyBtn) => {
    const vocabularyContainer = document.getElementById('vocabulary-container-btn');
    vocabularyContainer.innerHTML = '';

    vocabularyBtn.forEach(vocabulary => {
        const div = document.createElement('div');
        div.innerHTML = `
          <button onclick="singleVocabularyLoader(${vocabulary.level_no})" class="btn btn-outline btn-accent"><i
                        class="fa-solid fa-book-open-reader"></i>Lesson ${vocabulary.level_no}</button>
        `
        vocabularyContainer.appendChild(div);
    });


}

// ekane singe card er jonno data load hocce vocabularyr 


const singleVocabularyLoader = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleVocabulary(data.data))
}


// id: 72
// level:1
// meaning:"বড়"
// pronunciation:"বিগ"
// word:"Big"

// when someone click the button of vocabulary then show the vocabulary container with card
// container er vitore vocabulary load hobe

const displaySingleVocabulary = (vocabulary) => {
    const vocabularyContainer = document.getElementById('vocabulary-container');
    vocabularyContainer.innerHTML = '';

    if (vocabulary.length === 0) {
        vocabularyContainer.innerHTML = `
        <h1 class="col-span-3 text-center text-2xl">
            No Vocabulary Found
        </h1>
        `;
        return;
    }

    vocabulary.forEach(vocabulary => {
        const div = document.createElement('div');
        div.innerHTML = `
          <div class="shadow-2xl rounded-lg  p-10 bg-white h-full">
                    <h4 class="text-center text-2xl font-semibold">${vocabulary.word}</h4>
                    <p class="font-semibold text-center my-3">Meaning /Pronounciation</p>
                    <p class="font-semibold text-cyan-400 text-center">${vocabulary.meaning} / ${vocabulary.pronunciation}</p>
                    <div class="flex justify-between items-center mt-10">

                        <button data-id="${vocabulary.id}" class=" vocabulary-info w-12 h-12 rounded-full bg-cyan-100 hover:bg-cyan-100 transition flex justify-center items-center">
                            <i class="fa-solid fa-circle-info text-xl text-cyan-600 hover:text-cyan-600"></i>
                        </button>

                        <button class="w-12 h-12 rounded-full bg-cyan-100 hover:bg-cyan-100 transition flex justify-center items-center">
                            <i class="fa-solid fa-volume-high text-xl text-cyan-600 hover:text-cyan-600"></i>
                        </button>

                    </div>
         </div>
        `
        vocabularyContainer.appendChild(div);
    });
}

// modal open korar jonno id ta nicce 
// onclick na bebohar kore

const vocabularyContainer = document.getElementById('vocabulary-container');
vocabularyContainer.addEventListener("click", (event) => {
    const vocabularyInfo = event.target.closest(".vocabulary-info");
    if (vocabularyInfo) {
        // const vocabularyId = vocabularyInfo.getAttribute("data-vId");
        const vocabularyId = vocabularyInfo.dataset.id;

        // console.log(vocabularyId);
        // console.log(vocabularyInfo.dataset);

        const url = `https://openapi.programming-hero.com/api/word/${vocabularyId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayVocabularyModal(data.data))
    }

})

// jokon details button e click korbe show hbe modal er jonno data ekane

// {
//   "id": 5,
//   "word": "Eager",
//   "pronunciation": "ইগার",
//   "meaning": "আগ্রহী",
//   "partsOfSpeech": "adjective",
//   "level": 1,
//   "points": 1,
//   "synonyms": [
//     "enthusiastic",
//     "excited",
//     "keen"
//   ],
//   "sentence": "The kids were eager to open their gifts."
// }

const displayVocabularyModal = (details) => {
    console.log(details);

    const vocabularyModal = document.getElementById('vocabulary-modal');
    vocabularyModal.innerHTML = '';

    const div = document.createElement('div');
    div.innerHTML = `
                <div class="bg-white rounded-2xl p-10 w-[450px] shadow-2xl grid grid-cols-1 space-y-3">
                    <h4 class="text-2xl font-semibold ">${details.word} (<span> <i
                                class="fa-solid fa-microphone-lines"></i></span>
                        :
                        ${details.pronunciation})</h4>
                    <h4 class="text-xl font-semibold">Meaning</h4>
                    <p class="font-medium text-sm">${details.meaning}</p>
                    <h4 class="text-xl font-semibold">Example</h4>
                    <p class="font-medium text-sm">${details.sentence}.</p>
                    <h4 class="text-xl font-semibold my-3">সমার্থক শব্দ
                        গুলো</h4>
                    <div class="flex flex-row gap-5 mb-5">
                        ${details.synonyms.map(item => `
                                <p class="border bg-cyan-100 rounded font-medium px-2 py-0.5">
                                    ${item}
                                </p>
                            `).join("")
        }
                    </div>
                    <button
                        id="close-modal"
                        class="btn btn-active btn-accent w-1/2 text-white"><i
                            class="fa-solid fa-memory"></i> Complete Learning
                    </button>

                </div>
    `;
    vocabularyModal.appendChild(div);

    // ekane modal set kora sec tai hidden bad dilam jate deka jai
    vocabularyModal.classList.remove("hidden");

    // modal ta close korar jonno jate complete learning button e click korle bondo hoi 
    const closeBtn = document.getElementById("close-modal");
    closeBtn.addEventListener("click", () => {
        vocabularyModal.classList.add("hidden");
    });
}

// modal er baire click korle jate modal bondo hoi er jonno 

const vocabularyModal = document.getElementById('vocabulary-modal');
vocabularyModal.addEventListener("click", (event)=>{
    if(event.target === vocabularyModal){
        vocabularyModal.classList.add("hidden");
    }
});

loadVocabularyBtn();