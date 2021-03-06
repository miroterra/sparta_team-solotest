//jachigu
const mapDosim = document.querySelector(".district#dosim");
const mapDongnam = document.querySelector(".district#dongnam");
const mapSeonam = document.querySelector(".district#seonam");
const mapSeobook = document.querySelector(".district#seobook");
const mapDongbook = document.querySelector(".district#dongbook");
//detailgu
const detaildosim = document.querySelector(".a");
const detaildongnam = document.querySelector(".b");
const detailseonam = document.querySelector(".c");
const detailseobook = document.querySelector(".d");
const detaildongbook = document.querySelector(".e");


function toggleDosim() {
  detaildosim.style.display = (detaildosim.style.display === "none") ? "block" : "none";
  detaildongnam.style.display = "none";
  detailseonam.style.display = "none";
  detailseobook.style.display = "none";
  detaildongbook.style.display = "none";
}

function toggleDongnam() {
  detaildongnam.style.display = (detaildongnam.style.display === 'none') ? "block" : "none";
  detaildosim.style.display = "none";
  detailseonam.style.display = "none";
  detailseobook.style.display = "none";
  detaildongbook.style.display = "none";
}

function toggleSeonam() {
  detailseonam.style.display = (detailseonam.style.display === 'none') ? "block" : "none";
  detaildosim.style.display = "none";
  detaildongnam.style.display = "none";
  detailseobook.style.display = "none";
  detaildongbook.style.display = "none";
}

function toggleSeobook() {
  detailseobook.style.display = (detailseobook.style.display === 'none') ? "block" : "none";
  detaildosim.style.display = "none";
  detaildongnam.style.display = "none";
  detailseonam.style.display = "none";
  detaildongbook.style.display = "none";
}

function toggleDongbook() {
  detaildongbook.style.display = (detaildongbook.style.display === 'none') ? "block" : "none";
  detaildosim.style.display = "none";
  detaildongnam.style.display = "none";
  detailseonam.style.display = "none";
  detailseobook.style.display = "none";
}

function toggleDosim() {
  detaildosim.style.display = (detaildosim.style.display === "none") ? "block" : "none";
  detaildongnam.style.display = "none";
  detailseonam.style.display = "none";
  detailseobook.style.display = "none";
  detaildongbook.style.display = "none";
}

function toggleDongnam() {
  detaildongnam.style.display = (detaildongnam.style.display === 'none') ? "block" : "none";
  detaildosim.style.display = "none";
  detailseonam.style.display = "none";
  detailseobook.style.display = "none";
  detaildongbook.style.display = "none";
}

function toggleSeonam() {
  detailseonam.style.display = (detailseonam.style.display === 'none') ? "block" : "none";
  detaildosim.style.display = "none";
  detaildongnam.style.display = "none";
  detailseobook.style.display = "none";
  detaildongbook.style.display = "none";
}

function toggleSeobook() {
  detailseobook.style.display = (detailseobook.style.display === 'none') ? "block" : "none";
  detaildosim.style.display = "none";
  detaildongnam.style.display = "none";
  detailseonam.style.display = "none";
  detaildongbook.style.display = "none";
}

function toggleDongbook() {
  detaildongbook.style.display = (detaildongbook.style.display === 'none') ? "block" : "none";
  detaildosim.style.display = "none";
  detaildongnam.style.display = "none";
  detailseonam.style.display = "none";
  detailseobook.style.display = "none";
}

//click event

mapDosim.addEventListener("click", toggleDosim);
mapDongnam.addEventListener("click", toggleDongnam);
mapSeonam.addEventListener("click", toggleSeonam);
mapSeobook.addEventListener("click", toggleSeobook);
mapDongbook.addEventListener("click", toggleDongbook);

function showShop() {
  $('#list-box').empty() // ?????? ????????? ??????????????? ?????? ????????? ?????????
  let region = event.target.value // ?????? ???????????? ????????? ????????? ?????? ????????????
  $.ajax({
    type: "POST",
    url: "/data",
    data: {region: region},
    success: function (response) {
      let positions = []
      let center_lat;
      let center_lon;
      let test = JSON.parse(response)  // Json ???????????? ????????? ??????
      for (let i = 0; i < test.length; i++) {
        let name = test[i]['?????????'];
        let location = test[i]['???????????????'];
        let latitude = test[i]['??????'];
        let longitude = test[i]['??????']
        let img = test[i]['?????????']
        let temp_html = `<div><a href="https://map.naver.com/v5/search/${name}">
<img src="${img}" onerror="this.src=../static/img/carrot.jpg">
<p>????????? : ${name}</p>
<p>??????????????? : ${location}</p></a>
</div>`

        $('#list-box').append(temp_html)
        positions.push(
          {
            title: name,
            latlng: new kakao.maps.LatLng(latitude, longitude) //????????? ??? ?????? ??? ????????????
          },)
        center_lat = test[i]['??????'];
        center_lon = test[i]['??????'];
      }
      let mapContainer = document.getElementById('map'), // ????????? ????????? div
        mapOption = {
          center: new kakao.maps.LatLng(center_lat, center_lon), // ????????? ????????????
          level: 7 // ????????? ?????? ??????
        };

      let map = new kakao.maps.Map(mapContainer, mapOption); // ????????? ???????????????
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      for (var i = 0; i < positions.length; i++) {

        // ?????? ???????????? ????????? ?????? ?????????
        let imageSize = new kakao.maps.Size(24, 35);

        // ?????? ???????????? ???????????????
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // ????????? ???????????????
        let marker = new kakao.maps.Marker({
          map: map, // ????????? ????????? ??????
          position: positions[i].latlng, // ????????? ????????? ??????
          title: positions[i].title, // ????????? ?????????, ????????? ???????????? ????????? ???????????? ???????????????
          image: markerImage // ?????? ?????????
        });
      }
    },
    error: function () {
      alert("POST ??????")
    },
  })
}
