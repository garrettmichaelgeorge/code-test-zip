// Cache DOM references
const inputEl = document.getElementById("input-zip-code")
const formEl = document.getElementById("form-zip-code")
const target = document.getElementById("target")
const template = document.getElementById("template")
const body = document.body

formEl.addEventListener("submit", event => {
  event.preventDefault()

  const zip = inputEl.value
  const url = `https://api.zippopotam.us/us/${zip}`

  fetchDataFrom(url)
})

function fetchDataFrom(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) throw response

        response.json()
          .then(data => {
            const zip = new Zip(data)
            zip.render()
          })
      })
    .catch(_error => {
      alert("Invalid zip code!")
    })
}

class Zip {
  constructor (data) {
    this.data = data
  }

  get places () {
    return this.data.places
  }

  get place () {
    return this.places[0]
  }

  get stateAbbreviation () {
    return this.place["state abbreviation"]
  }

  render () {
    target.innerHTML = ""

    this.places.forEach(place => {
      this._renderPlace(place)
    })

    requestAnimationFrame(() => {
      body.classList.toggle("dark-mode")
      body.classList.toggle("light-mode")
    })
  }

  _renderPlace (place) {
    const placeKeys = Object.keys(place)

    placeKeys.forEach(key => {
      const el = cloneTemplate(template)

      el.firstElementChild.textContent = this._formatKey(key)
      el.lastElementChild.textContent = this._formatInfo(place[key])

      target.appendChild(el)
    })
  }

  _formatKey (str) {
    return `${capitalize(str)}: `
  }

  _formatInfo (str) {
    return str
  }
}

// Utility
function cloneTemplate(template) {
  return template.content.cloneNode(true)
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}
