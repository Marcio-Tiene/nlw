

function populateUFs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return  res.json() })
    .then( states =>{

        for( const state of states ) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexsOfSelectedstate = event.target.selectedIndex
    stateInput.value = event.target.options[indexsOfSelectedstate].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false
    } )
}






document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itensToCollect = document.querySelectorAll(".items-grid li")
for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)

}

const colectedItens = document.querySelector("input[name=items]")

let selectedItems = [] 

function handleSelectedItem(event) {
    
    const itemLi = event.target

    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    console.log(`ITEM-ID: `, itemId)

    const alreadySelected =ms.findIndex( item => {

        const itemFound =  item == itemId
        return itemFound
    } )

    if(alreadySelected >= 0) {

        const filteredItens =ms.filter(item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })

    ms = filteredItens
    } else {

    ms.push(itemId)

    }

    console.log(`selectedItems: `, selectedItems)

    colectedItens.value = selectedItems
    
}