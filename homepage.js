
const menubtn=document.querySelector(".menu-btn");
function menuclicked () {
    menubtn.addEventListener("click",()=>{
    menubtn.classList.toggle("active");
});
}

