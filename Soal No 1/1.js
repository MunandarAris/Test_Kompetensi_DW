const name = document.getElementById('name');
const group = document.getElementById('group');
const time = document.getElementById('time');
let set_result = document.getElementById('set_result');

let employees = [];
let wages = 0;
let overtimePay = 0;


function sendData()
{
    if(name.value == "" || group.value =="" || time.value == "")
    {
        swal({
            title: "Form Wajib Di Isi Semua",
            icon: "error",
            button: "Close",
        });
    }
    else 
    {
        if(group.value === "A")
        {
            wages =  5000 * time.value;
        }
        else if (group.value === "B")
        {
            wages =  7000 * time.value;
        }
        else if (group.value === "C")
        {
            wages =  8000 * time.value;
        }
        else if (group.value === "D")
        {
            wages =  10000 * time.value;
        }
        else
        {
            console.log("Golongan Tidak Terdaftar");
        }

        if(time.value < 50)
        {
            overtimePay;
        }
        else
        {
            overtimePay = (time.value - 48) * 4000;
        }
        
        const employee = {
            id : Date.now(),
            name : name.value,
            group : group.value,
            time : time.value,
            wages,
            overtimePay,
            salary :wages + overtimePay
        }
        employees.push(employee);
        swal("Data Berhasil DI Simpan","","success");
        resetForm();
        renderData();
    }
}

function renderData()
{
    let setElement = "";

    employees.forEach((employee) =>
    {
        setElement += `
        <div class="card-data">
            <p>Nama Pegawai : ${employee.name}</p>
            <p>Golongan : ${employee.group}</p>
            <p>Jam Kerja : ${employee.time} Jam</p>
            <p>Upah : Rp. ${employee.wages}</p>
            <p>Uang Lembur : Rp. ${employee.overtimePay}</p>
            <p>Gaji : Rp. ${employee.salary}</p>
            <footer>
                <button onclick = "deleteData(${employee.id})">
                    <i class='bx bxs-trash-alt' ></i>
                </button>
            </footer>
        </div>
        `
    });
    set_result.innerHTML = setElement;
}

function deleteData(id)
{
    const idEmployee = id;
    swal({
        title: "Apakah Anda Yakin ?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Data Berhasil DI Hapus","","success");
            employees.find((employee,index) =>
            {
                if(employee.id == idEmployee)
                {
                    employees.splice(index,1);
                    renderData();
                    renderImage();
                }
            });
        }
    });
    
}


function renderImage()
{
    if(employees.length <= 0)
    {
        set_result.innerHTML = `
            <section>
                <img src="icon.svg" alt="">
            </section>
        `;
    }
}


function resetForm()
{
    name.value = "";
    group.value = "";
    time.value = "";
}