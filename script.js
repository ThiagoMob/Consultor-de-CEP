let buttonSubmit = document.querySelector('#app form button')
let zipCodeField = document.querySelector('#app form input')
let content = document.querySelector('#app main')

buttonSubmit.addEventListener('click', run)

function run(event){
    event.preventDefault()

    let zipeCode = zipCodeField.value 
    zipeCode = zipeCode.replace(' ', '')
    zipeCode = zipeCode.replace('.', '')

    zipeCode = zipeCode.trim()

    axios.get('https://viacep.com.br/ws/' + zipeCode + '/json/').then(function(response){
        if(response.data.erro ){
            throw new Error('CEP invalido') 
        }

        content.innerHTML = ''

        createLine(response.data.logradouro)
        createLine(response.data.localidade + ' / ' + response.data.uf)
        createLine(response.data.bairro)
        
    }).catch(function(error){
        content.innerHTML = ''

        console.log(error)
        createLine('Ops, algo deu errado!')
    })
}

function createLine(text){
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}