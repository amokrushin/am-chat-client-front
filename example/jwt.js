const jwt = require( 'jsonwebtoken' ),
    profile = [
        {
            id: 76561198114961770,
            name: 'Meilvin ツ',
            avatarUrlM: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/90/90fa705c3c37820eec5823240d49f77aff4bebf2_medium.jpg'
        }
    ],
    key = 't12DCXXjTJvBtfOavbpeOQBF9Vje3As5',
    token = jwt.sign( profile[0], key );

console.log( token );