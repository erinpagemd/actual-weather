//select the zip input field and the submitZip button
var zipInput = document.querySelector('#zipInput')
var submitZip = document.querySelector('#submitZip')

//////////////////////////////////////////////////////
/////////////onClick////////////////////
/////////////////////////////////////////////////////
submitZip.addEventListener('click', function(){
  var zip = zipInput.value;
  var url = 'http://api.wunderground.com/api/e948aefbd9d71dd2/forecast10day/geolookup/q/' + zip + '.json';
  //////////////////////////////////////////////////////
  /////////////use the getJSON function////////////////
  ////////////////////////////////////////////////////
  getJSON(url, function(res){
    var days = res.forecast.simpleforecast.forecastday;
    var dom = createDocFrag(days);
    document.querySelector('body').appendChild(dom);
  });
})






//////////////////////////////////FUNCTIONS//////////////////////////////////

///////////////////////////////////////////
/////////////createDocFrag/////////////
/////////////////////////////////////////
function createDocFrag(days){
  var docFragment = document.createDocumentFragment(); // contains all gathered nodes
  _.forEach(days, function(day){
    docFragment.appendChild(createDayDiv(day));
  })
  return docFragment
};

///////////////////////////////////////////
/////////////createDayDiv/////////////
/////////////////////////////////////////
function createDayDiv(day){
  var imgUrl = day.icon_url;

  //daydiv other elements go into
  var div = document.createElement('DIV');
  div.setAttribute("class", "days");

  //img
  var img = document.createElement('IMG');
  img.setAttribute("src", "imgUrl");
  div.appendChild(img);

  //weekday
  var div_1 = document.createElement('DIV');
  div_1.setAttribute("class", "weekday");
  div.appendChild(div_1);

  //hightemp
  var div_0 = document.createElement('DIV');
  div_0.setAttribute("class", "high");
  div.appendChild(div_0);

  //lowtemp
  var div_1 = document.createElement('DIV');
  div_1.setAttribute("class", "low");
  div.appendChild(div_1);

}





///////////////////////////////////////////
/////////////getJSON/////////////
/////////////////////////////////////////

function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = function (data){
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  }
  xhr.send();
}
