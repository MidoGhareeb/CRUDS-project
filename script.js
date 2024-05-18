// variabes
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxs=document.getElementById('taxs');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let create=document.getElementById('create');
let searchTitle=document.getElementById('searchTitle');
let searchCategory=document.getElementById('searchCategory');
let mood ='create';
let tm ;

// get total function

let gettotal =function(){
    if (price.value != ""){
        let result=(+price.value+ +taxs.value + +ads.value)
        - +discount.value
        total.innerHTML=result
        total.style.backgroundColor='#040'
    }
    else {
        total.innerHTML=''
        total.style.backgroundColor='var(--second-color)'
    }
    
}

// create product
let prodata;
if (localStorage.product != null){
    prodata= JSON.parse(localStorage.product)
    
}else{
    prodata=[];
}



create.onclick=function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxs:taxs.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value.toLowerCase(),
        total:total.innerHTML,
    }
    if(title.value != '' && price.value !='' && category.value != ''&& count.value < 101 ){
        if( mood === 'create'){
            if(newpro.count > 1){
            for(i=0 ; i<newpro.count ; i++){
                prodata.push(newpro);
            }
        } else{
            prodata.push(newpro);
        }  
        }else{
            prodata[tm]=newpro;
            mood='create';
            create.innerHTML='Create';
            count.style.display='block'
    }
    clearData()
    }



    localStorage.setItem( 'product',JSON.stringify(prodata))
    
    readData()
}
readData()
//clear inputs
function clearData (){
        title.value=''
        price.value=''
        taxs.value=''
        ads.value=''
        discount.value=''
        count.value=''
        category.value=''
        total.innerHTML=''
}


// read data
function readData() {
    gettotal()
    let table = '';
    for (let i = 0; i < prodata.length; i++) {
        table +=`
        <tr>
        <td>${i + 1}</td>
        <td>${prodata[i].title}</td>
        <td>${prodata[i].price}</td>
        <td>${prodata[i].taxs}</td>
        <td>${prodata[i].ads}</td>
        <td>${prodata[i].discount}</td>
        <td>${prodata[i].total}</td>
        <td>${prodata[i].category}</td>
        <td><button onclick='UpdateData(${i})' id="update">Update</button></td>
        <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>
        `
    }

    document.getElementById('tableData').innerHTML = table;
    let BtnDeleteAll = document.getElementById('DeleteAll');
    if (prodata.length > 0) {
        BtnDeleteAll.innerHTML = `<button onclick='deleteAll()' >delete all (${prodata.length})</button>`;
    } else {
        BtnDeleteAll.innerHTML = '';
    }
}



//delete
function deleteData(i){
    prodata.splice(i,1);
    localStorage.product=JSON.stringify(prodata);
    readData()
}
function deleteAll (){
    localStorage.clear()
    prodata.splice(0)
    readData()
}

//update
function UpdateData(i){
    title.value=prodata[i].title;
    price.value=prodata[i].price;
    ads.value=prodata[i].ads;
    taxs.value=prodata[i].taxs;
    category.value=prodata[i].category;
    discount.value=prodata[i].discount;
    gettotal()
    count.style.display="none"
    create.innerHTML='Update'
    mood='update';
    tm = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}


//search
let moodsearch='title'

function getSearchMood(id){
    let search=document.getElementById('search');
    if(id=="searchTitle"){
        moodsearch='title'
        search.placeholder='Search By Title'
        
    }else{
        moodsearch='category'
        
    }
    search.placeholder=`Search By ${moodsearch}`
    search.focus()
    search.value=''
    readData()
}

function searchData(value){
    let table = '';
    if(moodsearch =='title'){
        for(let i=0 ; i < prodata.length ; i++){
            if(prodata[i].title.includes(value.toLowerCase())){
                table +=`
            <tr>
                <td>${i}</td>
                <td>${prodata[i].title}</td>
                <td>${prodata[i].price}</td>
                <td>${prodata[i].taxs}</td>
                <td>${prodata[i].ads}</td>
                <td>${prodata[i].discount}</td>
                <td>${prodata[i].total}</td>
                <td>${prodata[i].category}</td>
                <td><button onclick='UpdateData(${i})' id="update">Update</button></td>
                <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
            </tr>
        `
                }       
        }
    }else{
        for(let i=0 ; i < prodata.length ; i++){
            if(prodata[i].category.includes(value.toLowerCase())){
                table +=`
            <tr>
                <td>${i + 1}</td>
                <td>${prodata[i].title}</td>
                <td>${prodata[i].price}</td>
                <td>${prodata[i].taxs}</td>
                <td>${prodata[i].ads}</td>
                <td>${prodata[i].discount}</td>
                <td>${prodata[i].total}</td>
                <td>${prodata[i].category}</td>
                <td><button onclick='UpdateData(${i})' id="update">Update</button></td>
                <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
            </tr>
        `
                }       
    }
    }
    document.getElementById('tableData').innerHTML = table;
}

let scrollcircle=document.getElementById('scroll')
onscroll=function(){
    if(scrollY > 400){
        scrollcircle.style.opacity='1'
        scrollcircle.style.bottom='50px'
    }else{
        scrollcircle.style.opacity='0'
        scrollcircle.style.bottom='-50px'
    }
}
scrollcircle.onclick=function(){
    scroll({
        top:0,
        behavior:"smooth",
    })
}