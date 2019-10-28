function resizeGridItem(item){
  grid = document.getElementsByClassName("grid")[0];
  rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
  console.log("HERHEHRHERHEHRHRHEHRHERHHREHERH")
  setTimeout(()=>{
    for(x=0;x<allItems.length;x++){
      resizeGridItem(allItems[x]);
    }
  }, 60)
  allItems = document.getElementsByClassName("item");
}

function resizeInstance(instance){
	item = instance.elements[0];
  resizeGridItem(item);
}

window.addEventListener("resize", resizeAllGridItems);
// window.onload(resizeAllGridItems)

allItems = document.getElementsByClassName("item");
for(x=0;x<allItems.length;x++){
  imagesLoaded( allItems[x], resizeInstance);
}
