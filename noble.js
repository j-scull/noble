var selFrom = document.getElementById('maxYear');
var selTo = document.getElementById('minYear');

selFrom.addEventListener("change", function (){
    var y1 = selFrom.options[selFrom.selectedIndex].text;
    var y2 = selTo.options[selTo.selectedIndex].text;
    if (Number(y1) < Number(y2) ){
        selTo.options[selFrom.selectedIndex].selected = "selected";
    }
    var yearRange;
    for (var i =0; i < selTo.options.length; i ++){
        yearRange = selTo.options[i];
        if (i < selFrom.selectedIndex){
            yearRange.style.display = 'none';
        }
        else{
            yearRange.style.display = 'inline-block';
        }    
    }
});

            
            
document.getElementById('fBtn').addEventListener("click", show);

function show(){
    
    
   
    var y1 = selFrom.options[selFrom.selectedIndex].text;
    var y2 = selTo.options[selTo.selectedIndex].text;
    var c = document.getElementById('content');
    /*c.innerHTML += y1;
    c.innerHTML += y2;*/
    var yr;
    var i = Number(selFrom.options[0].text);
    var yLen = selFrom.options.length;
    var firstYear = Number(selFrom.options[yLen-1].text);
   
    for( i ; i >= firstYear; i --){
        yr  = document.getElementsByClassName('y' + i);
        if ( i > Number(y1) || i < Number(y2) ){
            yr[0].style.display = 'none';
        }else{
            yr[0].style.display = 'block';
        }
        
    }
    
    
    
    
    
    
    

    /*
    var years = document.getElementsByClassName('y2018');
    years[0].style.display = 'inline-block';
    */



    /*
    var inputYear = document.getElementById('yearInput').value;
    var inputCat = document.getElementById('category').value;
    inputCat = inputCat.toLowerCase();
    var msg = '';
    if (inputYear <= 2018 && inputYear >= 1970 && inputYear%1 == 0){
        msg += '<p>' +  inputYear + '</p>';
        document.getElementById('filterMsg').innerHTML = '';
        var yearClass = document.getElementsByClassName('y' + inputYear);
        for (var i = 0; i < yearClass.length; i++){
            yearClass[i].style.color = 'green';
            yearClass[i].style.display = 'inline-block';

        }
    }
    else{
        if (inputYear != 'Enter a year'){
            document.getElementById('filterMsg').innerHTML = 'Must be in range: 1970-2018';
        }
    }
    if (inputCat != 'enter a category'){
        var catClass = document.getElementsByClassName(inputCat);
        for (var j = 0; j < catClass.length; j++){
            catClass[j].style.display = 'inline-block';
        }
        msg +='<p>' + inputCat + '</p>';
    }
    document.getElementById('year').innerHTML = msg;



    var laurInfo = document.getElementById(inputCat + inputYear);
    laurInfo.style.display = 'inline-block';
    */
}    





var xmlhttp = new XMLHttpRequest();
var url = 'prizesByYear.json';
xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        var data = JSON.parse(xmlhttp.responseText);
        getInfo(data);  
    }
}
xmlhttp.open('GET', url, true);
xmlhttp.send();







function getInfo(d){

    document.getElementById('filterMsg').innerHTML = d.prizes[0].year;

    var prizes = d.prizes;
    var output = '';
    var classList = [];
    var idList = [];
    var yearSelect;
    var catSelect ='';
    for (var i = 0; i < prizes.length; i++){
        var year = prizes[i].year;
        var cat = prizes[i].category;
        idList.push(cat + year);
        if (classList.includes('y' + year) == false){
            classList.push('y' + year);
            output += '<h3 class="y' + year + '">' + year + '</h3>';
            yearSelect += '<option value="' + year + '">' + year + '</option>';
        }
        if (classList.includes(cat) == false){
            classList.push(cat);
            catSelect += '<input type ="radio" name="category" value="' + cat + '">' + cat + '<br>';
        }
        output += '<h3 class="' + cat + '">' + cat + '</h3>';

        output += '<div id="' + cat + year + '">';
        if (typeof prizes[i].overallMotivation !== 'undefined'){
            var oMotiv = 'The Noble Prize in ' + cat + ' ' + year + ' was awarded ' + prizes[i].overallMotivation + '.';

        }
        else{
            var oMotiv = 'The Noble Prize in ' + cat + ' ' + year + ' was awarded ' + prizes[i].laureates[0].motivation + '.';
        }
        output += '<p>' + oMotiv + '</p>';
        var lrts = prizes[i].laureates;
        for (var j = 0; j < lrts.length; j ++){
            var id = lrts[j].id;
            var name = lrts[j].firstname + ' ' + lrts[j].surname;
            var lMotiv = ''
            if (typeof prizes[i].overallMotivation !== 'undefined'){
                lMotiv = 'Prize motivation: ' + lrts[j].motivation + '.';
            }
            var share = '1/' + lrts[j].share;
            output += '<p id="' + id + '">' + name + '</p><p>' + lMotiv + '</p><p>Prize share: ' + share +'</p>';
        }
        output += '</div>';

    }

    var out = document.getElementById('content');
    out.innerHTML += output;
    var mx = document.getElementById('maxYear');
    mx.innerHTML = yearSelect;
    var mn = document.getElementById('minYear');
    mn.innerHTML = yearSelect;
    var menu = document.getElementById('radBtn');
    menu.innerHTML += '<input type="radio" name="category" value="all">all categories<br>' + catSelect;


    /*
    years = document.getElementsByClassName('y2018');
    years[0].style.display = 'none';
    */

    for (var c =0; c < classList.length; c++){
        var l = document.getElementsByClassName(classList[c]);
        for (var d = 0; d < l.length; d++){
            l[d].style.display = 'none'; 
        }
    }
    for (var i = 0; i < idList.length; i++){
        var w = document.getElementById(idList[i]);
            w.style.display = 'none';
    }
 }





            








