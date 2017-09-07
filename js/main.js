$(document).ready(function() {
    const $gallery = $("#gallery");
    const randomAPI = 'https://randomuser.me/api/?results=9';
    const displayProfile = (data) => {
        console.log(data);
        $.each(data.results, (i,user)=>{
            const $img = $("<img class='profile-image'src='"+user.picture.thumbnail+"'/>");
            // const $img = $(`<img class='profile-image'src='${user.picture.thumbnail}'/>`); not supported in IE11
            $gallery.append($img);
            $("<h1 class='profile-text'>"+ user.name.first +" "+user.name.last  + "</h1>").appendTo($gallery);
        });
    };
    $.ajax({
        url: randomAPI,
        dataType: 'json',
        success: displayProfile
    });
});