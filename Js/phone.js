const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
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
    phoneContainer.textContent = ' ';

    const showAllContainer = document.getElementById("show-all-button");

    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }


    // ডিসপেলে তে ১৫ টার বেশি ফোন দেখাবে না 0  থেকে 15 এর আগ পর্যন্ত দেখাবে মোট ১৫টি। 
    phones = phones.slice(0, 12);

    // console.log(phones.length);

    phones.forEach(phones => {
        // console.log(phones);

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

const handleSearch = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);   // fetch এর ফাংশন কে কল করা হয়েছে এখানে।
}


const handleSearch2 = () => {
    const searchField = document.getElementById("search-field2");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);   // fetch এর ফাংশন কে কল করা হয়েছে এখানে।
}




loadPhone()