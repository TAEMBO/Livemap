export function setTheme(theme: "light" | "dark") {
    const cards = document.getElementsByClassName("card");
    const listGroups = document.getElementsByClassName("list-group");
    const listGroupAnchors = document.getElementsByClassName("list-group-anchor");
    const error = document.getElementsByClassName("error")[0];
    const action = theme === "light" ? "remove" : "add";

    document.body.classList[action]("dark-mode");

    for (const card of cards) card.classList[action]("dark-mode-card");
    for (const listGroup of listGroups) listGroup.classList[action]("dark-mode-list-group");
    for (const listGroupAnchor of listGroupAnchors) listGroupAnchor.classList[action]("dark-mode-list-group-anchor");

    error?.classList[action]("dark-mode-error");

    localStorage.setItem("theme", theme);
}