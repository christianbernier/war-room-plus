const getCurrentStyle = () => window.localStorage.getItem("war-room-theme") || "light"

const updateStyles = style => {
    updateDarkMode()

    if (style !== "dark") {
        document.getElementById("darkmode_styles").innerHTML = ""
        return
    }
    document.getElementById("darkmode_styles").innerHTML = `
        p { color: #EEEEEE !important; }
        strong { color: #EEEEEE !important; }
        li { color: #EEEEEE !important; }
        .bg-gray-50 { background-color: #222831 !important; }
        .bg-gray-100 { background-color: #393E46 !important; }
        .bg-gray-200\/50 { background-color: #393E46 !important; }
         er\:bg-gray-200\/50:hover { background-color: #393E46 !important; }
        .bg-white { background-color: #393E46 !important; }
        .bg-gray-800 { background-color: #393E46 !important; }
        .bg-gray-200 { background-color: #5e6268 !important; }
        .border-gray-200 { border-color: #393E46 !important; }
        .border-gray-100 { border-color: #393E46 !important; }
        .bg-cyan-500 { background-color: #393E46 !important; }
        .text-gray-500 { color: #EEEEEE !important; }
        .text-gray-700 { color: #EEEEEE !important; }
        .text-gray-800 { color: #EEEEEE !important; }
        .text-gray-900 { color: #EEEEEE !important; }
        .text-gray-400 { color: rgb(148 163 184) !important; }
        .text-cyan-500 { color: rgb(148 163 184) !important; }
        .via-gray-200 { --tw-gradient-stops: var(--tw-gradient-from), #393E46, var(--tw-gradient-to) !important; }
        .from-gray-200 { --tw-gradient-stops: #393E46, var(--tw-gradient-to) !important; }
        .focus\:ring-cyan-300:focus { --tw-ring-color: rgb(34 40 49 / var(--tw-ring-opacity)) !important }
        .bg-amber-100 { background-color: #5e6268 !important; }
        .bg-cyan-50 { background-color: #5e6268 !important; }
        .border-cyan-200 { border-color: rgb(148 163 184) !important; }
        button.hover\:bg-gray-200.transition-colors.p-0\.5.rounded { background-color: #5e6268 !important; }
        .h-3.w-3.rounded-full.transition.flex.items-center.bg-white.translate-x-4 { background-color: #5e6268 !important; }
    `
}

// add the dark mode style tag to the head of the page
document.querySelector("head").innerHTML += `<style id="darkmode_styles"></style>`
updateStyles(getCurrentStyle())

// add button to enable/disable dark mode once the page loads
const addInitialButton = setInterval(() => {
    const buttonDiv = document.querySelectorAll(".sticky.top-0.p-4.bg-gray-50")
    if (buttonDiv.length === 0) return

    for (const div of buttonDiv) {
        if (div.innerHTML.indexOf("Get the War Room app!") !== -1) {
            const button = document.createElement("button")
            button.classList = "block ml-auto font-sans text-sm text-gray-500 underline decoration-gray-400"
            button.id = "style-change-button"
            button.innerHTML = `${(getCurrentStyle() === "light") ? "Enable" : "Disable"} dark mode`
            button.onclick = () => {
                const button = document.querySelector("#style-change-button")
                const style = getCurrentStyle()

                button.innerHTML = `${(style === "light") ? "Disable" : "Enable"} dark mode`
                window.localStorage.setItem("war-room-theme", (style === "light") ? "dark" : "light")

                updateStyles((style === "light") ? "dark" : "light")
            }
            div.children[0].after(button)
        }
    }

    clearInterval(addInitialButton)
}, 1)