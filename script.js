"use strict"
const block_access = (e) => {
     if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 74) || (e.ctrlKey && e.keyCode == 85)) {
          e.preventDefault()
          alert("Interdit ! 😁")
          window.location = "https://github.com/"
     }
}

const input = document.getElementById("input")
const calc_btn = document.getElementById("calc_btn")
const mssgErr = document.getElementById("display_err")
const aside = document.querySelector("aside")

// Regex de 6 notes (decimals ou entiers), séparées par des virgules
const is_valid_format_and_numeric = /^(\d+(\.\d{1,2})?\s*,\s*){5}\d+(\.\d{1,2})?$/

// Regex qui n'accepte pas des caracteres
const are_chars = (input_value) => /[^0-9,.\s]/.test(input_value);

const clear_and_focus = () => {
     input.value = ""
     // input.focus()
}

const showMssgErr = () => {
     mssgErr.classList.add("active")
}
const hideMssgErr = () => {
     mssgErr.classList.remove("active")
}

const verification = () => {

     if (!(input.value.trim() === "")) {
          if (are_chars(input.value)) {
               clear_and_focus()
               showMssgErr()
               mssgErr.textContent = "❌ Les caracteres ne sont pas autisés ! uniquement des données valides (notes), séparées par des virgules(,)."
               return false
          }

          if (input.value.match(is_valid_format_and_numeric) === null) {
               showMssgErr()
               input.focus()
               mssgErr.textContent = "⚠️Le champs attend exactement 6 moyennes (Semestre 1-6)."
               return false
          }

          if (input.value.match(is_valid_format_and_numeric) !== null && !are_chars(input.value)) {
               try {
                    const moyennes_arr_numbers = input.value.split(',').map((moy) => Number(moy))
                    const inf0_sup20 = moyennes_arr_numbers.map((moy) => moy).every((moy) => !isNaN(moy) && moy >= 0 && moy <= 20)

                    if (!inf0_sup20) {
                         showMssgErr()
                         input.focus()
                         mssgErr.textContent = "⚠️Les moyennes doivent être comprises entre [0-20]"
                         return false
                    } else {
                         const moy_gene = `${(moyennes_arr_numbers.reduce((acc, curr) => acc + curr, 0) / moyennes_arr_numbers.length).toFixed(2)} / 20`
                         const ul = document.createElement("ul")
                         moyennes_arr_numbers.forEach((moy, index) => {
                              const li = document.createElement("li")
                              li.classList.add("note_box")
                              li.innerHTML +=
                                   `
                                   <span>S${index + 1}</span>
                                   <h2 class="${moy < 10 ? 'sub_moy' : 'moy'}">${moy < 10 ? '0' + moy : moy}</h2>
                              `
                              ul.appendChild(li)
                         })
                         const h3 = document.createElement("h3")
                         h3.innerHTML = `La moyenne générale est : <strong>${moy_gene}</strong>`
                         aside.appendChild(ul)
                         aside.appendChild(h3)
                         console.log(moy_gene);
                    }

               } catch (error) {
                    console.log(error);
               }
          }

          clear_and_focus()

     } else {
          clear_and_focus()
          showMssgErr()
          mssgErr.textContent = "⚠️ Le Champ est requis !"
          return false
     }

}

const reset = () => {
     hideMssgErr()
     aside.innerHTML = ""
}

calc_btn.addEventListener('click', verification)

document.addEventListener("keydown", (e) => {
     if (e.key === "Enter") {
          verification()
     }
})

window.addEventListener("keydown", block_access)

document.addEventListener("contextmenu", (e) => {
     e.preventDefault()
     alert("Interdit 😁!")
     window.location = "https://github.com/"
})

document.addEventListener("DOMContentLoaded", clear_and_focus)
input.addEventListener("keydown", reset)
