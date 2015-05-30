/**
 * Created by k33g_org on 30/05/15.
 */

let btnLoginBob = $("#loginBob")
  , btnLoginJohn = $("#loginJohn")
  , btnLogout = $("#logout")
  , btnAllUsers = $("#allUsers")
  , usersList = $("users")
  , message = $("message");

let login = (user, password) => {
  $.ajax({
    type:'POST',
    url:'api/authenticate',
    data:{login:user, password:password}
  }).then((data) => {

    window.localStorage.setItem('token', data.token)
    console.log(data)

    message.html(`
      Hello <b>${data.login}</b> (${data.firstName} ${data.lastName})<br>
      ${data.token}
    `)


    $.ajaxSetup({
      headers: {
        'x-access-token': data.token
      }
    });

  }).fail((err) => {
    console.log(err.responseText, err.statusText, err.status)
    message.html(`
      ${err.responseText}<br>${err.statusText}<br>${err.status}
    `)

    window.localStorage.removeItem('token');
    $.ajaxSetup({
      headers: {
        'x-access-token': null
      }
    });
  })
}


btnLoginBob.click(() => {
  login("bob", "morane");
});

btnLoginJohn.click(() => {
  login("john", "doe");
});

btnLogout.click(() => {
  window.localStorage.removeItem('token');
  $.ajaxSetup({
    headers: {
      'x-access-token': null
    }
  });
  console.log("logout")
  usersList.html(null)
});

let template = (users) => {return `
      <ul>${
  users.map(
    (user) => `
        <li>
          <b>${user._id}</b> - ${user.firstName}, ${user.lastName}
        </li>
        `
  ).join("")
  }</ul>
  `;}


btnAllUsers.click(() => {
  $.get("api/users/")
    .then((users) => {
      //console.log(template(users))
      message.html(null)
      usersList.html(template(users))

    })
    .fail((err) => {
      usersList.html(null)
      console.log(err.responseText, err.statusText, err.status)
      message.html(`
        ${err.responseText}<br>${err.statusText}<br>${err.status}
      `)
    });
});