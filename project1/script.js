let form =document.querySelector('form')

form.onsubmit=(e)=>{
    e.preventDefault();
    let name =e.target.username.value;
    let email =e.target.email.value;
    let phone =e.target.phone.value;
    let obj={
        "name":name,
        "email":email,
        "phone":phone,
    }

    localStorage.setItem(email,JSON.stringify(obj));

    addtoUl(obj);
    

}

function addtoUl(obj){
    // console.log(`${obj.name} ${obj.email} ${obj.phone}`)
    let ul = document.getElementById('ul');
    let li = document.createElement('li');
    li.innerHTML+= `${obj.name} ${obj.email} ${obj.phone}`
    li.innerHTML+= `<button onclick=handleDelete(event,'${JSON.stringify(obj)}') >Delete</button>`
    li.innerHTML+= `<button onclick=handleEdit(event,'${JSON.stringify(obj)}') >Edit</button>`
    ul.appendChild(li)
}


function handleDelete(e,obj){
    obj = JSON.parse(obj)
    localStorage.removeItem(obj.email)
    let ele =e.target.parentElement
    let ul = document.getElementById('ul');
    ul.removeChild(ele)
    
}

function handleEdit(e,obj){
    handleDelete(e,obj);
    obj = JSON.parse(obj);
    form.elements.username.value=obj.name;
    form.elements.email.value=obj.email
    form.elements.phone.value=obj.phone
}

