const div = document.querySelector(".movie-container");
const movieID = document.getElementById('movie-id');
const seats = document.querySelectorAll(".row .seat:not(.occupied)");//getting the row seats which are not occupied.
const container = document.querySelector(".container");
const selected = document.querySelector(".text");
const count = document.querySelector("#count");
const total = document.querySelector("#totalprice");
const allseats = document.querySelectorAll(".row .seat"); 
populateUI();
let ticketprice = +movieID.value;//since we dont want it to be string 
//function for setting the movie name and the price in local storage 
function setMovieData(movieName,moviePrice){
    localStorage.setItem('SelectedMovieName',movieName);
    localStorage.setItem('SelectedMoviePrice',moviePrice);

}
//function is used for getting all the seats updated when user chooses them and then updating the price and the no of seats updated accordingly.
function updateSeats()
{
    const updateSeatsC = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...updateSeatsC].map(function (s)//for each of the seats 
    {
        return [...allseats].indexOf(s);//accessing all seats and then for each seat we wil return the index.
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    const noofSeatsSelected = updateSeatsC.length;
    count.innerText = noofSeatsSelected;
    const totalPrice = noofSeatsSelected * ticketprice;
    total.innerText = totalPrice;
    localStorage.setItem('totalPrice', totalPrice.toString());
}
//function is used to keep the seats same whenever user refreshes the page by keeping in local storage and getting them from the local storage 
function populateUI()
{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));//parse bcz its string in setitem
    if(selectedSeats !== null && selectedSeats.length > 0)
    {
        allseats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1)//seats index last limi is 0 as it starts from 0 and then till 63. if its less than -1, then we cant access any seats as we dont have them.
            {
                seat.classList.add('selected');//make them accessable to user 
            }
        })
    }
    const selectedMoviename = localStorage.getItem('SelectedMovieName');//for each diff movie we select, we will get its name from the local storage.
    if(selectedMoviename != null)
    {
    movieID.movieName = selectedMoviename;//send the name u choose, in the movie id.
    }
}
//on click we get the seat to be ours when we press it and it turns green.
container.addEventListener('click',(e)=>{
    if((e.target.classList.contains('seat')) && !(e.target.classList.contains('occupied')))//if the following accessed is a seat and the seat is not occupied then we can let the user select it 
    {
      e.target.classList.toggle('selected');
    }
    updateSeats();//update the seat for the user.
})
//when a movie name is selected, its price and name is extracted and then stored in the local storage 
movieID.addEventListener('change',(e)=>{
    ticketprice = +e.target.value;//+ to convert from string to number 
    const selectedOption = e.target.options[e.target.selectedIndex];
    const movieName = selectedOption.dataset.name;
    const moviePrice = selectedOption.value;
    setMovieData(movieName, moviePrice);
    updateSeats();
})
const open = document.getElementById('open');
const main_c = document.getElementById('main-cont');
const close = document.getElementById('close');
const ticketMovie = document.getElementById('ticket-movie');
const ticketSeats = document.getElementById('ticket-seats');
const ticketTotal = document.getElementById('ticket-total');
//on click of button to confrim the seats, a pop up message appears which is basically a ticket for the user
//it has the movie name, tota price,total seats.
open.addEventListener("click", () => {
    const movieName = localStorage.getItem('SelectedMovieName');
    const totalPrice = localStorage.getItem('totalPrice');
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const seatNumbers = selectedSeats.map(i => `S${i + 1}`);// as the index start from 0 and we don usally have a seating start from-0 so we add 1 to each to match the seat no
    ticketMovie.innerText = movieName;
    if (seatNumbers.length > 0) //if more than 1 than we combine by ,s.
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
//close the pop up when the button is pressed.
close.addEventListener("click",()=>{
main_c.classList.remove("show");
})
