$(document).ready(() => {

  $('#pokeButton').click(() => {
    getMon(53);
  });
  $('#post-wall-e').click(() => {
    const wallE = {
      name : 'WALL-E',
      occupation : 'Waste Allocation Robot',
      weapon : 'Head laser'
    };
    postCharacter(wallE);
  });
  $('#character-form').submit((e) => {
    e.preventDefault();

    const characterInfo = {
      name :       $('#the-name-input').val(),
      occupation : $('#the-occupation-input').val(),
      weapon :     $('#the-weapon-input').val()
    };

    postCharacter(characterInfo);
  });

  $('#update-form').submit((e) => {
    e.preventDefault();

    const charId = $('#character-id-input').val();
    const updateInfo = {
      name :       $('#update-name-input').val(),
      occupation : $('#update-occupation-input').val(),
      weapon :     $('#update-weapon-input').val()
    };

    updateCharacter(charId, updateInfo);
  });

  function getMon(monNum) {
    $.ajax({
      url : 'http://pokeapi.co/api/v2/pokemon/' + monNum,
      method : 'GET',
      data : null,
      success : (mon) => {
        console.log(mon.name + ' was found.');

        $('#pokeInfo').html(`
          <img src="${mon.sprites.front_default}">
          `);

          $('#poke-title').html(mon.name + '\'s info');
        },
        error : (err) => {
          console.log("error");
        }
      });
    }

    function postCharacter(charInfo) {
      $.ajax({
        url : 'https://ih-api.herokuapp.com/characters',
        method : 'POST',
        data : charInfo,
        success : (data) => {
          $('#character-form').trigger('reset');
          $('#feedback').html(`
            ${data.name} (id: ${data.id}) was added.
            `);
        },
        error : (err) => console.log('error')
      });
    }

    function updateCharacter(id, updateInfo) {
      $.ajax({
        url : 'https://ih-api.herokuapp.com/characters/' + id,
        method : 'PUT',
        data : updateInfo,
        success : (data) => {
          $('#update-form').trigger('reset');
          $('#feedback').html(`
            ${data.name} (id: ${data.id}) was updated successfully.
            `);
        },
        error : (err) => console.log('error')
      });
    }

  });
