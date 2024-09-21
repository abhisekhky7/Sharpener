window.addEventListener('DOMContentLoaded',()=>{
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
    let ul = document.getElementById('ul');
    let li = document.createElement('li');
    li.appendChild(
        document.createTextNode(`${obj.name}-${obj.email}-${obj.phone}`)
    );

    const delBtn = document.createElement('button');
    delBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(delBtn);

    delBtn.addEventListener('click',(e)=>{
        ul.removeChild(e.target.parentElement);
         localStorage.removeItem(obj.email)
         updateCount()

    })

    const edtBtn = document.createElement('button');
    edtBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(edtBtn);

    edtBtn.addEventListener('click',(e)=>{
        ul.removeChild(e.target.parentElement);
        localStorage.removeItem(obj.email)
        form.elements.username.value=obj.name
        form.elements.phone.value=obj.phone
        form.elements.email.value=obj.email
   updateCount()

    })
ul.appendChild(li)

   


   function updateCount(){
    let c = document.getElementById('count') 
    c.innerText = ul.children.length;
   }
   updateCount()

}









})