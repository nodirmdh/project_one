window.addEventListener('DOMContentLoaded', () => {
    // TABS --------------------------------------------------------------------
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    //TIMER -----------------------------------------------------------------------------------------

    const endtime = '2020-07-15'

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor(t / (1000 * 60 * 60) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', endtime)

    // MODAL -------------------------------------------------------------------------------------

    const modalItem = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
    }
    modalItem.forEach(btn => {
        btn.addEventListener('click', openModal)
    });


    function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })

    // function showModalByScroll() {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         openModal()
    //         window.removeEventListener('scroll', showModalByScroll)
    //     }
    // }

    // window.addEventListener('scroll', showModalByScroll)

    //class oop -------------------------------------------------------------------------------------

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = 10700
            this.changeToUAH()
        }

        changeToUAH() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> сум/день</div>
                    </div>
            `;
            this.parent.append(element)
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальнойценой и высоким качеством!',
        5,
        '.menu .container',
        'menu__item'
    ).render()

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, нои качественное исполнение блюд.Красная рыба, морепродукты, фрукты - ресторанное меню без походав ресторан!',
        20,
        '.menu .container',
        'menu__item'
    ).render()

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствиепродуктов животногоовса, кокоса или гречки, правильноеколичество белков за счет тотарианских.',
        10,
        '.menu .container',
        'menu__item'
    ).render()

    // FORM --------------------------------------------------------------------------------------

    const forms = document.querySelectorAll('form');

    const message = {
        loading: '/img/form/005 spinner.svg',
        success: 'Спасибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage)
            let formData = new FormData(form)

            const object = {}

            formData.forEach(function (value, key) {
                object[key] = value
            })

            // EBANOE API -----------------------------------------------------

            fetch('server.php', {
                    methods: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove()
                }).catch(() => {
                    showThanksModal(message.failure)
                    console.log('EBAN')
                    console.log(object)
                }).finally(() => {
                    form.reset()
                })
        })
    }

    // EBANOE BLAGODARNOE MODALNOE OKNO ------------------------------------------

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal()
        }, 4000)
    }


    // SlIDER

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width

    let slideIndex = 1
    let offset = 0

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length
        current.textContent = slideIndex
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    // indicators.classList.add('carousel-indicators')
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `
    slider.append(indicators)

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');


        dot.setAttribute('data-slide-to', i + 1)
        // dot.classList.add('dot')
        dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1
        }
        indicators.append(dot)
        dots.push(dot)
    }

    function deleteFoo(str){
        return +str.replace(/\D/g, '')
    }

    next.addEventListener('click', () => {
        if (offset == deleteFoo(width) * (slides.length - 1)) { //500px
            offset = 0
        } else {
            offset += deleteFoo(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    })
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteFoo(width) * (slides.length - 1)
        } else {
            offset -= deleteFoo(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo
            offset = deleteFoo(width) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px)`

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`
            } else {
                current.textContent = slideIndex
            }

            dots.forEach(dot => dot.style.opacity = '.5')
            dots[slideIndex - 1].style.opacity = 1
        })
    })

    // CALCULATOR KALORIY--------------------------------------------------------

    const result = document.querySelector('.calculating__result span')
    let sex, height, weight, age, ratio;
    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex')
    }else {
        sex = 'female'
        localStorage.setItem('sex', 'female'); 
    }
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio')
    }else {
        ratio = 1.4
        localStorage.setItem('ratio', 1.4); 
    }

    function initLocalSettings(selector,activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass)
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass)
            }
        })
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = 'ЕБАН';
            return;
        }

        if(sex === 'female'){
            //(447.6+(9.2 * вес, кг) +(3.1 * рост, см) - (4.3 * возраст,лет))
            //(88.36 + (13.4 * вес, кг) + (4.8 * рост,см) - (5.7 * возраст,лет))
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }
    }

    calcTotal()

    function getStaticInfo(parentSelector, activClass){
        const element = document.querySelectorAll(`${parentSelector} div`)

        element.forEach(elem =>{
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

    function getInformation(selector){
        const input = document.querySelector(selector)

        input.addEventListener('input', ()=>{
            if(input.value.match(/\D/g)){
                input.style.border = '3px solid red'
            }else{
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
});