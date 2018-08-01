// declare the words
const words = [{
  selector: ".code-categories",
  text: ["'airfare'", "['gas', 'parking']"],
  scrollY: 0
}, {
  selector: ".code-type",
  text: ["'physical'", "'virtual'"],
  scrollY: -1390
}, {
  selector: ".code-brand",
  text: ["'visa'", "'mastercard'"],
  scrollY: -840
}, {
  selector: ".code-status",
  text: ["'inactive'", "'active'"],
  scrollY: -1380
}, {
  selector: ".code-currency",
  text: ["'gbp'", "'usd'"],
  scrollY: -120
}, {
  selector: ".code-amount",
  text: ["10000", "35"],
  scrollY: -190
}]

// alias $ to document.querySelector
const $ = document.querySelector.bind(document)

const element = $('.card-overlay')

const codeContainer = $(".card-code")

// set an initial currentStep and select the element from the DOM
const codeChanges = words.map(word => {
  return {
    ...word,
    currentStep: 0,
    el: $(word.selector)
  }
})

// method to scroll the codeContainer to the word
const scrollContainer = value => codeContainer.style.transform = `translate3d(0, ${value}px, 0)`

// type the text into the word element
const typeText = word => {
  const { el, newText } = word
  let num = 0
  // wait 500ms after its been scrolled to the text
  setTimeout(() => {
    if(el.classList.contains("code-null")) {
      el.classList.remove("code-null")
      el.classList.add("code-string")
    }
    // set a 50ms interval to simulate typing
    const timer = setInterval(() => {
      el.style.fontWeight = 700
      el.textContent = newText.substr(0, num)
      // if we're done with the word text, clear the interval
      num === newText.length && clearInterval(timer)
      num += 1
    }, 50)
  }, 500)
}

// type a word
const startTypingForStep = step => {
  const word = codeChanges[step]
  scrollContainer(word.scrollY)
  typeText({
    el: word.el,
    newText: word.text[word.currentStep]
  })
  // increment the currentStep, or reset it
  codeChanges[step] = {
    ...word,
    currentStep: word.currentStep === word.text.length - 1 ? 0 : word.currentStep + 1
  }
  const newStep = step === codeChanges.length - 1 ? 0 : step + 1
  // wait 4s before typing the next word
  setTimeout(() => startTypingForStep(newStep), 4e3)
}

// kick things off with the first word
startTypingForStep(0)
