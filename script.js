"use strict"
const block_access = (e) => {
     if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 74) || (e.ctrlKey && e.keyCode == 85)) {
          e.preventDefault()
          alert("Interdit ! 😁")
          window.location = "https://github.com/"
     }
}


const input_value = document.getElementById("moy_input")
const calc_btn = document.getElementById("calc_btn")
const moy_gen = document.getElementById("moy_gen")
const article = document.querySelector("article")

// Regex de 3 notes (decimals ou entiers), séparées par des virgules
// const is_valid_format_and_numeric = /^(\d+(\.\d+)?\s*,\s*\d+(\.\d+)?\s*,\s*\d+(\.\d+)?)$/

// Regex de 6 notes (decimals ou entiers), séparées par des virgules
const is_valid_format_and_numeric = /^(\d+(\.\d{1,2})?\s*,\s*){5}\d+(\.\d{1,2})?$/

// Regex qui n'accepte pas des caracteres
const are_chars = (input_val) => /[^0-9,.\s]/.test(input_val);

const clear_input = () => {
     input_value.value = ""
     input_value.focus()
}

const check_verification = () => {
     const inf0_sup20 = (moy) => !isNaN(moy) && moy >= 0 && moy <= 20
     const are_numbers = input_value.value
          .trim()
          .split(',')
          .map((moy) => Number(moy))
          .every(inf0_sup20)

     if (!(input_value.value.trim() === "")) {
          if (are_numbers && input_value.value.match(is_valid_format_and_numeric) !== null) {
               try {
                    const arr_moy_to_numbers = input_value.value.split(',').map((moy) => Number(moy))
                    console.log(arr_moy_to_numbers.length);

                    if (arr_moy_to_numbers.length === 6) {
                         console.log(arr_moy_to_numbers);
                         arr_moy_to_numbers.forEach((moy, index) => {
                              article.innerHTML +=
                                   `
                              <div class="note_box">
                                   <span>S${index + 1}</span>
                                   <h4 class="${moy < 10 ? 'sub_moy' : 'moy'}">${moy < 10 ? '0' + moy : moy}</h4>
                              </div>
                             `
                         })
                         clear_input()

                         moy_gen.innerText = `${(arr_moy_to_numbers.reduce((acc, curr) => acc + curr, 0) / arr_moy_to_numbers.length).toFixed(2)} / 20`
                         document.querySelector(".good_luck").classList.add("active")
                    } else {
                         alert("Le champs attend exactement 6 moyennes (Semestre 1-6)👌.")
                         document.querySelector(".good_luck").classList.remove("active")
                    }

               } catch (error) {
                    console.log(error)
               }

          } else if (are_chars(input_value.value)) {
               alert("Veuillez entrer des données valides (notes), séparées par des virgules 😒!")
               clear_input()
               return false
          }
     } else {
          alert("Champs vide - Veuillez remplir le champ input 😉!")
          article.innerHTML = " "
          clear_input()
     }
}


calc_btn.addEventListener("click", check_verification)
input_value.addEventListener("keydown", () => {
     article.innerHTML = ""
     moy_gen.innerText = "---"
     document.querySelector(".good_luck").classList.remove("active")

})
document.addEventListener("keydown", block_access)
document.addEventListener("contextmenu", e => {
     e.preventDefault()
     alert("Interdit 😁!")
     window.location = "https://github.com/"
})