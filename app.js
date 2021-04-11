"use strict"
const search = document.querySelector('.inpt');
console.log(search);


//fetch api
const apiFetch = async (searchText)=>{
    let res = await fetch('country1.json');

    let result = await res.json();

    // console.log(result.state.name);

    let filt = result.filter(item=>{

        let rgx = new RegExp(`${searchText}`, 'gi');
        return item.state.name.match(rgx);
    });

    if(searchText.length === 0){
        filt=[];
        document.querySelector('.api-cards').innerHTML='';

    }

    htmlDisplay(filt);
    
}

// display

const htmlDisplay = (item) =>{

    let htmlArr = item.map(val=>{

        let locals = val.state.locals.map(elem=>{
            return elem.name;
        });

        

        return `
        
            <div class="cards">

                <h3>${val.state.name}</h3>

                
                <p>${locals.join(', ')}</p>
                

            </div>

        `;
    }).join('');

    document.querySelector('.api-cards').innerHTML=htmlArr;
}

search.addEventListener('input',(e)=>{

//call api function
apiFetch(e.target.value);

});


