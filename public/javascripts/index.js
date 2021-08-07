// const axios = require('axios');

$(window).scroll(function () { 
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        // console.log($("#main table tbody tr").html());
        var someElementsItems = document.querySelectorAll("tr.crypto_element");
        // console.log(someElementsItems[someElementsItems.length -1].getAttribute('data-id'));
        getCrypto(someElementsItems[someElementsItems.length -1].getAttribute('data-rank'));
    }
});

const getCrypto = (rank) => {
    if ($(window).data('ajaxready') == false) return;
    console.log(rank)
    $(window).data('ajaxready', false);
    axios.post('/get-data', {
        rank: rank
    })
    .then(function (response) {
        let currency = response.data.currency;
        let cryptoData = response.data.cryptocurrencies;
        for(var i=0; i<cryptoData.length; i++){
            let crypto = cryptoData[i];
            if(typeof crypto != "undefined" && crypto && typeof crypto.rank != "undefined" && crypto.rank){
                $("#main table tbody").append('<tr class="crypto_element" data-id="'+crypto.id+'" data-rank="'+crypto.rank+'">\
                <td>'+crypto.rank+'</td>\
                <td><img class="ui mini rounded image" src="'+crypto.logo_url+'"></td>\
                <td>'+crypto.name+'</td><td>'+crypto.symbol+'</td><td>'+parseFloat(crypto.price)*parseFloat(currency)+' INR</td>\
                <td>'+crypto.market_cap+'</td>\
                <td>'+parseFloat(crypto.high)*parseFloat(currency)+' INR</td></tr>');
                $(window).data('ajaxready', true);
            }
        }
    })
    .catch(function (err) {
        console.log(err)
    });
}