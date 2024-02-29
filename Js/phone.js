const loadPhone = async (searchText = '13', isShowAll) => {   //searchText='13'/'oppo'/'samsung'  এগুলো ডিফল্ট হয়ে থাকবে।
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    //Step-1. Select Container by Id-->
    const phoneContainer = document.getElementById("phone-container");

    // নতুন করে কিছু সার্চ দিলে আগের গুলো রিলোড/ফাকা হয়ে যাবে।---->
    phoneContainer.textContent = ' ';

    const showAllContainer = document.getElementById("show-all-button");

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // console.log("is Show All:", isShowAll)

    // ডিসপেলে তে 12 টার বেশি ফোন দেখাবে না 0  থেকে 15 এর আগ পর্যন্ত দেখাবে মোট 12টি। 
    if (!isShowAll) {
        phones = phones.slice(0, 12);

    }

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
                <button onclick="handleShowDetail('${phones.slug}')" class=" items-center  btn btn-primary">SHOW DETAILS</button>
              </div>
            </div>

        `;
        //Step-5 AppendChild-->
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false)
}







//  handle search button 

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);         //-------->Loading arrow function call here
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);   // fetch এর ফাংশন কে কল করা হয়েছে এখানে।
}


//  handle search button  recap-2---->

// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);         //-------->Loading arrow function call here
//     const searchField = document.getElementById("search-field2");
//     const searchText = searchField.value;
//     // console.log(searchText);
//     loadPhone(searchText);   // fetch এর ফাংশন কে কল করা হয়েছে এখানে।
// }



// Set Loading Spinner 
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}


//handle Show all

const handleShowAll = () => {
    handleSearch(true);

}

const handleShowDetail = async (id) => {
    // console.log('Show Detail', id)
    // load a single phone data------->
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data
    showPhonesDetails(phone);
}

const showPhonesDetails = (phones) => {
    console.log(phones);
    const phoneName = document.getElementById("show-detail-phone-name");
    phoneName.innerText = phones.name;

    const showDetailContainer = document.getElementById("show-detail-container");
    showDetailContainer.innerHTML = `
    <img src="${phones.image}" alt="">
    <p><span class="font-bold">Brand: </span>${phones.brand}</p>
    <p><span class="font-bold">Name: </span>${phones.name}</p>
    <p><span class="font-bold">Storage: </span>${phones.mainFeatures.storage}</p>
    <p><span class="font-bold">Slug: </span>${phones.slug}</p>
    <p><span></span></p>
    <p><span></span></p>
    <p><span></span></p>



`


    //Show/call the modal
    show_details_modal.showModal()


}








loadPhone()