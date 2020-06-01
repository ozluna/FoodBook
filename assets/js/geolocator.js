var postCode = $("#post-code").val();
if(!postCode){
    $("#result").html(`<h2>Please enter a valid post code.</h2>`);
    return;
}
$("#result").html(`<div id=loader>
<img src="assets/image/22.gif" alt="loading.."/></div>`)

function getlocation(postCode){
    console.log(postCode);
    return `<p>${postCode}</p>`;

}


