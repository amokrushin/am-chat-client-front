var amChatHost = 'http://chat-io-alfa.mokr.org';
var amChatJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NzY1NjExOTgyMTAzOTc4NzAsIm5hbWUiOiJsZXN0ZXIubWV5ZXI0OCIsImF2YXRhclVybE0iOiJodHRwOi8vY2RuLmFrYW1haS5zdGVhbXN0YXRpYy5jb20vc3RlYW1jb21tdW5pdHkvcHVibGljL2ltYWdlcy9hdmF0YXJzLzVlLzVlOThmMzQyM2JlZmExNTcwNjNhNWI4Y2Q2NzE2NDNiNTYzOWIyZjBfbWVkaXVtLmpwZyIsImlhdCI6MTQ1ODI5MjczN30.Ktme1AqLcEP2m8JHxqB2RPYbicQSCk1tAbOCBeIF6MA';
// var amChatJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NzY1NjExOTgxMTQ5NjE3ODAsIm5hbWUiOiJNZWlsdmluIOODhCIsImF2YXRhclVybE0iOiJodHRwczovL3N0ZWFtY2RuLWEuYWthbWFpaGQubmV0L3N0ZWFtY29tbXVuaXR5L3B1YmxpYy9pbWFnZXMvYXZhdGFycy85MC85MGZhNzA1YzNjMzc4MjBlZWM1ODIzMjQwZDQ5Zjc3YWZmNGJlYmYyX21lZGl1bS5qcGciLCJpYXQiOjE0NTgyOTQ2ODN9.C_v_uU3Aa7OMNMNOktS1DuvtD0IYx_Gcl63heVBFykw';
const AmChat = require( '../../client/scripts/index' ),
    amChat = AmChat( {
        host: amChatHost,
        jwt: amChatJWT,
        element: document.getElementById( 'am-chat' )
    } );