const set_values = document.getElementById("set_values");
const add_value = document.getElementById("add_value");
const min = document.getElementById("min");
const max = document.getElementById("max");
const set_result = document.getElementById("set_result");
const set_status = document.getElementById("set_status");
let values = [10,21,20,40,30];

function renderValues()
{
    let setElement = "";
    for(var index in values)
    {
        setElement += `
        <td>
            ${values[index]}
            <button style="background-color:#fff;color:red;padding:0;" onclick="deleteValue(${index})">
                x
            </button>
        </td>
        `
    }
    set_values.innerHTML = setElement;
}
renderValues();

function addValue()
{
    if(add_value.value == "")
    {
        swal({
            title: "Form Wajib Di Isi Semua",
            icon: "error",
            button: "Close",
        });
    }
    else 
    {
        values.push(parseInt(add_value.value));
        swal("Data Berhasil DI Simpan","","success");
        renderValues();
        add_value.value ="";
    }
}

function deleteValue(indx)
{
    values.splice(indx,1);
    renderValues();
    swal("Nilai Berhasil DI Hapus","","success");
}


function sendData()
{
    let setElement = "";
    values.map((value,index) => 
    {
            if(value > min.value && value < max.value)
            {
                setElement += `
                    <span style="color:red;">${value}</>
                `;
            }
    });
    set_status.innerText = `Data Range Dari ${min.value} Sampai ${max.value} Adalah :`;
    set_result.innerHTML = setElement;
    min.value ="";
    max.value ="";
}