const div = document.querySelector(".movie-container");
const movieID = document.getElementById('movie-id');
const timeID = document.getElementById('time-id');
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const container = document.querySelector(".container");
const selected = document.querySelector(".text");
const count = document.querySelector("#count");
const total = document.querySelector("#totalprice");
const allseats = document.querySelectorAll(".row .seat"); 
populateUI();
let ticketprice = +movieID.value;//since we dont want it to be string 
//for putting the seat choosen and the price of that movie in the local storage 
function setMovieData(movieName,moviePrice)
{
    localStorage.setItem('SelectedMovieName',movieName);
    localStorage.setItem('SelectedMoviePrice',moviePrice);
}
//randomize the seats for each movie 
function randomizeSeatsForMovie()
{
   allseats.forEach(seat => {
    seat.classList.remove('occupied');
    if (Math.random() < 0.33) 
    {
      seat.classList.add('occupied');
    }
  });
}
//update the seat to show that the user has selected it and to update the price and no of seats choosen 
function updateSeats()
{
    const updateSeatsC = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...updateSeatsC].map(function (s)
    {
        return [...allseats].indexOf(s);
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    const noofSeatsSelected = updateSeatsC.length;
    count.innerText = noofSeatsSelected;
    const totalPrice = noofSeatsSelected * ticketprice;
    total.innerText = totalPrice;
    localStorage.setItem('totalPrice', totalPrice.toString());

}
//for geting the seats user choose from local storage & then to keep the seat when user refreshes 
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));//parse bcz its string in setitem
    if(selectedSeats !== null && selectedSeats.length > 0)
    {
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1)
            {
                seat.classList.add('selected');
            }
        })
    }
}
//for seats updation when user clicks it to see if not occupied.
container.addEventListener('click',(e)=>{
    if((e.target.classList.contains('seat')) && !(e.target.classList.contains('occupied'))){
      e.target.classList.toggle('selected');
    }
    updateSeats();
})
//movie name and price handling in storing in local storage 
movieID.addEventListener('change',(e)=>{
    ticketprice = +e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const movieName = selectedOption.dataset.name;
    const moviePrice = selectedOption.value;

    setMovieData(movieName, moviePrice);
    allseats.forEach(seat => seat.classList.remove('selected'));
    randomizeSeatsForMovie();
    updateSeats();
})
//time handling for storing in soring in local storage 
timeID.addEventListener('change', (e) => {
    const selectedoption = e.target.options[e.target.selectedIndex];
    const selectedTime = selectedoption.value;
    console.log(selectedTime)
    localStorage.setItem('SelectedMovieTime', selectedTime);
    randomizeSeatsForMovie();
});
//getting an id for the user 
function setid(){
    let ticketID = Math.floor(Math.random() * 1000000); 
    localStorage.setItem('RefernceID',ticketID);
}
const open = document.getElementById('open');
const main_c = document.getElementById('main-cont');
const close = document.getElementById('close');
const ticketMovie = document.getElementById('ticket-movie');
const ticketSeats = document.getElementById('ticket-seats');
const ticketTotal = document.getElementById('ticket-total');
const ticketTime = document.getElementById('ticket-time');
const randID =document.getElementById('ref-id');
//opening the pop up for ticket  
open.addEventListener("click", () => {
    const movieName = localStorage.getItem('SelectedMovieName');
    const totalPrice = localStorage.getItem('totalPrice');
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const seatNumbers = selectedSeats.map(i => `S${i + 1}`);
    ticketMovie.innerText = movieName;
    const selectedTime = localStorage.getItem('SelectedMovieTime');
    ticketTime.innerText = selectedTime;
    setid();
    const refID = localStorage.getItem('RefernceID');
    randID.textContent = 'TKT-'+ refID;
    if (seatNumbers.length > 0) 
    {
    ticketSeats.innerText = seatNumbers.join(', ');
    } 
    else 
    {
    ticketSeats.innerText = 'None';
    }
    ticketTotal.innerText = totalPrice;
    main_c.classList.add("show");
});
//closing the pop up 
close.addEventListener("click",()=>{
main_c.classList.remove("show");
})
