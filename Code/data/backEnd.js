/**
 * LoginUser
 * @param {String} username
 * @param {String} password
 * @param {Phaser.Scene} scene
 */

function LoginUser(username, password, scene) {
    $.ajax({
        type: "POST",
        url: "https://www.hypatiamat.com/loginActionVH.php",
        data: "action=dologin&u=" + username + "&p=" + password,
        crossDomain: true,
        cache: false,


        success: function (data) {
            if (data == "true") {
                infoUser.user = response.split(",")[0];
                if (infouser.user == "prof") {
                    scene.loginErrorMsg.visible = true;
                    scene.loginErrorMsg2.visible = false;
                    return -1;
                }
                else {
                    infoUser.firstName = response.split(",")[1];
                    infoUser.escola = response.split(",")[2];
                    infoUser.turma = response.split(",")[3];

                    infoUser.setLocalData();
                    scene.ola.visible = true;
                    scene.scene.transition({ target: 'Menu', duration: 100 });
                }
            }
            else {
                scene.loginErrorMsg.visible = false;
                scene.loginErrorMsg2.visible = true;
                return -1;
            }
        },
        error: function (data) {
            infoUser.user = "";
            alert("Erro de ligação ao servidor");
        }
    })
}

function sessionVerify() {
    $.ajax({
        type: "POST",
        url: "https://www.hypatiamat.com/loginActionVH.php",
        data: "action=verify",
        cache: false,

        sucess: function (data) {
            if (data == "true") {
                infoUser.user = data.split(",")[0];
                infoUser.firstName = data.split(",")[1];
                infoUser.escola = data.split(",")[2];
                infoUser.turma = data.split(",")[3];
                infoUser.setLocalData();
            }
            else {
                infoUser.user = "";
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            infoUser.user = "";
            alert("Erro de ligação ao servidor");
        }
    })
}

function destroySession() {
    $.ajax({
        type: "POST",
        url: "https://www.hypatiamat.com/loginActionVH.php",
        data: "action=destroy",
        cache: false,

        sucess: function (data) {
            infoUser.user = "";
            infoUser.firstName = "";
            infoUser.escola = "";
            infoUser.turma = "";
            infoUser.setLocalData();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro de ligação ao servidor");
        }
    })
}
