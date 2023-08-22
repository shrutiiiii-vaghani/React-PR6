import './Crud.css';
import { useEffect, useState } from "react";

const Crud = ({closeModal}) => {
    const[input,setInput] = useState({
        name:'',
        email:'',
        password:'',
        city:'',
        salary:'',
       })
    
       const[record,setRecord] = useState([]);
       const[editid,setEditId] = useState("");
       
    
       const handleChange = (e) => {
        const{name,value} = e.target;
        setInput({
            ...input,[name] : value
        })
       }
    
       const handleSubmit = () => {
        if(editid){
          let ans = record.filter((item)=>{
             if(item.id == editid){
              item.name = input.name;
              item.email = input.email;
              item.password = input.password;
              item.city = input.city;
              item.salary = input.salary;
             }  
             return item
          })
          setRecord(ans);
          setEditId("")
        }else{
          let obj = { 
                      id: Math.floor(Math.random() * 10000),
                      name : input.name,
                      email : input.email,
                      password: input.password,
                      city : input.city,
                      salary: input.salary,
                  }
        
                 let data = [...record,obj];
        
                   setRecord(data);
                   localStorage.setItem('crud',JSON.stringify(data));
        }
        setInput({
            name:'',
            email:'',
            password: '',
            city:'',
            salary:'',
          })
       }
    
    
        const deleteData = (id) => {
          let ans = record.filter((item)=>{
            return item.id !== id;
          })
          setRecord(ans);
          localStorage.setItem('crud',JSON.stringify(ans));
          alert("delete succesfully Deleted");
        }
       
         const editData = (id) => {
          let ans = record.filter((item)=> {
             return item.id === id;
          })
          setInput(ans[0]);
        setEditId(id);
         }
    
    
       useEffect(() => {
         let allrecord = JSON.parse(localStorage.getItem('crud'));
         if(allrecord === null){
            setRecord([]);
         }else{
            setRecord(allrecord);
         }
       },[]);

        return(
            <>
            <center>
            <div className="container">
            {/* <button onClick={() => closeModal(false)} style={{    marginLeft: "245px",
             marginBottom: "15px", marginTop: "36px"}} type="button" class="btn btn-outline-danger">Close</button> */}
              <br/>
              <br/>
            <table border={2} cellPadding={10} className='bg pt-5' style={{border:"1px solid #5DADE2",borderRadius:"15px"}}>
              <tr>
                <td>Name</td>
                <td><input type="text" name="name" onChange={handleChange} value={input.name}/></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input type="text" name="email" onChange={handleChange} value={input.email}/></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input type="password" name="password" onChange={handleChange} value={input.password}/></td>
              </tr>
              <tr>
                <td>City</td>
                <td><input type="text" name="city" onChange={handleChange} value={input.city}/></td>
              </tr>
              <tr>
                <td>Salary</td>
                <td><input type="number" name="salary" onChange={handleChange} value={input.salary}/></td>
              </tr>
              <tr>
                <td></td>
                <td>
                 {
                   (editid) ? (<input type="button" style={{padding:"5px 15px"}} value="Edit" onClick={() => handleSubmit()}/>) : (<input type="button" value="Submit"   style={{padding:"5px 15px"}} className="submitbtn" onClick={() => handleSubmit()}/>)
                 }
                </td>
              </tr>
            </table>
            </div>
            
            <br/>
            <br/>
            <div className="container">
            {/* <h2>Show All Record:</h2> */}
            <table border={2} cellPadding={10} className="table table-success table-striped">
                <thead style={{textAlign:"center"}}>
                   <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>City</th>
                    <th>Salary</th>
                    <th>Action</th>
                   </tr>
                </thead>
                <tbody>
                  {
                    record.map((item)=>{
                      const{id,name,email,password,city,salary} = item;
                      return(
                        <tr key={id} style={{textAlign:"center"}}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{password}</td>
                            <td>{city}</td>
                            <td>{salary}</td>
                            <td>
                              <button onClick={() => deleteData(id)} style={{marginRight:"15px"}}><i class="bi bi-trash3-fill"></i></button>
                              <button onClick={() => editData(id)}><i class="bi bi-pencil-square"></i></button>
                            </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
            </table>
            </div>
            
            </center>
            </>
        )
}

export default  Crud; 