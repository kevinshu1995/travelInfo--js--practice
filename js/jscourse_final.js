var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97');
xhr.send(null);
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    basicData = JSON.parse(xhr.responseText);
  }
};
xhr.onload = function () {
  //變數宣告
  var data = basicData.result.records;
  var dataLen = data.length;
  //element var
  var zoneSelected = document.getElementById('js--zoneSelect');
  var zoneMainTitle = document.getElementById('js--main__title');
  var zoneList = document.getElementById('js--main__container');
  var hotZoneBtn = document.querySelectorAll('.js--hotZone__btn');

  //zone
  //zones-全部，zone-沒有重複
  zones = [];
  for (var i = 0; i < dataLen; i++) {
    zones.push(data[i].Zone);
  };
  var zone = zones.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });

  //抓取資料放到select
  var zoneSelect = document.getElementById('js--zoneSelect');
  var zoneLen = zone.length;
  zoneStr = `<option value="" selected="selected">--請選擇行政區--</option>`;
  for (var i = 0; i < zoneLen; i++) {
    zoneStr += `<option value="${zone[i]}">${zone[i]}</option>`
  };
  zoneSelect.innerHTML = zoneStr;

  //監聽
  zoneSelected.addEventListener('change', zoneSelectedFun);
  var hotZoneBtnLen = hotZoneBtn.length;
  for (var i = 0; i < hotZoneBtnLen; i++) {
    hotZoneBtn[i].addEventListener('click', zoneBtnFun);
  }

  // 選擇時替換Zone Title  | selector
  function zoneSelectedFun(e) {
    var getValue = e.target.value;
    zoneMainTitle.innerHTML = getValue;
    // checklist(getValue);
    updateList(getValue);
  };

  function updateList(getValue) {
    var str = '';
    for (var i = 0; i < dataLen; i++) {
      if (data[i].Zone === getValue) {
        //偵測字數
        if (data[i].Name.length > 13) {
          data[i].Name = data[i].Name.substring(0, 12) + '...'
        };
        if (data[i].Opentime.length > 25) {
          data[i].Opentime = data[i].Opentime.substring(0, 24) + '...'
        };
        if (data[i].Add.length > 25) {
          data[i].Add = data[i].Add.substring(0, 24) + '...'
        };
        if (data[i].Tel.length > 25) {
          data[i].Tel = data[i].Tel.substring(0, 24) + '...'
        };
        var ticketTran = '更多資訊';
        if (data[i].Ticketinfo !== '免費參觀') {
          data[i].Ticketinfo = ticketTran;
        }
        //插入HTML
        str += `<li class="main__card">
                  <div class="main__card__title">
                    <img src=${data[i].Picture1} alt="photo">
                    <h3 class="main__card__title__name">${data[i].Name}</h3>
                    <h4 class="main__card__title__zone">${data[i].Zone}</h4>
                  </div>
                  <ul class="main__card__detail">
                    <li>
                      <img src="images/icons_clock.png" alt="timeIcon">
                      <span>${data[i].Opentime}</span>
                    </li>
                    <li>
                      <img src="images/icons_pin.png" alt="pinIcon">
                      <span>${data[i].Add}</span>
                    </li>
                    <li>
                      <img src="images/icons_phone.png" alt="phoneIcon" class="pdl8">
                      <span>${data[i].Tel}</span>
                    </li>
                  </ul>
                  <div class="main__card__tag">
                    <img src="images/icons_tag.png" alt="tagIcon">
                    <span class="js--main__card__tag__txt">${data[i].Ticketinfo}</span>
                  </div>
                </li>`
      }
    }
    zoneList.innerHTML = str;
  }

  // 選擇時替換Zone Title  | button
  function zoneBtnFun(e) {
    var btnValue = e.target.value;
    zoneMainTitle.innerHTML = btnValue;
    str = '';
    for (var i = 0; i < dataLen; i++) {
      if (data[i].Zone === btnValue) {

        if (data[i].Name.length > 13) {
          data[i].Name = data[i].Name.substring(0, 12) + '...'
        };
        if (data[i].Opentime.length > 25) {
          data[i].Opentime = data[i].Opentime.substring(0, 24) + '...'
        };
        if (data[i].Add.length > 25) {
          data[i].Add = data[i].Add.substring(0, 24) + '...'
        };
        if (data[i].Tel.length > 25) {
          data[i].Tel = data[i].Tel.substring(0, 24) + '...'
        };
        var ticketTran = '更多資訊';
        if (data[i].Ticketinfo !== '免費參觀') {
          data[i].Ticketinfo = ticketTran;
        }
        str += '<li class="main__card"><div class="main__card__title"><img src=' + data[i].Picture1 + ' alt="photo"><h3 class="main__card__title__name">' + data[i].Name + '</h3><h4 class="main__card__title__zone">' + data[i].Zone + '</h4></div><ul class="main__card__detail"><li><img src="images/icons_clock.png" alt="timeIcon"><span>' + data[i].Opentime + '</span></li><li><img src="images/icons_pin.png" alt="pinIcon"><span>' + data[i].Add + '</span></li><li><img src="images/icons_phone.png" alt="phoneIcon" class="pdl8"><span>' + data[i].Tel + '</span></li></ul><div class="main__card__tag"><img src="images/icons_tag.png" alt="tagIcon"><span class="js--main__card__tag__txt">' + data[i].Ticketinfo + '</span></div></li>'
      }
    }
    zoneList.innerHTML = str;
  };

  //偵測頁數
  // var dataNum = [];
  // var pages;
  // function checklist(getValue) {
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].Zone == getValue) {
  //       dataNum.push(data[i].Zone);
  //     }
  //   }
  //   //資料筆數   dataNum.length
  //   //每頁6筆資料，
  //   var pages = Math.ceil(dataNum.length / 4);

  //   console.log(dataNum.length + '筆數')
  //   console.log(pages + '總頁數');

  // };
}
