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
    var dom = createDocFrag(res.forecast.simpleforecast.forecastday);
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
  });
  return docFragment
};

///////////////////////////////////////////
/////////////createDayDiv/////////////
/////////////////////////////////////////
function createDayDiv(day){
  var imgUrl = day.icon_url;
  var weekday = day.date.weekday;
  var hightemp = day.high.fahrenheit;
  var lowtemp = day.low.fahrenheit;

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
  var text_1 = document.createTextNode(weekday);
  div_1.appendChild(text_1);
  div.appendChild(div_1);

  //hightemp
  var div_0 = document.createElement('DIV');
  div_0.setAttribute("class", "high");
  var text_0 = document.createTextNode(hightemp);
  div_0.appendChild(text_0);
  div.appendChild(div_0);

  //lowtemp
  var div_2 = document.createElement('DIV');
  div_2.setAttribute("class", "low");
  var text_2 = document.createTextNode(lowtemp);
  div_2.appendChild(text_2);
  div.appendChild(div_2);

  return div

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
