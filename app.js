const API_KEY="b4b9954a014d4ca4b30d8f17b8fda4ef";
document.getElementById("findBtn").addEventListener("click", () => {
    const input = document.getElementById("recipe").value.trim();
    if (input === "") {
        alert("Please enter Recipe Name");
        return;
    }
    getRecipe(input);
});

async function getRecipe(input) {
    try {
        const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?query=${input}&apiKey=${API_KEY}&addRecipeInformation=true&number=10`;
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const container = document.querySelector(".container");
            container.style.display="contents";
            const template = document.querySelector(".recipe-container"); // store template
            container.innerHTML = ""; // clear old cards

            data.results.forEach(recipe => {
                const card = template.cloneNode(true);

                card.querySelector("#title").textContent = recipe.title;
                card.querySelector("img").src = recipe.image;
                
                let summary = recipe.summary || "";
                summary = summary.replace(/<[^>]*>/g, '');
                if (summary.length > 150) {
                    summary = summary.substring(0, 140) + "...";
                }
                card.querySelector("#summary").textContent = `Summary: ${summary}`;
                card.querySelector("#time").textContent = `Ready in: ${recipe.readyInMinutes} mins`;
                card.querySelector("#score").textContent = `Health score: ${recipe.healthScore}`;
                card.querySelector("a").href = recipe.sourceUrl;

                container.appendChild(card);
            });
        } else {
            alert("No corresponding recipe found");
        }
    } catch (error) {
        console.log(error, "API not called properly");
    }
}
