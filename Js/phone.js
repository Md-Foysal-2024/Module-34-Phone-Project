const loadPhone = async (searchFieldText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`);
    const data = await res.json()
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones)
}

const displayPhones = phones => {
    // console.log(phones);
    //Step-1. Select Container by Id-->
    const phoneContainer = document.getElementById("phone-container");
    // নতুন করে কিছু সার্চ দিলে আগের গুলো রিলোড/ফাকা হয়ে যাবে।---->
phoneContainer.textContent=' ';

    phones.forEach(phones => {
        console.log(phones);

        //Step-2. creat a div-->
        const phoneCard = document.createElement('div');

        //Step-3.add a class-->
        phoneCard.classList = 'card  bg-gray-200 shadow-xl pt-10';

        //Step-4.add a class-->
        phoneCard.innerHTML = `
        <figure><img src="${phones.image}"></figure>
            <div class="card-body text-center items-center">
              <h2 class="card-title">${phones.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button class=" items-center  btn btn-primary">Buy Now</button>
              </div>
            </div>

        `;
        //Step-5 AppendChild-->
        phoneContainer.appendChild(phoneCard);
    });
}







//  handle search button

const handleSearch= ()=>{
   const searchField =document.getElementById("search-field");
   const searchFieldText = searchField.value;
   console.log(searchFieldText);
   loadPhone(searchFieldText)
}




loadPhone()