
const post = async (url) => {
    const fetchRequest = await fetch(url,
{
method:'GET',
headers: { 
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Headers'
    // 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization, Content-Language, Accept, Accept-Language' always;
},
});
    const jsonResponse = await fetchRequest.json();
    return jsonResponse
};

post('http://api.weatherapi.com/v1/forecast.json?key=e76d66218c9a4eda932221659220706&q=clifton&days=7/')
.then( (jsonData)=>{ processData(jsonData)
})    
.catch ((error)=>{
    console.log(error)
});


processData = (user) =>{
   console.log(user)
}

