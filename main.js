(function () {
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");
    let modal =  document.querySelector(".mainBox");
    
    let blurred = document.querySelector(".blurred")
    let input = document.querySelector(".task_input");
   
    let task1 = document.querySelector(".task1");
    let task2 = document.querySelector(".task2");
    let folders = [];
    let fid = -1;
    let addMode = false;
    fname = "";
       
    // btnAddFolder.addEventListener("click", addFolder);
    btnAddFolder.addEventListener("click", function (){
        
       blurred.classList.add("myicon");
        addMode =! addMode;
        if(addMode){
        modal.style.display = "block"; 
        // plusContainer.classList.add("active");
        }
        else{
         modal.style.display = "none"; 
         blurred.classList.remove("myicon");
        //  plusContainer.classList.remove("active");
        }
        input.focus();
      
     })
    //  fullBody.addEventListener("click",function(){
    //     modal.style.display = "none"; 
    //     blurred.classList.remove("myicon");
    //  })
     task1.addEventListener("click",function(){
         addMode = false;
         modal.style.display = "none"; 
         blurred.classList.remove("myicon");
     })
     task2.addEventListener("click",function(){
        if (input.value) {
            fname = input.value;
            // console.log("task Value", input.value);
            modal.style.display = "none";
            addMode = false;
               input.value = "";
               addFolder();
               blurred.classList.remove("myicon");
        }
        else{
             alert("Please enter a name");
             input.focus();
        }
       
     })
   input.addEventListener("keydown", function(e){

    if (e.code == "Enter" && input.value) {
        fname = input.value;
        // console.log("task Value", input.value);
        modal.style.display = "none";
        addMode = false;
           input.value = "";
    }
    
   addFolder();
     
   })
    function addFolder() {
        // let fname = prompt("Enter folder's name");
        // let fname = input.value;
        // console.log(fname);
        if (!!fname) {
            let exists = folders.some(f => f.name == fname);
            if (exists == false) {
                fid++;
                folders.push({
                    id: fid,
                    name: fname
                });
                addFolderHTML(fname, fid);
                saveToStorage();
                blurred.classList.remove("myicon");
            } else {
                alert(fname + " already exists");
                blurred.classList.remove("myicon");
            }
        }
       
        // else {
        //     alert("Please enter a name");
        // }
        fname = "";
         
    }
 
    function editFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let ofname = divName.innerHTML;

        let nfname = prompt("Enter new name for " + ofname);
        if (!!nfname) {
            if (nfname != ofname) {
                let exists = folders.some(f => f.name == nfname);
                if (exists == false) {
                   // ram
                   let folder = folders.find(f => f.name == ofname);
                   folder.name = nfname;

                   // html
                   divName.innerHTML = nfname;
                   blurred.classList.remove("myicon");
                   // storage
                   saveToStorage();
                } else {
                    alert(nfname + " already exists");
                    blurred.classList.remove("myicon");
                    
                }
            } else {
                alert("This is the old name only. Please enter something new.");
            }
        } else {
            alert("Please enter a name");
        }
    }

    // 10:49 to 10:55
    function deleteFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");

        let flag = confirm("Are you sure you want to delete " + divName.innerHTML + "?");
        if (flag == true) {
            // ram
            let fidx = folders.findIndex(f => f.name == divName.innerHTML);
            folders.splice(fidx, 1);

            // html
            divContainer.removeChild(divFolder);

            // storage
            saveToStorage();
        }
    }

    function addFolderHTML(fname, fid) {
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        let spanEdit = divFolder.querySelector("[action='edit']");
        let spanDelete = divFolder.querySelector("[action='delete']");

        divFolder.setAttribute("fid", fid);
        divName.innerHTML = fname;
        spanEdit.addEventListener("click", editFolder);
        spanDelete.addEventListener("click", deleteFolder);

        divContainer.appendChild(divFolder);
    }

    function saveToStorage() {
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loadFromStorage() {
        let fjson = localStorage.getItem("data");
        if (!!fjson) {
            folders = JSON.parse(fjson);
            folders.forEach(f => {
                if (f.id > fid) {
                    fid = f.id;
                }

                addFolderHTML(f.name, f.id);
            });
        }
    }

    loadFromStorage();
})();


