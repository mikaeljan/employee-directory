$(document).ready(function() {
    // Function for capitalizing first letter of the string.
    function titleCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const $gallery = $("#gallery");
    const randomAPI = 'https://randomuser.me/api/?results=10';
    const displayProfile = (data) => {
        console.log(data);
        $.each(data.results, (i,user)=>{
            // const $img = $(`<img class='profile-image'src='${user.picture.thumbnail}'/>`); not supported in IE11
            const $profile = $("<div class='profile'></div>");
            const $img = $("<img class='profile-image'src='"+user.picture.medium+"'/>");
            const $profileText = $("<div class='profile-text'></div>");

            $gallery.append($profile);
            $profile.append($img);
            $profile.append($profileText);

            const profileName = titleCase(user.name.first)+" "+titleCase(user.name.last);
            const profileEmail = user.email;
            const profileCity = titleCase(user.location.city);

            const $profileName = $("<h2 class='profile-text--name'></h2>");
            const $profileEmail = $("<a class='profile-text--email' href='mailto:"+user.email+"'></a>");
            const $profileCity = $("<p class='profile-text--city'></p>");

            $profileName.text(profileName);
            $profileEmail.text(profileEmail);
            $profileCity.text(profileCity);

            $profileText.append($profileName).append($profileEmail).append($profileCity);


        });
    };
    $.ajax({
        url: randomAPI,
        dataType: 'json',
        success: displayProfile
    });
});