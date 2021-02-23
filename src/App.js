

import React from "react";
import MaterialTable from "material-table";
import Axios from "axios"

const Api="http://localhost:3000/v1"

class  App extends React.Component {

  state={ 
    data:[],
    photos:[],
    show:false

  }

  onDelete(id){
    console.log(id);
    if (window.confirm("are you sure you want to delete ?")){
    this.setState({show:true})
    Axios.delete(`${Api}/events/${id}`)
    .then(res=>{
      console.log(res);
      //this.setState({data:res.data})

      Axios.get(`${Api}/events`)
    .then(res=>{
      console.log(res);
      this.setState({data:res.data.results})

    }).catch(res=>{
      console.log(res);
    })


    }).catch(res=>{
      console.log(res);
    })
  }
  }

  componentDidMount(){

    Axios.get(`${Api}/events`)
    .then(res=>{
      console.log(res);
      this.setState({data:res.data.results})

    }).catch(res=>{
      console.log(res);
    })


  }
  fetchPhotos(id){
let { data}= this.state
 console.log(id);
 //console.log(data.filter(r=>r.id=== id)[0].photos);

 this.setState({photos:data.filter(r=>r.id=== id)[0].photos})
  }

  render(){
    // const data = [
    //   { title: "John", description: "john@gmail.com", category: 12, Photos: <div>click</div> },
    //   { title: "Bren", description: "bren@gmail.com", category: 24, Photos: "Male" },
     
    // ];
 let { data}= this.state;

 var final=[];

 if(data){

  data.map(r=>{
    final.push({
      title: r.title,
       description: r.description, 
       category: r.category,
        photos: <a data-toggle="modal" data-target="#exampleModal" onClick={()=>this.fetchPhotos(r.id)}>See All</a>,
        actions:<div onClick={()=>this.onDelete(r.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg></div>
      
  
    })


  })

  
 }

    const columns = [
      {
        title: "Title",
        field: "title",
      },
      {
        title: "Description",
        field: "description",
      },
      {
        title: "Category",
        field: "category",
      },
      {
        title: "Photos",
        field: "photos",
      },
      {
        title: "Actions",
        field: "actions",
      },
    ];
  
  return (
    <div className="">
       
 <MaterialTable title="Event Details" data={final} columns={columns} />
<div class="modal" id="exampleModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Photos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        {this.state.photos.map(r=>{
          return <img src={r.base} />
        })}
      </div>
      {/* <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div> */}
    </div>
  </div>
</div>
     
    </div>
  );
  }
}

export default App;
