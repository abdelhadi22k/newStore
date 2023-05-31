let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;




function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//create 

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
}
else {
    datapro = [];
}



submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value ,
        taxes: taxes.value ,
        ads: ads.value ,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase() ,
    }
   if( title.value !='' 
   && price.value !='' 
   && category.value !='' 
   &&newpro.count <=100 
    ){

 if(mood === 'create'){
        //count
  if(newpro.count>1){
        for(let i = 0; i < newpro.count ; i ++){
            datapro.push(newpro);
        }
    }else{
        datapro.push(newpro);
    }
    }else{
        datapro[   tmp     ] = newpro;
        mood = 'create';
        submit.innerHTML='create';
        count.style.display='block';
    }
clearDate()
   }
   
    //save
    localStorage.setItem('product', JSON.stringify(datapro))
    showData();
    
        
}
function clearDate() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//Rad
function showData(){
    getTotal()
    let tabol ='';
    for(let i =0; i < datapro.length ; i++){
        tabol +=
        `
        <tr>
        <td>${i+1} </td>
        <td>${datapro[i].title} </td>
        <td> ${datapro[i].price} </td>
        <td> ${datapro[i].taxes} </td>
        <td>${datapro[i].ads}  </td>
        <td> ${datapro[i].discount} </td>
        <td>${datapro[i].total} </td>
        <td>${datapro[i].category}  </td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
        `   
        
        




    }
   document.getElementById('tbody').innerHTML=tabol;
    let btnDelete= document.getElementById('deleteAll')

   if(datapro.length > 0 ){
    btnDelete.innerHTML=` <button onclick="deleteAll()" > deleteALL(${datapro.length}) </button>    `;
   }else{
    btnDelete.innerHTML= '';
   }
}
showData()
//delete
function deleteData(i){

datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showData()
}
//deleteall
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData()
}
//updata
function updateData(i){
   title.value = datapro[i].title;
   price.value =datapro[i].price;
   taxes.value =datapro[i].taxes;
   ads.value =datapro[i].ads;
   discount.value =datapro[i].discount;
   category.value =datapro[i].category;
   count.style.display='none';
   submit.innerHTML='updete';
   mood = 'updete';
   tmp = i ;  
 getTotal()  
 scroll({
    top:0,
    behavior:'smooth' 
 }) 
}
//search
let searchMood = 'title'
function getsearchMood(id){
      let  search = document.getElementById('search');
    if( id == 'searchTitle'){
        searchMood = 'title';
        
    }else{
        searchMood = 'category';
       
    }
    search.placeholder ='search By ' + searchMood;
    search.focus();
    search.value='';
    showData()
}
function SearchData(value){
    let tabol=''
    if(searchMood = 'title'){
      for(let i =0 ; i < datapro.length; i ++ ){
        if(datapro[i].title.includes(value.toLowerCase()) ){
        tabol +=
        `
        <tr>
        <td>${i} </td>
        <td>${datapro[i].title} </td>
        <td> ${datapro[i].price} </td>
        <td> ${datapro[i].taxes} </td>
        <td>${datapro[i].ads}  </td>
        <td> ${datapro[i].discount} </td>
        <td>${datapro[i].total} </td>
        <td>${datapro[i].category}  </td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
        `  
        }
      }
    }
    else{
        for(let i =0 ; i < datapro.length; i ++ ){
            if(datapro[i].category.includes(value.toLowerCase()) ){
            tabol +=
            `
            <tr>
            <td>${i} </td>
            <td>${datapro[i].title} </td>
            <td> ${datapro[i].price} </td>
            <td> ${datapro[i].taxes} </td>
            <td>${datapro[i].ads}  </td>
            <td> ${datapro[i].discount} </td>
            <td>${datapro[i].total} </td>
            <td>${datapro[i].category}  </td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
              </tr>
            `  
            }
          }
    }
    document.getElementById('tbody').innerHTML=tabol;
}


