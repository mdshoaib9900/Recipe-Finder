const API_KEY="55fbb774532d45cc8b23a319022054ac";


document.getElementById("findBtn").addEventListener("click",()=>{
    const input=document.getElementById("recipe").value.trim();

    if(input===""){
        alert("Please enter Recipe Name");
    }
    getRecipe(input);
});


 

async function getRecipe(input) {
    try{
        const BASE_URL=`https://api.spoonacular.com/recipes/complexSearch?query=${input}&apiKey=${API_KEY}&addRecipeInformation=true`;
        const response=await fetch(BASE_URL);
        const data=await response.json();
        if(data.results &&  data.results.length > 0){
            const recipe=data.results[0];
            console.log("title ",recipe.title);
            console.log("Image:", recipe.image);
        }else{
            alert("no corresponding recipe found");
        }
    }catch(error){
        console.log(error," api not called properly");
        
    }    
}