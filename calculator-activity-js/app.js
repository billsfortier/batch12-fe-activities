// Variables
var container = document.createElement('div'),
    calcWrapper = document.createElement('div'),
    tFieldWrapper = document.createElement('div'),
    textField = document.createElement('input'),
    btnWrappper = document.createElement('div'),
    addBtn = document.createElement('input'),
    subBtn = document.createElement('input'),
    mulBtn = document.createElement('input'),
    divBtn = document.createElement('input'),
    equalBtn = document.createElement('input'),
    clrBtn = document.createElement('input');
    
// Name
textField.name = "inputField";

// Type
textField.type = 'text';
addBtn.type = 'button';
subBtn.type = 'button';
mulBtn.type = 'button';
divBtn.type = 'button';
equalBtn.type = 'button';
clrBtn.type = 'button';

// Value
addBtn.value = '+';
subBtn.value = '-';
mulBtn.value = '*';
divBtn.value = '/';
equalBtn.value = '=';
clrBtn.value = 'C';

// Classname
container.className = "container";
tFieldWrapper.className = "tFieldWrapper";
btnWrappper.className = "btnWrapper";
addBtn.className = "btn";
subBtn.className = "btn";
mulBtn.className = "btn";
divBtn.className = "btn";
equalBtn.className = "btn";
clrBtn.className = "btn";

// ID
textField.id = "t-field";
addBtn.id = "add";
subBtn.id = "sub";
mulBtn.id = "mul";
divBtn.id = "div";
equalBtn.id = "eq";
clrBtn.id = "clr";

// Style
const containerStyle = {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#0cbaba',
    backgroundImage: 'linear-gradient(315deg, #0cbaba 0%, #380036 74%)'
};

const calcStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '-30px -30px 20px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(15px)',
    opacity: '0.7',
    borderRadius: '10px',
    padding: '30px'
};

const tFieldWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
};

const tFieldStyle = {
    width: '100%',
    outline: 'none',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    background: 'none',
    color: '#fff',
    padding: '0.6rem',
    fontSize: '1.5rem',
    letterSpacing: '0.5px',
    borderRadius: '10px'
};

const btnWrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100px',
    marginTop: '30px',
    marginBottom: '30px'
};
const btnStyle = {
    width: '60px',
    height: '60px',
    color: '#000',
    padding: '0.6rem',
    marginTop: '5px',
    fontSize: '1.5rem',
    backgroundColor: 'none',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px'
};

// Element Styling
// body
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.boxSizing = "border-box";

// container
Object.assign(container.style, containerStyle);
// calcWrapper
Object.assign(calcWrapper.style, calcStyle);
// tFieldWrapper
Object.assign(tFieldWrapper.style, tFieldWrapperStyle);
// textField
Object.assign(textField.style, tFieldStyle);
// btnWrapper
Object.assign(btnWrappper.style, btnWrapperStyle);
// button
Object.assign(addBtn.style, btnStyle);
Object.assign(subBtn.style, btnStyle);
Object.assign(mulBtn.style, btnStyle);
Object.assign(divBtn.style, btnStyle);
Object.assign(equalBtn.style, btnStyle);
Object.assign(clrBtn.style, btnStyle);

// Append
document.body.appendChild(container);
container.appendChild(calcWrapper);
calcWrapper.appendChild(tFieldWrapper);
calcWrapper.appendChild(btnWrappper);
tFieldWrapper.appendChild(textField);
btnWrappper.appendChild(addBtn);
btnWrappper.appendChild(subBtn);
btnWrappper.appendChild(mulBtn);
btnWrappper.appendChild(divBtn);
btnWrappper.appendChild(equalBtn)
btnWrappper.appendChild(clrBtn);

// Function
function result() {
    var equals = document.getElementById('t-field').value;
    var ans = eval(equals);
    document.getElementById('t-field').value = ans;
    console.log(eval(equals));
}

function add() {
    var add = document.getElementById('add');
    document.getElementById('t-field').value += "+";
}

function sub() {
    var sub = document.getElementById('sub');
    document.getElementById('t-field').value += "-";
}

function mul() {
    var mul = document.getElementById('mul');
    document.getElementById('t-field').value += "*";
}

function div() {
    var div = document.getElementById('div');
    document.getElementById('t-field').value += "/";
}

function clear() {
    var clr = document.getElementById('clr');
    document.getElementById('t-field').value = "";
}
// Event Listener
document.getElementById('eq').addEventListener("click", result);
document.getElementById('add').addEventListener("click", add);
document.getElementById('sub').addEventListener("click", sub);
document.getElementById('mul').addEventListener("click", mul);
document.getElementById('div').addEventListener("click", div);
document.getElementById('clr').addEventListener("click", clear);