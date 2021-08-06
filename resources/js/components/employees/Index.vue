<template>
    <div>
         <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Employees</h1>
    </div>
    <div class="container">
        <div class="row justify-content-center">
       
            <div class="col-md-8">
                <div class="card">
                    <div v-if="showMessage">
                        <div class="alert alert-success">{{ message }}</div>
                    </div>
                    <div class="card-header">
                        <div class="row">
                            <div class="col">
                                <form>
                                    <div class="form-row align-items-center">
                                        <div class="col">
                                            <input type="search" name="search" class="form-control mb-2" placeholder="search by username or email">
                                        </div>
                                        <div class="col">
                                            <button type="submit" class="btn btn-primary mb-2">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <router-link :to="{name: 'EmployeesCreate'}" 
                                class="btn btn-primary mb-2"
                                >Create</router-link>
                            </div>
                        </div>
                       
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">#Id</th>
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Middlename</th>
                                <th scope="col">Address</th>
                                <th scope="col">Department</th>
                                <th scope="col">Manage</th>
                            </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="employee in employees" :key="employee.id">
                                        <th scope="row">#{{ employee.id }}</th>
                                        <td>{{ employee.first_name }}</td>
                                        <td>{{ employee.last_name }}</td>
                                        <td>{{ employee.middle_name }}</td>
                                        <td>{{ employee.address }}</td>
                                        <td>{{ employee.department.name }}</td>
                                        <!-- <td>{{ employee.country.name }}</td> -->
                                        <!-- <td>{{ employee.state.name }}</td>
                                        <td>{{ employee.zip_code }}</td>
                                        <td>{{ employee.birthdate }}</td>
                                        <td>{{ employee.date_hired }}</td> -->
                                        <td>
                                            <router-link :to="{
                                                name: 'EmployeesEdit', 
                                                params: {id: employee.id}
                                                }" 
                                                class="btn btn-sm btn-success"
                                                >Edit</router-link>
                                                <button  
                                                class="btn btn-sm btn-danger" 
                                                @click="deleteEmployee(employee.id)"
                                                >Delete</button>
                                        </td>      
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            employees: [],
            showMessage: false,
            message: ''
        };
    },
    created() {
        this.getEmployees();
    }, 
    methods: {
        getEmployees(){
            axios.get("/api/employees")
                .then(res => {
                    this.employees = res.data;
                    // console.log(this.employees);
                }).catch(error => {
                    console.log(error);
                })
        },
        deleteEmployee(id){
            axios.delete('api/employees/'+ id).then(res => {
                // console.log(res);
                this.showMessage = true;
                this.message = res.data;
                this.getEmployees();
            });
        }
    }
}
</script>