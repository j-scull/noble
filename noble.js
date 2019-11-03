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
    
    
   
    var sel1 = selFrom.options[selFrom.selectedIndex].text;
    var sel2 = selTo.options[selTo.selectedIndex].text;
    var c = document.getElementById('content');
    
    var yr;
    var yd;
    var year = Number(selFrom.options[0].text);
    var yLen = selFrom.options.length;
    var firstYear = Number(selFrom.options[yLen-1].text);
    
    var categories;
    var radios = document.getElementsByName('categoryButton');
    var radioVal;
   
    for( year ; year >= firstYear; year --){
        yr  = document.getElementById('y' + year);
        yd = document.getElementById('d' + year);
        categories = document.getElementById('d' + year).children;
        if ( year > Number(sel1) || year < Number(sel2) ){
            yr.style.display = 'none';
            yd.style.display = 'none';
            for (var k = 0; k < categories.length; k ++){
                categories[k].style.display = 'none';
            }
        }else{
            yr.style.display = 'block';
            yd.style.display = 'block';
            for (var r = 1; r < radios.length; r++){
                radioVal = radios[r].value;
                if (radios[0].checked){
                    for (var i = 0; i < categories.length; i ++){
                        if ( categories[i].className == radioVal){
                            categories[i].style.display = 'block';
                        }
                    }
                }else{
                    if (radios[r].checked){
                        for (var j = 0; j < categories.length; j ++){
                            if ( categories[j].className == radioVal){
                                categories[j].style.display = 'block';
                            }else{
                                if (categories[j].innerHTML != year){
                                    categories[j].style.display = 'none';
                                }
                                
                            }  
                        }  
                    }    
                }
            }
        }
        
        
        
        
        
        
    }
    
    /*
    c.innerHTML += year;
    var categories;
    var radios = document.getElementsByName('categoryButton');
    var radioVal;
    
    for( year ; year >= firstYear; year --){
        
        categories = document.getElementById('d' + year).children;
        
        if ( year > Number(sel1) || year < Number(sel2) ){
            for (var k = 0; k < categories.length; k ++){
                categories[k].style.display = 'none';
            }
        }else{
            for (var r = 1; r < radios.length; r++){
                radioVal = radios[r].value;
                if (radios[0].checked){
                    for (var i = 0; i < categories.length; i ++){
                        if ( categories[i].className == radioVal){
                            categories[i].style.display = 'block';
                        }
                    }
                }else{
                    if (radios[r].checked){
                        for (var j = 0; j < categories.length; j ++){
                            if ( categories[j].className == radioVal){
                                categories[j].style.display = 'block';
                            }else{
                                categories[j].style.display = 'none';
                            }  
                        }  
                    }    
                }
            }
        }
    }
        
        */
        
        
    /*Gotta fix that transition!!!!*/   
    /*If output is nothing, then 'no information for selected prize'*/
        
        /*
        for ( var cr = 0; cr < cat.length; cr ++){
            
            if ( cr < c1 || cr > c2){
                cat[cr].style.display = 'none';
            }else{
                if (radios[0].checked){
                    cat[cr].style.display = 'block';
                }else{
                    if (radios[r].checked){
                     cat[cr].style.display = 'block';
                    }
                    else{
                        cat[cr].style.display = 'none';
                    }
                }
            }
           
        }
        
        */ 
       
 
    
    
    
    
    

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
    var idList = [];
    var classList = [];
    var yearSelect;
    var catSelect ='';
    for (var i = 0; i < prizes.length; i++){
        var year = prizes[i].year;
        var cat = prizes[i].category;
        if (idList.includes('y' + year) == false){
            idList.push('y' + year);
            idList.push('d' + year);
            if (i == 0){
                output += '<div id="d' + year + '">'; 
            }else{
                output += '</div><div id="d' + year + '">'; 
            }
            output += '<h3 id="y' + year + '">' + year + '</h3>';
            yearSelect += '<option value="' + year + '">' + year + '</option>';
        }
        if (classList.includes(cat) == false){
            classList.push(cat);
            catSelect += '<input type ="radio" name="categoryButton" value="' + cat + '">' + cat + '<br>';
        }
        output += '<h3 class="' + cat + '">' + cat + '</h3>';

        output += '<div id="' + cat + year + '">';
        idList.push(cat + year);
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
    output += '</div>';

    var out = document.getElementById('content');
    out.innerHTML += output;
    var mx = document.getElementById('maxYear');
    mx.innerHTML = yearSelect;
    var mn = document.getElementById('minYear');
    mn.innerHTML = yearSelect;
    var menu = document.getElementById('radioBtn');
    menu.innerHTML += '<input type="radio" name="categoryButton" value="all" checked>all categories<br>' + catSelect;


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





        
