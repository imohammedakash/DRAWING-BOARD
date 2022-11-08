const canvas = document.querySelector('canvas');
const colorpicker = document.getElementById('color-picker');
const sizeslider = document.getElementById('size-slider');
const colors = document.querySelectorAll('.colors .option');
const clearcanva = document.querySelector('.clear-canvas');
const savecanva = document.querySelector('.Save-canvas');
ctx = canvas.getContext('2d');

const toolbtns = document.querySelectorAll('.tool')
let prevmouseX, prevmouseY, snapshot,
    isDrawing = false,
    brushWidth = 5,
    selectedTool = "brush"
    ;
window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

})
const drawrect = (e) => {
    ctx.strokeRect(e.offsetX, e.offsetY, prevmouseX - e.offsetX, prevmouseY - e.offsetY);
}
const startdrawing = (e) => {
    isDrawing = true;
    prevmouseX = e.offsetX;
    prevmouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    snapshot = ctx.getImageData(0, 0, canvas.height, canvas.width)
}

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if (selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    else if (selectedTool === "Rectangle") {
        drawrect(e);
    }

}
toolbtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});
colors.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.option .selected').classList.remove('selected');
        btn.classList.add('selected');

    })
})

clearcanva.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
});

colorpicker.addEventListener("change", (e) => {
    colorpicker.parentElement.style.background = colorpicker.value;
    colorpicker.parentElement.click();
})
savecanva.addEventListener('click',()=>{
const link=document.createElement("a");
link.download=`${Data.now()}.jpg`;
link.href=canvas.toDataURL();
link.click();
});
sizeslider.addEventListener('change', () => brushWidth = sizeslider.value);
canvas.addEventListener('mousedown', startdrawing);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', drawing);