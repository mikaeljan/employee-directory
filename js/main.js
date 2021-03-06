$(document).ready(function() {
    // Function for capitalizing first letter of the string.
    function titleCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const $gallery = $("#gallery");
    const randomAPI = 'https://randomuser.me/api/?results=12';
    const displayProfile = (data) => {
        console.log(data);
        $.each(data.results, (i,user)=>{
            // const $img = $(`<img class='profile-image'src='${user.picture.thumbnail}'/>`); not supported in IE11
            const $profile     = $("<a data-fancybox data-src='#hidden-"+i+"' href='javascript:;' class='profile'></a>");
            const $img         = $("<img class='profile-image' src='"+user.picture.medium+"'/>");
            const $profileText = $("<div class='profile-text'></div>");

            $gallery.append($profile);
            $profile.append($img);
            $profile.append($profileText);

            const profileName   = titleCase(user.name.first)+" "+titleCase(user.name.last);
            const profileEmail  = user.email;
            const profileCity   = titleCase(user.location.city);

            const $profileName  = $("<h2 class='profile-text--name'></h2>");
            const $profileEmail = $("<span class='profile-text--email' href='mailto:"+user.email+"'></span>");
            const $profileCity  = $("<p class='profile-text--city'></p>");

            $profileName.text(profileName);
            $profileEmail.text(profileEmail);
            $profileCity.text(profileCity);

            $profileText.append($profileName).append($profileEmail).append($profileCity);

            //Hidden
            const $hiddenDiv = $("<div class='hidden' id='hidden-"+i+"'></div>");
            const $profileTextHidden = $("<div class='profile-text'></div>");
            $profile.append($hiddenDiv);
            $img.clone().appendTo($hiddenDiv);
            $hiddenDiv.append($profileTextHidden);

            const $profilePhone     = $("<span class='profile-text--phone'></span>");
            const $profileFullAddress= $("<span class='profile-text--street'></span>");
            const $profileBirthday  = $("<span class='profile-text--birthday'></span>");

            const profilePhone  = user.phone;
            const profileStreetNo  = user.location.street.split(" ")[0];
            const profileZipCode  = user.location.postcode;
            const profileStreet  = titleCase(user.location.street.split(" ")[1]);
            const profileState  = titleCase(user.location.state);
            const profileFullAddress  = titleCase(user.location.street.substr(5))+" "+ profileStreetNo+", "+profileCity+", "+profileState +", "+profileZipCode;
            const profileBirthday   = "Birthday: "+user.dob.split(" ")[0];

            $profilePhone.text(profilePhone);
            $profileFullAddress.text(profileFullAddress);
            $profileBirthday.text(profileBirthday);

            $profileName.clone().appendTo($profileTextHidden);
            $profileEmail.clone().appendTo($profileTextHidden);
            $profileCity.clone().appendTo($profileTextHidden);

            $profileTextHidden.append($profilePhone).append($profileFullAddress).append($profileBirthday);
        });

    };
    $.ajax({
        url: randomAPI,
        dataType: 'json',
        success: displayProfile
    });

});