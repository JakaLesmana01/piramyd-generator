function piramyd(str, rows, invert) {
  let arr = [];
  for (let i = 1; i <= rows; i++) {
    let spaces = rows - i;
    let char = 2 * i - 1;
    let baris = " ".repeat(spaces) + str.repeat(char);
    arr.push(baris);
  }

  if (invert) {
    arr.reverse();
  }

  return "\n" + arr.join("\n") + "\n";
}

// UI SECTION
const MAX_ROWS = 40;

const charInput = document.querySelector("#char");
const rowsInput = document.querySelector("#rows");
const invertInput = document.querySelector("#invert");
const errorEl = document.querySelector("#error");
const output = document.querySelector("#output");
const copyBtn = document.querySelector("#copy");
const form = document.querySelector("#form");

function validate(str, rows) {
  if (str.trim() === "") {
    return "Isi satu karakter yang bukan spase";
  }
  if (!Number.isInteger(rows) || rows < 1 || rows > MAX_ROWS) {
    return `Jumlah baris harus bilangan bulat dari 1 sampai ${MAX_ROWS}`;
  }
  return "";
}

function render() {
  const str = charInput.value;
  const rows = Number(rowsInput.value);
  const invert = invertInput.checked;

  const message = validate(str, rows);

  if (message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    output.textContent = "";
    output.disabled = true;
    return;
  }

  errorEl.hidden = true;
  output.disable = false;

  output.textContent = piramyd(str, rows, invert).replace(/^\n|\n$/g,"");
}

async function copyResult() {
    const label = "Salin Hasil";
    try{
        await navigator.clipboard.writeText(output.textContent);
        copyBtn.textContent = "Tersalin";
    }catch{
        copyBtn.textContent = "Gagal Menyalin";
    }
    setTimeout(()=>{
        copyBtn.textContent = label;
    },1500);
}

form.addEventListener("input",render);
form.addEventListener("submit",(event)=> event.preventDefault());
copyBtn.addEventListener("click",copyResult)

render()
