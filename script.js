const container =document.querySelector(".container");
const count=document.getElementById('count')
const amount=document.getElementById("amount");
const select=document.getElementById("movie");
const seats =document.querySelectorAll('.seat:not(reserved)');
getFromLocalStorge();
calculateTote();

container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
  
      e.target.classList.toggle('selected')
      // toggle sayesinde yoksa selcted ekler varsa selected siler
      calculateTote();
    }
  
})
select.addEventListener("change",function(e){
calculateTote();
})
// movei değiştirdiğimizde change sayesinde hangi filmi açtıgımızda fiyatlar güncellenir
function calculateTote(){
  let selectedSeats=container.querySelectorAll('.seat.selected');
 
  const selectedSeatsArr =[];
  const seatsArr =[];

  selectedSeats.forEach(function(seat){
    selectedSeatsArr.push(seat)
  });
  seats.forEach(function(seat){
    seatsArr.push(seat)
  });

  // foreach ile ekleme yaptıgımız şeyi spread yöntemiyle tek satırda yapabiliriz ama o yöntemi henüz ögrenmedim

  let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {
    return seatsArr.indexOf(seat);
});
  let selectedSeatCount=selectedSeats.length;

  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexs);
}
function getFromLocalStorge(){

   const selectedSeats= JSON.parse(localStorage.getItem('selectedSeats'));
         if(selectedSeats!=null&&selectedSeats.length>0){
          seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
              seat.classList.add('selected')

            }
          })

         }


   const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
   if(selectedMovieIndex!=null){
    // seçili koltuk yoksa seçme işlemi yapsın
    select.selectedIndex=selectedMovieIndex;
   }
}

function saveToLocalStorage(indexs) {
  localStorage.setItem('selectedSeats', JSON.stringify(indexs));
  localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

