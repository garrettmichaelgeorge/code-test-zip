// Cache DOM references
const inputEl = document.getElementById("input-zip-code")
const formEl = document.getElementById("form-zip-code")
const target = document.getElementById("target")
const template = document.getElementById("template")

formEl.addEventListener("submit", event => {
  event.preventDefault()

  const zip = inputEl.value
  const url = `https://api.zippopotam.us/us/${zip}`

  fetch(url)
    .then(response => {
      response.json()
        .then(data => {
          console.log(data)
          processData(data)
        })
    })
})

function processData(data) {
  data.places.forEach(place => processPlace(place))
}

function processPlace(place) {
  const placeKeys = Object.keys(place)

  placeKeys.forEach(key => {
    const el = cloneTemplate(template)

    el.firstElementChild.textContent = key
    el.lastElementChild.textContent = place[key]

    target.appendChild(el)
  })
}

function cloneTemplate(template) {
  return template.content.cloneNode(true)
}
