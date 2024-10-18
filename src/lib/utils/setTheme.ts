export function setTheme(theme: "light" | "dark") {
    const cards = document.getElementsByClassName("card");
    const listGroups = document.getElementsByClassName("list-group");
    const listGroupAnchors = document.getElementsByClassName("list-group-anchor");

    if (theme === "light") {
        document.body.classList.remove("dark-mode");
        
        for (const card of cards) card.classList.remove("dark-mode-card");
        for (const listGroup of listGroups) listGroup.classList.remove("dark-mode-list-group");
        for (const listGroupAnchor of listGroupAnchors) listGroupAnchor.classList.remove("dark-mode-list-group-anchor");
    } else {
        document.body.classList.add("dark-mode");

        for (const card of cards) card.classList.add("dark-mode-card");
        for (const listGroup of listGroups) listGroup.classList.add("dark-mode-list-group");
        for (const listGroupAnchor of listGroupAnchors) listGroupAnchor.classList.add("dark-mode-list-group-anchor");
    }

    localStorage.setItem("theme", theme);
}