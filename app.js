const addButton = document.querySelector(".add")
const sortButton = document.querySelector(".sort")
const resetButton = document.querySelector(".restart")

const nameInput = document.querySelector("#names")
const listElement = document.querySelector(".list")
const errorElement = document.querySelector(".erro")
const resultElement = document.querySelector(".result")

let friends = []

const validateFriend = (name) => name.trim().length > 2
const isNameUnique = (name, list) => !list.includes(name)
const clearInput = () => nameInput.value = ''
const clearError = () => errorElement.textContent = ''
const showError = (message) => errorElement.textContent = `ERRO: ${message}`

const updateList = (list) => listElement.textContent = list.join(', ')

const shuffleNames = (list) => {
    return list
        .map((name) => ({ name, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ name }) => name)
}

const drawNames = (list) => {
    return list.map((name, index) => {
        const nextIndex = (index + 1) % list.length
        return `${name} tirou ${list[nextIndex]}`
    })
}

const addFriend = () => {
    const name = nameInput.value.trim()

    if (!validateFriend(name)) {
        showError('Insira um nome válido (mais de 2 caracteres).')
        return
    }

    if (!isNameUnique(name, friends)) {
        showError(`${name} já está na lista. Adicione outro nome.`)
        return
    }

    clearError()
    friends = [...friends, name]
    updateList(friends)
    clearInput()
}

const resetGame = () => {
    friends = []
    nameInput.value = ''
    listElement.innerHTML = ''
    resultElement.innerHTML = ''
    clearError()
}

const performDraw = () => {
    if (friends.length < 4) {
        showError('Adicione pelo menos 4 nomes para sortear.')
        return
    }

    const shuffledFriends = shuffleNames(friends)
    const resultTexts = drawNames(shuffledFriends)

    resultElement.innerHTML = resultTexts
        .map((text) => `<span>${text}</span>`)
        .join('')
}

addButton.addEventListener('click', addFriend)
nameInput.addEventListener('click', clearInput)
resetButton.addEventListener('click', resetGame)
sortButton.addEventListener('click', performDraw)

resetGame()