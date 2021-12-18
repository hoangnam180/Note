const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const NOTE_STORAGE_KEY = 'NOTES';
//localStorage
function getLocalstore(){
    return JSON.parse(localStorage.getItem(NOTE_STORAGE_KEY)) || [];
}

function setLocalstore(note){
    localStorage.setItem(NOTE_STORAGE_KEY,JSON.stringify(note))
}
// List
const listNote = getLocalstore();
// flag mode
let flag = false;
let tempId ;
function assignIndex(index){
    tempId = index;
}
//enable flag
function enableFlag(){
    flag = true;
}

function dissableFlag(){
    flag = false;
}
//dissable flag

//render
function render(){

   let html =  listNote.map((note,index)=>
        `<li onclick="event.target == event.target.closest('.close i') && Remove(${index})" class="noteitem">
            <span class="NoteItem-title">${note}</span>
            <span class="change" onclick="event.target && change(${index})">Sửa</span>
            <span class="close" id = "close"><i class="fas fa-times"></i></span>
        </li>`
    ).join('')


    setHTML('.notelist',html);
}
function setHTML(element,html){
    $(element).innerHTML = html; 
}
function handleChang(){
    let value = $('#textnote').value;
    listNote[tempId] = value;
    $('#textnote').value = '';
    dissableFlag();
    setHTML('#button','Thêm')
    render();
    setLocalstore(listNote);
}
//add
function add(){
    if(flag){
       handleChang()
    }else{
        let value = $('#textnote').value;
        if(value.length > 0){
        listNote.push(value)
        $('#textnote').value = '';
        render();
        }
    }
    setLocalstore(listNote)
}
//change
function change(index){
    $('#textnote').value = listNote[index]
    $('#textnote').focus()
    enableFlag()
    setHTML('#button','Cập Nhật')
    assignIndex(index);
}
//remove
function Remove(index){
    listNote.splice(index,1)
    setLocalstore(listNote)
    render();
}
//cancel
function cancel(){
    $('#textnote').value = null;
    $('#textnote').blur();
    dissableFlag();
    setHTML('#button','Thêm')
}
render()