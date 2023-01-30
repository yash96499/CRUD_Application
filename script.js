var store={};
var table;
var minDate, maxDate;
var xmlhttp = new XMLHttpRequest();
var url = "/api/fetchall";
xmlhttp.open("Get",url,true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status==200){

        store.data = JSON.parse(this.responseText);
        // console.log("label",data);
        minDate = new DateTime($('#min'), {
            format: 'DD-MM-YYYY'
        });
        maxDate = new DateTime($('#max'), {
            format: 'DD-MM-YYYY'
        });
        table=$('#example').DataTable({
            // ajax: 'data/objects.txt',
            dom: 'Blfrtip',
            "data":store.data,
            pageLength:50,
            columns: [
                {data:null,
                    render: function(row) {
                        return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalEdit" onclick='Edit(${row.id})'>Edit</button>
                        
                        
                        
                        &nbsp;&nbsp;&nbsp; 
                        <button type="button" class="btn btn-primary"  onclick='Delete_Data(${row.id})'>Delete</button>`;
                    },
                },
                { data: 'id' },
                {data:null,
                    render: function(row) {
                        if(row.count>1){
                            // alert("Duplicate Entry");
                            return row.warn="!!"+" "+`<i class='fa fa-warning' style='color: red'></i>`;
                        }else{
                            return row.warn="-";
                        }
                        // return  
                        // `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalHistory" onclick='show_data(${row.id})'>history</button>`;
     
                    }
                },
                { data: 'status' },
                { data: 'name' },
                { data: 'phone' },
                { data: 'building_no' },
                { data: 'street' },
                { data: 'state' },
                { data: 'Created' },
                { data: 'plumber' },
                { data: 'Done_date' },
                { data: 'issue' },
                { data: 'Amount' },
                { data: 'count' },
                {data:null,
                    render: function(row) {
                        return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalHistory" onclick='show_data(${row.id})'>history</button>`;
     
                    }
                },
                {data:'Instruction'},
                
            ],
            buttons:[
                //  'copy', 'csv', 'excel', 'pdf', 'print',
                        'excel',
                        {
                        //     {   extend: 'print',
                        //         text: 'Print current page',
                        //         title:'',
                        //         exportOptions: {
                        //             modifier: {
                        //                 page: 'current'
                        //             }
                        //         }
                        //     },
                        //     {   
                                    extend: 'pdfHtml5',
                                    text: 'PDF',
                                    orientation: 'landscape',
                                    pageSize: 'LEGAL',
                                    exportOptions: {
                                        modifier: {
                                            page: 'current'
                                        }
                                    }
                        //     }
                        }
                    ]
                    
        });
    }
}

// function testing(){
//     $.ajax ({
//         url : "/api/fetchall",                    //how to pass id and arrId
//         type : "GET",
//         success:function() {
//             store.data = JSON.parse(this.responseText);
//         // console.log("label",data);
//             minDate = new DateTime($('#min'), {
//                 format: 'DD-MM-YYYY'
//             });
//             maxDate = new DateTime($('#max'), {
//                 format: 'DD-MM-YYYY'
//             });
//             table=$('#example').DataTable({
//             // ajax: 'data/objects.txt',
//                 dom: 'Blfrtip',
//                 "data":store.data,
//                 columns: [
//                 { data: 'id' },
//                 {data:null,
//                     render: function(row) {
//                         if(row.count>1){
//                             // alert("Duplicate Entry");
//                             return row.warn="Warning!!"+" "+`<i class='fa fa-warning' style='color: red'></i>`;
//                         }else{
//                             return row.warn="-";
//                         }
//                         // return  
//                         // `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalHistory" onclick='show_data(${row.id})'>history</button>`;
     
//                     }
//                 },
//                 { data: 'status' },
//                 { data: 'name' },
//                 { data: 'phone' },
//                 { data: 'building_no' },
//                 { data: 'street' },
//                 { data: 'city' },
//                 { data: 'state' },
//                 { data: 'zip_code' },
//                 { data: 'Created' },
//                 { data: 'plumber' },
//                 { data: 'Done_date' },
//                 { data: 'issue' },
//                 { data: 'Amount' },
//                 { data: 'count' },
//                 {data:null,
//                     render: function(row) {
//                         return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalHistory" onclick='show_data(${row.id})'>history</button>`;
     
//                     }
//                 },
//                 {data:'Instruction'},
//                 {data:null,
//                     render: function(row) {
//                         return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalEdit" onclick='Edit(${row.id})'>Edit</button>
                        
                        
                        
//                         &nbsp;&nbsp;&nbsp; 
//                         <button type="button" class="btn btn-primary"  onclick='Delete_Data(${row.id})'>Delete</button>`;
//                     },
//                 },
//             ],
//             buttons:[
//                 //  'copy', 'csv', 'excel', 'pdf', 'print',
//                         'excel',
//                         {
//                         //     {   extend: 'print',
//                         //         text: 'Print current page',
//                         //         title:'',
//                         //         exportOptions: {
//                         //             modifier: {
//                         //                 page: 'current'
//                         //             }
//                         //         }
//                         //     },
//                         //     {   
//                                     extend: 'pdfHtml5',
//                                     text: 'PDF',
//                                     orientation: 'landscape',
//                                     pageSize: 'LEGAL',
//                                     exportOptions: {
//                                         modifier: {
//                                             page: 'current'
//                                         }
//                                     }
//                         //     }
//                         }
//                     ]
                    
//             });
//         }
//     });
// }

function show_data(rowid){
    
    let row=getDataByRowId(rowid);
    console.log('data value',row);
    // const body = document.getElementsByClassName("history-body"),
    tbl = document.getElementById("History_table");
    // tbl.style.width = '100px';
    console.log("tbl",tbl);
    tbl.style.border = '1px solid black';
    
    for(var item in row.history){
        const tr = tbl.insertRow();
        tr.className='remove';
        var r= row.history[item];
        console.log("plumber",r.plumber_name);
        var array=[r.plumber_name,r.client_issue,r.Amount_paid,r.Created,r.Done_date];
        console.log("first",array[0]);
        for(let j=0;j<5;j++){
            const td=tr.insertCell();
            td.style.border = '1px solid black';
            td.appendChild(document.createTextNode(array[j]));
        }
    }    
}

function check_data(){
    var form = new FormData(document.getElementById("Add_form"));
    var uphone =  form.get('inputphone1');
    let row=getDataByPhone(uphone);
    if(row){
        $('#inputName1').val(row.name);
        $('#inputPhone1').val(row.phone);
        $('#inputHouse1').val(row.building_no);
        $('#inputStreet1').val(row.street);
        $('#inputCity1').val(row.city);
        $('#inputState1').val(row.state);
        $('#inputZip1').val(row.zip_code);
        $('#inputInstruction1').val(row.Instruction);
    }
}

// line 207 message to print at time of new data
function add_data(){
    
    var form = new FormData(document.getElementById("Add_form"));
    var uname =   form.get('inputname1');
    if(!uname){
        uname="-";
    }
    var uphone =  form.get('inputphone1');
    if(!uphone){
        uphone="-";
    }
    var uhouse =  form.get('inputhouse1');
    if(!uhouse){
        uhouse="-";
    }
    var ustreet =  form.get('inputstreet1');
    if(!ustreet){
        ustreet="-";
    }
    var ucity =  form.get('inputcity1');
    if(!ucity){
        ucity="-";
    }
    var ustate =  form.get('inputstate1');
    if(!ustate){
        ustate="-";
    }
    var ustatus=form.get('inputstatus1');
    if(ustatus=="DONE"){
        var doneConfirm = confirm("Are you sure (STATUS=DONE)?");
        if (doneConfirm == true) {
            ustatus="DONE";
        }else ustatus="PENDING";
    }
    if(!ustatus){
        ustatus="PENDING";
    }
    var uzip =  form.get('inputzip1');
    if(!uzip){
        uzip=0;
    }
    var uinstruction =  form.get('inputinstruction1');
    if(!uinstruction){
        uinstruction="-";
    }
    
    // console.log("uname",uname);
    // console.log("uphone",uphone);
    // console.log("uhouse",uhouse);
    // console.log("ustreet",ustreet);
    // console.log("ucity",ucity);
    // console.log("ustate",ustate);
    // console.log("ustate",ustatus);
    // console.log("uzip",uzip);
    // console.log("uinstruction",uinstruction);

    $.ajax ({
               url : "/api/post",
               type : "POST",
               dataType : "text",
               data : {
                    name: uname,
                    phone: uphone,
                    building_no:uhouse,
                    street : ustreet,
                    city : ucity,
                    state:ustate,
                    status:ustatus,
                    zip_code: uzip,
                    instructions:uinstruction
               }
        });

        // message to send at the time of new query
        var message1= "Hi! Thanks for bringing the problem to our notice. Just wanted to let you know we have *registered your complaint* and will be at your service soon.%0D%0A%0D%0ALooking forward to resolving your issue.%0D%0A…%0D%0A*Volga Bath Fittings*";
        
        var message2="Hi! Your issue has been successfully resolved and hoping you are satisfied with the service. Would love to hear your feedback about the same.%0D%0A%0D%0AReally grateful for your patience! %0D%0A…%0D%0A*Volga Bath Fittings*";
        
        alert("Data Added");
    
        if(ustatus=="PENDING"){
            let input = "https://web.whatsapp.com/send?phone=91"+uphone+"&text="+message1;
        // let mywind=
            window.open(input,'_self');
        }
        if(ustatus=="DONE"){
            let input = "https://web.whatsapp.com/send?phone=91"+uphone+"&text="+message2;
        // let mywind=
            window.open(input,'_self');
        }
    
        window.location.reload();
}

function Edit(rowid){
    let row=getDataByRowId(rowid);
    console.log("find",row);
    $('#inputName2').val(row.name);
    $('#inputPhone2').val(row.phone);
    $('#inputHouse2').val(row.building_no);
    $('#inputStreet2').val(row.street);
    $('#inputCity2').val(row.city);
    $('#inputState2').val(row.state);
    $('#inputZip2').val(row.zip_code);
    $('#inputStatus2').val(row.status);
    $('#inputPlumber2').val(row.plumber);
    $('#inputAmount2').val(row.Amount);
    $('#inputIssue2').val(row.issue);
    $('#inputInstruction2').val(row.Instruction);
    $('#hid').val(rowid);
}

//line 306 message to print at status is done
function edit_data(){
    var form = new FormData(document.getElementById("Edit_form"));
    var uname =   form.get('inputname2');
    var uphone =  form.get('inputphone2');
    var uhouse =  form.get('inputhouse2');
    var ustreet =  form.get('inputstreet2');
    var ucity =  form.get('inputcity2');
    var ustate =  form.get('inputstate2');
    var uzip =  form.get('inputzip2');
    var ustatus =  form.get('inputstatus2');
    var uplumber =  form.get('inputplumber2');
    var uamount =  form.get('inputamount2');
    var uissue =  form.get('inputissue2');
    var uinstruction =  form.get('inputinstruction2');
    var rowid=form.get('hid');
    let row=getDataByRowId(rowid);
    // console.log("row",row);
    var aId=row.count;
    aId=aId-1;
    if(ustatus=="DONE"){
        var doneConfirm = confirm("Are you sure (STATUS=DONE)?");
        if (doneConfirm == true) {
            ustatus="DONE";
        }else ustatus="PENDING";
    }
    // console.log("uname",uname);
    // console.log("uphone",uphone);
    // console.log("uhouse",uhouse);
    // console.log("ustreet",ustreet);
    // console.log("ucity",ucity);
    // console.log("ustate",ustate);
    // console.log("uzip",uzip);
    // console.log("ustatus",ustatus);
    // console.log("uplumber",uplumber);
    // console.log("uamount",uamount);
    // console.log("uissue",uissue);
    // console.log("uinstruction",uinstruction);
    
        $.ajax ({
            url : "/api/update?id="+row.id+"&arrId="+aId,                    //how to pass id and arrId
            type : "PUT",
            dataType : "text",
            data : {
                name:uname,
                 phone: uphone,
                 building_no:uhouse,
                 street : ustreet,
                 city : ucity,
                 state:ustate,
                 zip_code: uzip,
                 plumber:uplumber,
                 Amount:uamount,
                 Instruction:uinstruction,
                 issue:uissue,
                 status:ustatus,
                 plumber_name:uplumber,
                 Amount_paid:uamount,
                 client_issue:uissue,
                 instructions:uinstruction
            },
            success: function (data) {
                alert("Data edited");
                if(ustatus=="DONE"){
                    //message to send after status is done
                    var message="Hi! Your issue has been successfully resolved and hoping you are satisfied with the service. Would love to hear your feedback about the same.%0D%0A%0D%0AReally grateful for your patience! %0D%0A…%0D%0A*Volga Bath Fittings*";
                    let input = "https://web.whatsapp.com/send?phone=91"+uphone+"&text="+message;
                    window.open(input,'_self');
                }
                window.location.reload();
            }
    });
    
    
}

function Delete_Data(rowid){
    let row=getDataByRowId(rowid);

  
    var deleteConfirm = confirm("Are you sure?");
    if (deleteConfirm == true) {
    //    AJAX request
    $.ajax({
        url: "/api/del/"+rowid,
        type: "DELETE",

        })
    };
    alert("Record deleted.");
    window.location.reload();
    // table.ajax.reload();
}


$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = minDate.val();
        var max = maxDate.val();
        // var date = new Date(data[10]);
        var date=data[9];
        const [d, m, y] = date.split('-');
        console.log("data",data);
        if(min){
        let d1 = ("0" + min.getDate()).slice(-2);
        let m1 = ("0" + (min.getMonth() + 1)).slice(-2);
        let y1 = min.getFullYear();
        min=new Date(y1+"-"+m1+"-"+d1);
        }
        if(max){
        let d2 = ("0" + max.getDate()).slice(-2);
        let m2 = ("0" + (max.getMonth() + 1)).slice(-2);
        let y2 = max.getFullYear();
        max=new Date(y2+"-"+m2+"-"+d2);
        }
        if(date){
            date=new Date(y+"-"+m+"-"+d);
        }
        // console.log("date",min,max,date);
        if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date   && max === null ) ||
            ( min <= date   && date <= max )
        ) {
            return true;
        }
        return false;
    }
);
$('#min, #max').on('change', function () {
    if(table){
        table.draw();
        document.title=minDate || maxDate || new Date().toDateString();
    }             
});

function getDataByRowId(rowid){
    if(!store.data){
        return null;
    }
    return store.data.find(row => row.id == rowid);
}

function getDataByPhone(pno){
    if(!store.data){
        return null;
    }return store.data.find(row=> row.phone==pno);
}
