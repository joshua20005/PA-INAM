document.addEventListener('DOMContentLoaded', function () {
  const profile = document.querySelector('.nav__profile');
  const imgProfile = profile.querySelector('.nav__profile-img');
  const dropdownProfile = profile.querySelector('.nav__profile-link');

  imgProfile.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdownProfile.classList.toggle('show');
  });

  document.addEventListener('click', function () {
    dropdownProfile.classList.remove('show');
  });

  dropdownProfile.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});

