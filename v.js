// Initialize Firebase
var config = {
  apiKey: "AIzaSyBiPjVRE4le59MBNmoDCmJ5SQVLx9m1JBw",
  authDomain: "nerede-calisabilirim.firebaseapp.com",
  databaseURL: "https://nerede-calisabilirim.firebaseio.com",
  projectId: "nerede-calisabilirim",
  storageBucket: "nerede-calisabilirim.appspot.com",
  messagingSenderId: "567447823649"
};

firebase.initializeApp(config);


var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
provider.addScope('https://www.googleapis.com/auth/plus.me');




function girisGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result);
  }).catch(function(error) {

  });
}


var URL__ = null;

$(document).ready(function() {
  $(".on_posture").hide();
  $(".yan_posture").hide();
  
  var cData;

  firebase.database().ref('/sos').once('value').then(function(snapshot) {
    var data = snapshot.val();
	cData = data;
    console.log(data);
	var bData = [];
	let i = 0;
    for (let item in data) {
	
      console.log(item);
	  let Bitem = {
		  'name' : data[item].name
	  }
	  
	  if ( data[item].testName == 'fpi_6' ) {
		Bitem['fpi6_ayakYonu'] = data[item].fpi6_ayakYonu;
		 Bitem['forefoot'] = data[item].fpi_data_form.forefoot;
		Bitem['calceneal']= data[item].fpi_data_form.calceneal;
		Bitem['malleoli']= data[item].fpi_data_form.malleoli;
		Bitem['prominence']	= data[item].fpi_data_form.prominence;
		Bitem['talushead']	= data[item].fpi_data_form.talushead;
		Bitem['medialark']= data[item].fpi_data_form.medialark;
		  
		  
	  }
	  
	  else if ( data[item].testName == 'postur_on' ) {
		  Bitem['gvarum']= data[item].on_pos_form.gvarum;
		   Bitem['gvalgum']= data[item].on_pos_form.gvalgum;
		   
		   Bitem['Baş boyun lateral fleksiyon']= data[item].calculatedDegrees.postur_on_bblf;
		   Bitem['Göz seviyeleri']= data[item].calculatedDegrees.postur_on_goz;
		   Bitem['Lumbar lateral fleksiyon']= data[item].calculatedDegrees.postur_on_llf;
		   Bitem['Omuz seviyeleri']= data[item].calculatedDegrees.postur_on_omzsv;
		   Bitem['Pelvis seviyeleri']= data[item].calculatedDegrees.postur_on_pelvis;
		   Bitem['Sağ Diz']= data[item].calculatedDegrees.postur_on_sag_diz;
		   Bitem['Kalça - Sağ Q ']= data[item].calculatedDegrees.postur_on_sag_q;
		   Bitem['Kalça - Sol Q ']= data[item].calculatedDegrees.postur_on_sol_q;
		   Bitem['Sol Diz']= data[item].calculatedDegrees.postur_on_sol_diz;
		   Bitem['Torakal lateral fleksiyon']= data[item].calculatedDegrees.postur_on_tlf;
	
		  
	  }
	  else {
		   Bitem['tkifoz']= data[item].yan_pos_form.tkifoz;
		    Bitem['llordoz']= data[item].yan_pos_form.llordoz;
			 Bitem['lkifoz']= data[item].yan_pos_form.lkifoz;
			  Bitem['banterior']= data[item].yan_pos_form.banterior;
			   Bitem['badclothes']= data[item].yan_pos_form.badclothes;
			   
			   Bitem['Baş Boyun Ant Flex']= data[item].calculatedDegrees.postur_yan_bbaf;
			   Bitem['Diz fleksiyon']= data[item].calculatedDegrees.postur_yan_df;
			   Bitem['Gövde anterior fleksiyon']= data[item].calculatedDegrees.postur_yan_gaf;
			   Bitem['Kalça fleksiyon ']= data[item].calculatedDegrees.postur_yan_kf;
			  
			   
	  }
	  
		console.log(Bitem);
bData.push(Bitem);


      var yeniData = '<tr id="'+item+'"><td>' + data[item].name + '</td>';
      yeniData += '<td>' + data[item].testName + '</td>';
      yeniData += '<td>' + data[item].IMAGE + '</td>';
      yeniData += '<td>' + JSON.stringify(data[item].calculatedDegrees) + '</td>';


      if (data[item].testName == "fpi_6") {

        yeniData += '<td>' + data[item].fpi6_ayakYonu + '</td>';
        yeniData += '<td>' + JSON.stringify(data[item].fpi_data_form) + '</td>';
      } else if (data[item].testName == "postur_on") {
        yeniData += '<td> - </td>';
        yeniData += '<td>' + JSON.stringify(data[item].on_pos_form) + '</td>';

      } else if (data[item].testName == "postur_yan") {
        yeniData += '<td> - </td>';
        yeniData += '<td>' + JSON.stringify(data[item].yan_pos_form) + '</td>';

      } else {
        yeniData += '<td> - </td>';
        yeniData += '<td> - </td>';

      }

      yeniData += '</tr>';

      $("#veriAkis").append(yeniData);

i++;
    };
console.log(bData);

// $('#temp').text(JSON.stringify(bData));
  });




  let dataArray = {
    "postur_on": {
      'maxableClick': 12
    },
    "postur_yan": {
      'maxableClick': 5
    },
    "fpi_6": {
      'maxableClick': 11
    }

  }


  $("#whichDeg").change(function() {
    clearALL();
    selectedTest = $(this).val();


    switch (selectedTest) {
      case "postur_on":
        maxableClick = 12;
        $(".yan_posture").hide();
        $(".on_posture").show();
        break;
      case "postur_yan":
        maxableClick = 5;
        $(".on_posture").hide();
        $(".yan_posture").show();

        break;
      case "fpi_6":
        maxableClick = 11;
        $(".fpi_6_cb").hide();
        break;
      default:
        null

    }


  });







  $('.clearALLf').click(function() {
    clearALL();
  })

  $('ul.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  })


  $('#nextStep1').click(function() {
    $('#image').cropper('getCroppedCanvas').toBlob(function(blob) {
      console.log(blob);
    });

  })

  var selectedTest = null;
  var totalClick = 0;
  var maxableClick = 0;
  var coordinates = [];
  var calculatedDegrees = {};
  var fpi6_ayakYonu = null;
  
function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}
 
 $('#veriAkis').on("click", 'tr' , function(evt) {
	 console.log(evt.currentTarget.id);
	  console.log(cData[evt.currentTarget.id]);
	 
	 selectedTest = cData[evt.currentTarget.id].testName;
	coordinates = cData[evt.currentTarget.id].coordinates;
	
	var scale = vh(100) / cData[evt.currentTarget.id].viewport;
	console.log(vh(100) + ' ' + cData[evt.currentTarget.id].viewport);

	for (var i in coordinates) {
		coordinates[i].x = coordinates[i].x*scale;
		coordinates[i].y = coordinates[i].y*scale;
	}
	
	calculatedDegrees = cData[evt.currentTarget.id].calculatedDegrees;
		URL__ = cData[evt.currentTarget.id].IMAGE;
	 $(".imagesReplacement").css("background-image", "url(" + cData[evt.currentTarget.id].IMAGE + ")");
	
	printDegrees(selectedTest);
	
	
	reDrawLines(dataArray[selectedTest].maxableClick ,coordinates);
});
  


  $('.gonderFire').click(function() {

    let newData = {
      'testName': selectedTest,
      'coordinates': coordinates,
      'calculatedDegrees': calculatedDegrees,
      'name': $('#degNAME').val(),
      'IMAGE': URL__,
      'viewport': $(window).height(),
	  'n_viewport' : vh(100)
    }
    fpi6_ayakYonu == null ? null : newData['fpi6_ayakYonu'] = fpi6_ayakYonu;
    let fpi_data_form = null;
    if (selectedTest == "fpi_6") {
      fpi_data_form = {
        'forefoot': $('#forefoot').val(),
        'calceneal': $('#calceneal').val(),
        'malleoli': $('#malleoli').val(),
        'prominence': $('#prominence').val(),
        'talushead': $('#talushead').val(),
        'medialark': $('#medialark').val()
      }

    }
    let on_pos = null;
    if (selectedTest == "postur_on") {
      on_pos = {
        'gvarum': $('#gvarum').prop('checked'),
        'gvalgum': $('#gvalgum').prop('checked'),
      }

    }

    let yan_pos = null;
    if (selectedTest == "postur_yan") {
      yan_pos = {
        'tkifoz': $('#tkifoz').prop('checked'),
        'llordoz': $('#llordoz').prop('checked'),
        'lkifoz': $('#lkifoz').prop('checked'),
        'banterior': $('#banterior').prop('checked'),
        'badclothes': $('#badclothes').prop('checked')
      }

    }

    fpi_data_form == null ? null : newData['fpi_data_form'] = fpi_data_form;
    on_pos == null ? null : newData['on_pos_form'] = on_pos;
    yan_pos == null ? null : newData['yan_pos_form'] = yan_pos;

    console.log(newData)

    firebase.database().ref('sos').push(newData).then(function(snapshot) {
      alert("okey.")
      clearALL();
    });





  })

  $("#canvas").click(function(e) {

    console.log("s " + selectedTest + " m" + maxableClick + " t" + totalClick + " c" + coordinates)
    if (selectedTest != null && maxableClick != totalClick) {
      totalClick++;
      getPosition(e);
    }

  });

  $("#fpi6_gozukmuyor").click(function(e) {
    coordinates.push({
      'x': 0,
      'y': 0
    })
    totalClick++;
    nextPoint(selectedTest);
  });




  function clearALL() {
    selectedTest = null;
    coordinates = [];
    totalClick = 0;
    $(".addAllItemDegrees").empty();
    $("#drawlines").empty();
    $("#fpi_6").empty();
    $(".pointItem").remove();
  }

  function getPosition(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    coordinates.push({
      'x': x,
      'y': y
    })

    if (totalClick == 12 && selectedTest == "postur_on") {
      drawLines(coordinates[8].x, coordinates[8].y, coordinates[10].x, coordinates[10].y);
      drawLines(coordinates[9].x, coordinates[9].y, coordinates[11].x, coordinates[11].y);
      calculateALLdegrees(selectedTest);


    }

    if (totalClick == 5 && selectedTest == "postur_yan") {
      drawLines(coordinates[3].x, coordinates[3].y, coordinates[4].x, coordinates[4].y);
      calculateALLdegrees(selectedTest);


    }

    if (totalClick == 11 && selectedTest == "fpi_6") {

      drawLines(coordinates[6].x, coordinates[6].y, coordinates[7].x, coordinates[7].y);
      drawLines(coordinates[7].x, coordinates[7].y, coordinates[8].x, coordinates[8].y);
      drawLines(coordinates[8].x, coordinates[8].y, coordinates[9].x, coordinates[9].y);
      drawLines(coordinates[9].x, coordinates[9].y, coordinates[10].x, coordinates[10].y);

      calculateALLdegrees(selectedTest);

    }




    drawCoordinates(x, y);
    nextPoint(selectedTest);
  }

  function calculateALLdegrees(_selectedTest) {

    switch (_selectedTest) {
      case "postur_on":
        let postur_on_goz = calculateDegreeV(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y);
        let postur_on_bblf = calculateDegree((coordinates[0].x + coordinates[1].x) / 2, (coordinates[0].y + coordinates[1].y) / 2, (coordinates[2].x + coordinates[3].x) / 2, (coordinates[2].y + coordinates[3].y) / 2)
        let postur_on_omzsv = calculateDegreeV(coordinates[2].x, coordinates[2].y, coordinates[3].x, coordinates[3].y);
        let postur_on_tlf = calculateDegree((coordinates[2].x + coordinates[3].x) / 2, (coordinates[2].y + coordinates[3].y) / 2, (coordinates[4].x + coordinates[5].x) / 2, (coordinates[4].y + coordinates[5].y) / 2);
        let postur_on_llf = calculateDegree((coordinates[4].x + coordinates[5].x) / 2, (coordinates[4].y + coordinates[5].y) / 2, (coordinates[6].x + coordinates[7].x) / 2, (coordinates[6].y + coordinates[7].y) / 2);
        let postur_on_pelvis = calculateDegreeV(coordinates[6].x, coordinates[6].y, coordinates[7].x, coordinates[7].y);
        let postur_on_sag_q = calculateDegree(coordinates[6].x, coordinates[6].y, coordinates[8].x, coordinates[8].y);
        let postur_on_sol_q = calculateDegree(coordinates[7].x, coordinates[7].y, coordinates[9].x, coordinates[9].y);
        let postur_on_sag_diz = calculateDegree(coordinates[8].x, coordinates[8].y, coordinates[10].x, coordinates[10].y);
        let postur_on_sol_diz = calculateDegree(coordinates[9].x, coordinates[9].y, coordinates[11].x, coordinates[11].y);

        calculatedDegrees = {
          "postur_on_goz": postur_on_goz,
          "postur_on_bblf": postur_on_bblf,
          "postur_on_omzsv": postur_on_omzsv,
          "postur_on_tlf": postur_on_tlf,
          "postur_on_llf": postur_on_llf,
          "postur_on_pelvis": postur_on_pelvis,
          "postur_on_sag_q": postur_on_sag_q,
          "postur_on_sol_q": postur_on_sol_q,
          "postur_on_sag_diz": postur_on_sag_diz,
          "postur_on_sol_diz": postur_on_sol_diz,
        }




        printDegrees(_selectedTest);
        break;

      case "postur_yan":
        let postur_yan_bbaf = calculateDegree(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y);
        let postur_yan_gaf = calculateDegree(coordinates[1].x, coordinates[1].y, coordinates[2].x, coordinates[2].y);
        let postur_yan_kf = calculateDegree(coordinates[2].x, coordinates[2].y, coordinates[3].x, coordinates[3].y);
        let postur_yan_df = calculateDegree(coordinates[3].x, coordinates[3].y, coordinates[4].x, coordinates[4].y);


        calculatedDegrees = {
          "postur_yan_bbaf": postur_yan_bbaf,
          "postur_yan_gaf": postur_yan_gaf,
          "postur_yan_kf": postur_yan_kf,
          "postur_yan_df": postur_yan_df
        }

        printDegrees(_selectedTest);
        break;

      case "fpi_6":


        let _calceneal = calculateDegreeV((coordinates[0].x + coordinates[1].x) / 2, coordinates[2].y, coordinates[3].x, coordinates[3].y) + 90;
        let calceneal = 0;

        let forefoot = 0;

        if (_calceneal >= -0.5 && _calceneal <= 0.5) {
          calceneal = 0;
        } else if (_calceneal > 0.5 && _calceneal < 5) {
          calceneal = 1;
        } else if (_calceneal >= 5) {
          calceneal = 2;
        } else if (_calceneal > -5 && _calceneal < -0.5) {
          calceneal = -1;
        } else if (_calceneal <= -5) {
          calceneal = -2;
        }

        if (coordinates[4].x == 0 || coordinates[5].x == 0) {
          coordinates[4].x == 0 ? forefoot = -2 : null;
          coordinates[5].x == 0 ? forefoot = 2 : null;
        } else if (Math.abs(coordinates[4].x - coordinates[0].x) > Math.abs(coordinates[1].x - coordinates[5].x)) {
          forefoot = 1;

        } else if (Math.abs(coordinates[4].x - coordinates[0].x) < Math.abs(coordinates[1].x - coordinates[5].x)) {
          forefoot = -1;

        } else {
          forefoot = 0;
        }


        let malleoli = {
          "upper": 180 - calculateDegree(coordinates[6].x, coordinates[6].y, coordinates[7].x, coordinates[7].y) + calculateDegree(coordinates[7].x, coordinates[7].y, coordinates[8].x, coordinates[8].y),
          "lower": 180 - calculateDegree(coordinates[8].x, coordinates[8].y, coordinates[9].x, coordinates[9].y) + calculateDegree(coordinates[9].x, coordinates[9].y, coordinates[10].x, coordinates[10].y)
        }




        calculatedDegrees = {
          "forefoot": forefoot,
          "calceneal": calceneal,
          "_calceneal": _calceneal,
          "malleoli": malleoli
        }



        printDegrees(_selectedTest);
        break;
      default:
        null

    }


  }

  function printDegrees(_selectedTest) {

    switch (_selectedTest) {
      case "postur_on":

        $(".addAllItemDegrees").append('<tr><td>Göz seviyeleri</td><td>' + calculatedDegrees.postur_on_goz.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Baş boyun lateral fleksiyon açısı</td><td>' + calculatedDegrees.postur_on_bblf.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Omuz seviyeleri</td><td>' + calculatedDegrees.postur_on_omzsv.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Torakal lateral fleksiyon açısı</td><td>' + calculatedDegrees.postur_on_tlf.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Lumbar lateral fleksiyon açısı</td><td>' + calculatedDegrees.postur_on_llf.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Pelvis seviyeleri</td><td>' + calculatedDegrees.postur_on_pelvis.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Kalça - Sol Q  açısı</td><td>' + calculatedDegrees.postur_on_sag_q.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Kalça - Sağ Q  açısı</td><td>' + calculatedDegrees.postur_on_sol_q.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Sağ Diz açılanması</td><td>' + calculatedDegrees.postur_on_sag_diz.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Sol Diz açılanmasız</td><td>' + calculatedDegrees.postur_on_sol_diz.toFixed(2) + '</td></tr>');

        break;
      case "postur_yan":
        $(".addAllItemDegrees").append('<tr><td>Baş boyun anterior fleksiyon açısı</td><td>' + calculatedDegrees.postur_yan_bbaf.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Gövde anterior fleksiyon açısı</td><td>' + calculatedDegrees.postur_yan_gaf.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Kalça fleksiyon açısı</td><td>' + calculatedDegrees.postur_yan_kf.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Diz fleksiyon açısı </td><td>' + calculatedDegrees.postur_yan_df.toFixed(2) + '</td></tr>');

        break;
      case "fpi_6":
        $(".addAllItemDegrees").append('<tr><td>Ön ayağın abd add</td><td>' + calculatedDegrees.forefoot.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Kalkeneus lognitudinal aksis açısı</td><td>' + calculatedDegrees.calceneal.toFixed(2) + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Malleoli Upper</td><td>' + calculatedDegrees.malleoli.upper + '</td></tr>');
        $(".addAllItemDegrees").append('<tr><td>Malleoli Lower</td><td>' + calculatedDegrees.malleoli.lower + '</td></tr>');
        $("#fpi_6").empty();
        $("#fpi_6").append('<form id="fpi_6_">');
        $("#fpi_6").append('<div class="form-group"><label for="forefoot">Ön Ayak ABD/ADD</label><input name="forefoot" type="number" id="forefoot" value="' + calculatedDegrees.forefoot + '"><div>');
        $("#fpi_6").append('<div class="form-group"><label for="calceneal">Kalkeneal Uzun Aksis</label><input name="calceneal" type="number" id="calceneal" value="' + calculatedDegrees.calceneal + '">');
        $("#fpi_6").append('<div class="form-group"><label for="malleoli">Malleoli Eğimi</label><input name="malleoli" type="number" id="malleoli" value="0">');
        $("#fpi_6").append('<div class="form-group"><label for="prominence">Prominence</label><input name="prominence" type="number" id="prominence" value="0">');
        $("#fpi_6").append('<div class="form-group"><label for="talushead">Talus Head</label><input name="talushead" type="number" id="talushead" value="0">');
        $("#fpi_6").append('<div class="form-group"><label for="medialark">Medial Ark</label><input name="medialark" type="number" id="medialark" value="0">');
        $("#fpi_6").append('</form>');
        break;
      default:
        null

    }



  }

  function postur_on_nextPoint() {
    switch (totalClick) {
      case 1:
        $("#nextElement").text("Sol Göz");
        break;
      case 2:
        drawLines(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y);
        $("#nextElement").text("Sağ akromial çıkıntı");
        break;
      case 3:
        $("#nextElement").text("Sol akromial çıkıntı!");
        break;
      case 4:
        drawLines(coordinates[2].x, coordinates[2].y, coordinates[3].x, coordinates[3].y);
        drawLines((coordinates[0].x + coordinates[1].x) / 2, (coordinates[0].y + coordinates[1].y) / 2, (coordinates[2].x + coordinates[3].x) / 2, (coordinates[2].y + coordinates[3].y) / 2);

        $("#nextElement").text("Sağ 6. costa çizgisi");
        break;
      case 5:
        $("#nextElement").text("Sol 6. costa çizgisi");
        break;
      case 6:
        drawLines(coordinates[4].x, coordinates[4].y, coordinates[5].x, coordinates[5].y);
        drawLines((coordinates[2].x + coordinates[3].x) / 2, (coordinates[2].y + coordinates[3].y) / 2, (coordinates[4].x + coordinates[5].x) / 2, (coordinates[4].y + coordinates[5].y) / 2);
        $("#nextElement").text("Sağ SİAS");
        break;
      case 7:
        $("#nextElement").text("Sol SİAS");
        break;
      case 8:
        drawLines(coordinates[6].x, coordinates[6].y, coordinates[7].x, coordinates[7].y);
        drawLines((coordinates[4].x + coordinates[5].x) / 2, (coordinates[4].y + coordinates[5].y) / 2, (coordinates[6].x + coordinates[7].x) / 2, (coordinates[6].y + coordinates[7].y) / 2);
        $("#nextElement").text("Sağ Patella ortası");
        break;
      case 9:
        $("#nextElement").text("Sol Patella ortası");
        break;
      case 10:
        drawLines(coordinates[6].x, coordinates[6].y, coordinates[8].x, coordinates[8].y);
        drawLines(coordinates[7].x, coordinates[7].y, coordinates[9].x, coordinates[9].y);
        $("#nextElement").text("Sağ Ayak bileği eklemi");
        break;
      case 11:
        $("#nextElement").text("Sol Ayak bileği eklemi");
        break;
      default:
        $("#nextElement").text("Tüm noktalar koyuldu!");

    }

  }


  function postur_yan_nextPoint() {
    switch (totalClick) {
      case 1:
        $("#nextElement").text("Akromial Çıkıntı");
        break;
      case 2:
        drawLines(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y);
        $("#nextElement").text("Femur T. Major");
        break;
      case 3:
        drawLines(coordinates[1].x, coordinates[1].y, coordinates[2].x, coordinates[2].y);
        $("#nextElement").text("Lateral Kondil");
        break;
      case 4:
        drawLines(coordinates[2].x, coordinates[2].y, coordinates[3].x, coordinates[3].y);
        $("#nextElement").text("Lateral Malleoli");
        break;
      default:
        $("#nextElement").text("Tüm noktalar koyuldu!");

    }
  }

  function fpi_6_nextPoint() {
    switch (totalClick) {
      case 1:
        $("#nextElement").text("Medial topuk bitişi");
        drawLines90(coordinates[0].x, 'ver');
        break;
      case 2:
        $("#nextElement").text("Topuk Alt sınırı");
        drawLines90(coordinates[1].x, 'ver');
        if (coordinates[1].x > coordinates[0].x) {
          fpi6_ayakYonu = 'SOL';
        } else {
          fpi6_ayakYonu = 'SAG';
        }
        $('#ayakYonu').append(fpi6_ayakYonu + ' AYAK');
        break;
      case 3:
        $("#nextElement").text("Ayak uzun akisisinin bitişi");
        drawLines90(coordinates[2].y, 'hor');
        break;
      case 4:
        drawLines((coordinates[0].x + coordinates[1].x) / 2, coordinates[2].y, coordinates[3].x, coordinates[3].y);
        $("#nextElement").text("Serçe parmak kenarı");
        break;
      case 5:
        if (coordinates[4].x != 0) {
          drawLines90(coordinates[4].x, 'ver');
        }
        $("#nextElement").text("Baş parmak kenarı");
        break;
      case 10:
        if (coordinates[5].x != 0) {
          drawLines90(coordinates[5].x, 'ver');
        }
        $("#nextElement").text("Baş parmak kenarı");
        break;
      case 11:
        $("#nextElement").text("Tüm noktalar koyuldu!");
        break;
      default:
        $("#nextElement").text("Devam Edin!");

    }
  }

  function postur_on_reDrawLines(_totalClick, coordinates) {
    if (!coordinates[2]) {
      return;
    }
    if (!coordinates[1]) {
      return;
    }

    drawLines(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y);
    if (!coordinates[2]) {
      return;
    }

    drawLines(coordinates[2].x, coordinates[2].y, coordinates[3].x, coordinates[3].y);
    if (!coordinates[3]) {
      return;
    }

    drawLines((coordinates[0].x + coordinates[1].x) / 2, (coordinates[0].y + coordinates[1].y) / 2, (coordinates[2].x + coordinates[3].x) / 2, (coordinates[2].y + coordinates[3].y) / 2);
    if (!coordinates[4]) {
      return;
    }

    drawLines(coordinates[4].x, coordinates[4].y, coordinates[5].x, coordinates[5].y);

    drawLines((coordinates[2].x + coordinates[3].x) / 2, (coordinates[2].y + coordinates[3].y) / 2, (coordinates[4].x + coordinates[5].x) / 2, (coordinates[4].y + coordinates[5].y) / 2);
    if (!coordinates[5]) {
      return;
    }

    if (!coordinates[6]) {
      return;
    }

    drawLines(coordinates[6].x, coordinates[6].y, coordinates[7].x, coordinates[7].y);
    drawLines((coordinates[4].x + coordinates[5].x) / 2, (coordinates[4].y + coordinates[5].y) / 2, (coordinates[6].x + coordinates[7].x) / 2, (coordinates[6].y + coordinates[7].y) / 2);
    if (!coordinates[7]) {
      return;
    }

    drawLines(coordinates[6].x, coordinates[6].y, coordinates[8].x, coordinates[8].y);
    if (!coordinates[8]) {
      return;
    }

    drawLines(coordinates[7].x, coordinates[7].y, coordinates[9].x, coordinates[9].y);
    if (!coordinates[9]) {
      return;
    }

    drawLines(coordinates[8].x, coordinates[8].y, coordinates[10].x, coordinates[10].y);
    if (!coordinates[10]) {
      return;
    }

    drawLines(coordinates[9].x, coordinates[9].y, coordinates[11].x, coordinates[11].y);
  }


  function postur_yan_reDrawLines(_totalClick, coordinates) {
    if (!coordinates[0]) {
      return;
    }
    if (!coordinates[1]) {
      return;
    }

    drawLines(coordinates[0].x, coordinates[0].y, coordinates[1].x, coordinates[1].y);
    if (!coordinates[2]) {
      return;
    }

    drawLines(coordinates[1].x, coordinates[1].y, coordinates[2].x, coordinates[2].y);
    if (!coordinates[3]) {
      return;
    }

    drawLines(coordinates[2].x, coordinates[2].y, coordinates[3].x, coordinates[3].y);
    if (!coordinates[4]) {
      return;
    }

    drawLines(coordinates[3].x, coordinates[3].y, coordinates[4].x, coordinates[4].y);

  }

  function fpi_6_reDrawLines(_totalClick, coordinates) {
    if (!coordinates[0]) {
      return;
    }
    drawLines90(coordinates[0].x, 'ver');

    if (!coordinates[1]) {
      return;
    }
    drawLines90(coordinates[1].x, 'ver');
    if (coordinates[1].x > coordinates[0].x) {
      fpi6_ayakYonu = 'SOL';
    } else {
      fpi6_ayakYonu = 'SAG';
    }
    $('#ayakYonu').text(fpi6_ayakYonu + ' AYAK');
    if (!coordinates[2]) {
      return;
    }
    drawLines90(coordinates[2].y, 'hor');
    if (!coordinates[3]) {
      return;
    }

    drawLines((coordinates[0].x + coordinates[1].x) / 2, coordinates[2].y, coordinates[3].x, coordinates[3].y);
    if (!coordinates[4]) {
      return;
    }
    if (coordinates[4].x != 0) {
      drawLines90(coordinates[4].x, 'ver');
    }


    drawLines(coordinates[3].x, coordinates[3].y, coordinates[4].x, coordinates[4].y);

    if (!coordinates[5]) {
      return;
    }
    if (coordinates[5].x != 0) {
      drawLines90(coordinates[5].x, 'ver');
    }


    if (!coordinates[10]) {
      return;
    }
    drawLines(coordinates[6].x, coordinates[6].y, coordinates[7].x, coordinates[7].y);
    drawLines(coordinates[7].x, coordinates[7].y, coordinates[8].x, coordinates[8].y);
    drawLines(coordinates[8].x, coordinates[8].y, coordinates[9].x, coordinates[9].y);
    drawLines(coordinates[9].x, coordinates[9].y, coordinates[10].x, coordinates[10].y);

  }


  function nextPoint(selectedTest) {

    switch (selectedTest) {
      case "postur_on":
        postur_on_nextPoint();
        break;
      case "postur_yan":
        postur_on_nextPoint();
        break;
      case "fpi_6":
        fpi_6_nextPoint();
        break;

      default:
        null

    }
  }

  function reDrawLines(_totalClick, coordinates) {
    document.getElementById("drawlines").innerHTML = "";
    switch (selectedTest) {
      case "postur_on":
        postur_on_reDrawLines(_totalClick, coordinates);
        if (totalClick == 12) {
          $(".addAllItemDegrees").empty();
          calculateALLdegrees("postur_on");
        }
        break;
      case "postur_yan":
        postur_yan_reDrawLines(_totalClick, coordinates);
        if (totalClick == 5) {
          $(".addAllItemDegrees").empty();
          calculateALLdegrees("postur_yan");
        }
        break;
      case "fpi_6":
        fpi_6_reDrawLines(_totalClick, coordinates);
        if (totalClick == 11) {
          $(".addAllItemDegrees").empty();
          calculateALLdegrees("fpi_6");
        }
        break;
      default:
        null

    }



  }


  function drawLines(x, y, z, t) {

    var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    newLine.setAttributeNS(null, 'id', 'lines' + totalClick);
    newLine.setAttributeNS(null, 'x1', x);
    newLine.setAttributeNS(null, 'y1', y);
    newLine.setAttributeNS(null, 'x2', z);
    newLine.setAttributeNS(null, 'y2', t);
    newLine.setAttributeNS(null, 'style', "stroke:rgb(255,0,0);stroke-width:2");
    document.getElementById("drawlines").appendChild(newLine);
  }

  function drawLines90(x, y) {

    var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    newLine.setAttributeNS(null, 'id', 'lines' + totalClick);
    if (y == 'ver') {
      newLine.setAttributeNS(null, 'x1', x);
      newLine.setAttributeNS(null, 'y1', 0);
      newLine.setAttributeNS(null, 'x2', x);
      newLine.setAttributeNS(null, 'y2', 1000);
      newLine.setAttributeNS(null, 'style', "stroke:rgb(255,0,0);stroke-width:2");
    } else if (y == 'hor') {
      newLine.setAttributeNS(null, 'x1', 0);
      newLine.setAttributeNS(null, 'y1', x);
      newLine.setAttributeNS(null, 'x2', 1000);
      newLine.setAttributeNS(null, 'y2', x);
      newLine.setAttributeNS(null, 'style', "stroke:rgb(255,0,0);stroke-width:2");
    }

    document.getElementById("drawlines").appendChild(newLine);
  }


  function drawCoordinates(x, y) {
    $(".imagesReplacement").append("<div class='pointItem' id='item" + totalClick + "'></div>");
    $("#item" + totalClick).css("top", y);
    $("#item" + totalClick).css("left", x);
    dragElement(document.getElementById(("item" + totalClick)), totalClick);
  }



  function calculateDegree(x, y, z, t) {
    return (Math.atan2(t - y, z - x) * 180 / Math.PI) - 90;
  }

  function calculateDegreeV(x, y, z, t) {
    return (Math.atan2(t - y, z - x) * 180 / Math.PI);
  }

  function dragElement(elmnt, totalClickElement) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id)) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      // calculate the new cursor position:

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      if (!((elmnt.offsetTop - pos2) < 0 || (elmnt.offsetTop - pos2) > (h / 100) * 90)) {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

      }

      if (!((elmnt.offsetLeft - pos1) < 0 || (elmnt.offsetLeft - pos1) > (h / 100) * 64)) {
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
      console.log(totalClickElement);
      console.log(coordinates);
      coordinates[totalClickElement - 1] = {
        'x': (elmnt.offsetLeft - pos1),
        'y': (elmnt.offsetTop - pos2)
      };
      var zoomI = document.getElementById("zoomImage");

      let top = -((elmnt.offsetTop - pos2) * 2) + ((h / 100) * 20)
      let left = -((elmnt.offsetLeft - pos1) * 2) + ((h / 100) * 20)

      zoomI.style.top = top + "px";
      zoomI.style.left = left + "px";


      console.log(coordinates);
      reDrawLines(totalClickElement - 1, coordinates);

    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }





});



$(function() {

  'use strict';

  var console = window.console || {
    log: function() {}
  };
  var URL = window.URL || window.webkitURL;
  var $image = $('#image');
  var $dataX = $('#dataX');
  var $dataY = $('#dataY');
  var $dataHeight = $('#dataHeight');
  var $dataWidth = $('#dataWidth');
  var $dataRotate = $('#dataRotate');
  var $dataScaleX = $('#dataScaleX');
  var $dataScaleY = $('#dataScaleY');
  var options = {
    aspectRatio: 6 / 10,
    preview: '.img-preview',
    crop: function(e) {
      $dataX.val(Math.round(e.x));
      $dataY.val(Math.round(e.y));
      $dataHeight.val(Math.round(e.height));
      $dataWidth.val(Math.round(e.width));
      $dataRotate.val(e.rotate);
      $dataScaleX.val(e.scaleX);
      $dataScaleY.val(e.scaleY);
    }
  };
  var originalImageURL = $image.attr('src');
  var uploadedImageType = 'image/jpeg';
  var uploadedImageURL;



  // Cropper
  $image.on({
    ready: function(e) {
      console.log(e.type);
    },
    cropstart: function(e) {
      console.log(e.type, e.action);
    },
    cropmove: function(e) {
      console.log(e.type, e.action);
    },
    cropend: function(e) {
      console.log(e.type, e.action);
    },
    crop: function(e) {
      console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
    },
    zoom: function(e) {
      console.log(e.type, e.ratio);
    }
  }).cropper(options);


  // Buttons
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }





  // Options
  $('.docs-toggles').on('change', 'input', function() {
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    var cropBoxData;
    var canvasData;

    if (!$image.data('cropper')) {
      return;
    }

    if (type === 'checkbox') {
      options[name] = $this.prop('checked');
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');

      options.ready = function() {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };
    } else if (type === 'radio') {
      options[name] = $this.val();
    }

    $image.cropper('destroy').cropper(options);
  });


  // Methods
  $('.docs-buttons').on('click', '[data-method]', function() {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data('cropper');
    var cropped;
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('clear');
          }

          break;

        case 'getCroppedCanvas':
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('crop');
          }

          break;

        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            $(".imagesReplacement").css("background-image", "url(" + result.toDataURL(uploadedImageType) + ")");
            var storageRef = firebase.storage().ref().child(new Date().getTime() + '.jpg');
            storageRef.putString(result.toDataURL(uploadedImageType), 'data_url').then(function(snapshot) {
              console.log(snapshot);
              URL__ = snapshot.downloadURL;
              $('ul.tabs li').removeClass('current');
              $('.tab-content').removeClass('current');

              $("#secondTab").addClass('current');
              $("#tab-2").addClass('current');
            });
          }

          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  });


  // Keyboard
  $(document.body).on('keydown', function(e) {

    if (!$image.data('cropper') || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper('move', -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper('move', 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper('move', 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper('move', 0, 1);
        break;
    }

  });


  // Import image
  var $inputImage = $('#inputImage');

  if (URL) {
    $inputImage.change(function() {
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }

});
