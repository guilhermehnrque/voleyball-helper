const playersForm = document.getElementById('players')
const playersQuantityBadge = document.getElementById('playersQuantityBadge')
let playersNamesDOM = document.getElementById('playersNameList');
let tablesArea = document.getElementById('tables-area')
let tablesPlayers = document.getElementById('tables-players')

playersForm.addEventListener('submit', (event) => {
    const eventName = document.getElementById('gameTitle').val
    const playersNameList = playersNamesDOM.value.split('\n')
    const playersNameShuffled = playersNameList.sort(() => Math.random() - 0.5)
    const businessRules = decider(playersNameList.length)

    const spliced = chunk(playersNameShuffled, businessRules)

    renderTable(spliced)
    event.preventDefault();
})

playersNamesDOM.addEventListener('keyup', (event) => {
    let playersNameList = playersNamesDOM.value.split('\n')
    playersQuantityBadge.innerText = playersNameList.length
})

function chunk(items, size) {
    const chunks = []
    items = [].concat(...items)

    while (items.length) {
        chunks.push(
            items.splice(0, size)
        )
    }

    return chunks
}

function decider(value) {
    if (value < 8) {
        return 3
    }

    if (value >= 8 && value < 12) {
        return 4
    }

    if (value >= 12) {
        return 6
    }
}

function createTable(tableId) {
    let table = `
            <table class="table table-bordered" id="table-team-${tableId}">
                <thead class="table-light"> 
                    <tr><th>Equipe ${tableId + 1}</th></tr>
                </table>
                <tbody>
                </tbody>
            </table>` 

    tablesPlayers.innerHTML += table
}

function renderTable(data) {
    tablesArea.classList.remove('visually-hidden')
    tablesPlayers.innerHTML = ''
    data.forEach((external, index) => {
        createTable(index)

        let tableCreated = document.querySelector(`#table-team-${index}`)

        external.forEach((internal) => {
            let tableRow = `
                    <tr>
                        <td>${internal}</td>
                    </tr>`

           tableCreated.innerHTML += tableRow
        });
    });
}

function cleanInputsAndTableArea() {
    tablesArea.classList.add('visually-hidden')
    tablesPlayers.innerHTML = ''
    playersNamesDOM.value = ''
}
