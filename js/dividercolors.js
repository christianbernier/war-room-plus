const NUM_COLORS = 9
// 0 -> default (gray)
// 1 -> red
// 2 -> orange
// 3 -> yellow
// 4 -> green
// 5 -> light blue
// 6 -> blue
// 7 -> purple
// 8 -> pink

// gets all the dividers on the page
const getAllDividers = () => {
    const dividerObjects = document.querySelectorAll('[data-divider="true"]');
    const dividers = []

    for (const dividerWrapper of dividerObjects) {
        buttonsAddedOnLoad = true
        const wrapper2 = dividerWrapper.querySelector("div")
        const wrapper3 = wrapper2.querySelector("div")
        const divider = wrapper3.querySelector("div") // actual divider div
        divider.classList.add(`divider-color-0`)

        const divId = dividerWrapper.getAttribute("data-rbd-draggable-id")
        dividers.push({ divider, divId })
    }

    return dividers
}

// add a color-change button to the provided divider
const addButtonToDivider = (divider, divId) => {
    const icons = divider.querySelector(".gap-1")
    const colorSwitcher = document.createElement("button")
    colorSwitcher.id = `color-${divId}`
    colorSwitcher.classList.add("divider-color-selector")
    icons.appendChild(colorSwitcher)

    colorSwitcher.addEventListener("click", () => {
        for (const c of divider.classList) {
            if (c.includes("divider-color-")) {
                const color = c.match(/divider-color-([0-9]*)/)[1] - 0
                setColor(divider, divId, (1 + color) % NUM_COLORS)
            } else if (c.includes("bg-gray-200/50")) {
                setColor(divider, divId, 1)
            }
        }
    })
}

// sets the provided divider to the provided color
const setColor = (divider, id, color) => {
    // remove any old color classes
    for (let i = 0; i <= NUM_COLORS; i++) {
        divider.classList.remove(`divider-color-${i}`)
        divider.classList.remove(`divider-color-${i}-dark`)
    }
    divider.classList.remove(`bg-gray-200/50`)
    
    // add the proper class
    divider.classList.add(
        ((color - 0) === 0) ?
        `bg-gray-200/50` :
        `divider-color-${color}${(window.localStorage.getItem(`war-room-theme`) === `dark`) ? `-dark` : ``}`
    )

    // update the local storage
    window.localStorage.setItem(`divider-color-${id}`, color)
}

// sets the color of dividers loaded on the page based on local
// storage and adds color-change buttons to loaded dividers
const initializeDividers = setInterval(() => {
    const dividers = getAllDividers()
    if (dividers.length === 0) return

    for (const d of dividers) {
        const storedColor = window.localStorage.getItem(`divider-color-${d.divId}`)
        if (storedColor && storedColor > 0 && storedColor < NUM_COLORS) {
            setColor(d.divider, d.divId, storedColor, null)
        }
        
        addButtonToDivider(d.divider, d.divId)
    }

    clearInterval(initializeDividers)
}, 1)

// adds an observer to detect new dividers being added
const addObserver = setInterval(() => {
    if (document.querySelectorAll('[data-rbd-droppable-id="dividers"]').length === 0) return

    const observer = new MutationObserver((ml, o) => {
        const dividers = getAllDividers()
        for (const d of dividers) {
            if (d.divider.getElementsByClassName("divider-color-selector").length === 0)
                addButtonToDivider(d.divider, d.divId)
        }
    })
    observer.observe(document.querySelectorAll('[data-rbd-droppable-id="dividers"]')[0], { attributes: false, childList: true, subtree: false })

    clearInterval(addObserver)
}, 1)

// receive an update when the page style changes
const updateDarkMode = () => {
    const dividers = getAllDividers()
    for (const d of dividers) {
        // reset the colors of all the dividers to match the current style
        setColor(d.divider, d.divId, window.localStorage.getItem(`divider-color-${d.divId}`) || 0)
    }
}