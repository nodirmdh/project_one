function formSet() {
    // FORM --------------------------------------------------------------------------------------
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

    // EBANOE BLAGODARNOE MODALNOE OKNO ------------------------------------------
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
                    console.log(JSON.stringify(object))
                }).finally(() => {
                    form.reset()
                })
        })
    }
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
}
formSet()