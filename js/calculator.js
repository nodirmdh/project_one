function calculator() {
    // CALCULATOR KALORIY--------------------------------------------------------

    const result = document.querySelector('.calculating__result span')
    let sex, height, weight, age, ratio;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.4
        localStorage.setItem('ratio', 1.4);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass)
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            //(447.6+(9.2 * вес, кг) +(3.1 * рост, см) - (4.3 * возраст,лет))
            //(88.36 + (13.4 * вес, кг) + (4.8 * рост,см) - (5.7 * возраст,лет))
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }
    }

    calcTotal()

    function getStaticInfo(parentSelector, activClass) {
        const element = document.querySelectorAll(`${parentSelector} div`)

        element.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                console.log(ratio, sex)
                element.forEach(elem => {
                    elem.classList.remove(activClass)
                })
                e.target.classList.add(activClass)

                calcTotal()
            })
        })




    }
    getStaticInfo('#gender', 'calculating__choose-item_active')
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active')

    function getInformation(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '3px solid red'
            } else {
                input.style.border = 'none'
            }


            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
        })
        calcTotal()
    }

    getInformation('#height')
    getInformation('#weight')
    getInformation('#age')
}
calculator()