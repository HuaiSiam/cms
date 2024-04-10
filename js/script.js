let temparr = [], cmsarray = [];
let existingArrayJSON = localStorage.getItem('cmsObj')==null?'':localStorage.getItem('cmsObj');
let existingArray = existingArrayJSON?JSON.parse(existingArrayJSON):null;
function getItem(){
    if(document.querySelector('.contents')){
        let content = '';
        document.querySelector('.contents').innerHTML = '';

        existingArray.forEach(element => {
            content += `<a href="./inner.html#${element.id}">${element.value}</a>`
        });
        
        document.querySelector('.contents').insertAdjacentHTML("afterbegin", content);
    }
}

function handleSubmit(){
    let temp = {'value': tinyMCE.activeEditor.getContent()};
    temparr.push(temp);
    temparr = temparr.map((item, index) => ({ ...item, id: index + 1 }));
    if(existingArrayJSON.length > 0) {
        let combinedArray = [...existingArray,...temparr];
        combinedArray = combinedArray.map((item, index) => ({ ...item, id: index + 1 }));
        cmsarray = combinedArray;
    } 
    else cmsarray = temparr;
    const combinedArrayJSON = JSON.stringify(cmsarray);
    
    localStorage.setItem('cmsObj', combinedArrayJSON);
    
    let newarray = localStorage.getItem('cmsObj');
    existingArray = JSON.parse(newarray);
    var editor = tinyMCE.get('elm1');
    if (editor) editor.setContent('');
    document.querySelector('.contents').innerHTML = '';
    getItem();
}

if(existingArray) setTimeout(() => getItem(), 50);

setTimeout(() => {
    let innercontent = document.querySelector('.inner-contents'), innercontentlist = '';
    if(innercontent){
        let [, id] = window.location.hash.split('#');
        if(existingArray){
            existingArray.forEach(item => {
                if(item.id == id) innercontentlist = item.value;
            });

            innercontent.innerHTML = innercontentlist;
        }
    }
}, 50);