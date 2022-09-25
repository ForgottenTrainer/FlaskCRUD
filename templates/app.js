document.addEventListener("DOMContentLoaded",init)
var myModal = document.getElementById('myModal')


const URL_API = 'http://127.0.0.1:3000/api/'

var customers = []

function init(){
    search()
}

async function search() {
    var url = URL_API + 'customers'
    var response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
    customers = await response.json();
    var html = ''
    for (customer of customers) {
        var row = `<tr>
            <td>${customer.firstname}</td>
            <td>${customer.lastname}</td>
            <td>${customer.telefono}</td>
            <td>${customer.email}</td>
            <td><button type="button" onclick="edit(${customer.id})" class=" btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Editar
            </button>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Agregar usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control txtFirstname" id="floatingInput " placeholder="name@example.com">
                      <label for="floatingInput">Nombre</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control txtLastname" id="floatingInput " placeholder="name@example.com">
                      <label for="floatingInput">Apellido</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="text" class="form-control txtEmail" id="floatingPassword" placeholder="Email">
                      <label for="floatingPassword">Email</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="number" class="form-control txtPhone" id="floatingPassword " placeholder="Phone">
                      <label for="floatingPassword">Telefono</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="text" class="form-control txtAddress" id="floatingPassword" placeholder="Address">
                      <label for="floatingPassword">Direccion</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit"  class="btn btn-success">Aceptar</button>
                  </div>
                </div>
              </div></td>
            <td><button onclick="remove(${customer.id})" id="button" class="btn btn-danger">Eliminar</button></td>
        </tr>`;
      html = html + row;
    }
  
  
    document.querySelector('#customers > tbody').outerHTML = html
  }

async function remove(id){
    respuesta = confirm('Estas seguro de eliminarlo?')
    if(respuesta){
        var url = URL_API + 'customers/' + id
        await fetch(url, {
          "method": 'DELETE',
          "headers": {
            "Content-Type": 'application/json'
          }
        })
        window.location.reload()
    }
}

function clean() {
  document.querySelector('#txtId').value = ''
  document.querySelector('.txtEmail').value = ''
  document.querySelector('.txtFirstname').value = ''
  document.querySelector('.txtLastname').value = ''
  document.querySelector('.txtPhone').value = ''
  document.querySelector('.txtAddress').value = ''
}

function agregar(){
  clean()

}

async function save(){
    //document.querySelector('#txtFirsname').value
    var data = {
        "email": document.querySelector('.txtEmail').value,
        "firstname": document.querySelector('.txtFirstname').value,
        "lastname": document.querySelector('.txtLastname').value,
        "telefono": document.querySelector('.txtPhone').value,
        "address":document.querySelector('.txtAddress').value
    }
    var id = document.querySelector('#txtId').value

    if(id != ''){
      data.id = id
    }

    respuesta = confirm('Todos los datos son correctos??')
    var url = URL_API + 'customers' 
    await fetch(url, {
        "method": 'POST',
        "body": JSON.stringify(data),
        "headers": {
        "Content-Type": 'application/json'
        }
    })
    window.location.reload()
}


function edit(id){
  var customer = customers.find(x => x.id == id)
  document.querySelector('#txtId').value = customer.id
  document.querySelector('.txtEmail').value = customer.email
  document.querySelector('.txtFirstname').value = customer.firstname
  document.querySelector('.txtLastname').value = customer.lastname
  document.querySelector('.txtPhone').value = customer.telefono
  document.querySelector('.txtAddress').value = customer.address
}